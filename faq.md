---
layout: default
desc: FAQ | netplan.io
sitemap:
    priority: 1.0
    changefreq: 'monthly'
    lastmod: 2018-04-11T17:20:30+00:00
---
<div class="p-strip--light is-bordered is-shallow">
  <div class="row">
    <div class="col-12">
      <h1>Netplan frequently asked questions</h1>
    </div>
  </div>
</div>
<div class="p-strip">
  <div class="row">
    <div class="col-8" markdown="1">

## Why Netplan

Using netplan gives a central location to describe simple to complex networking configurations that function from Desktop to Server and from Cloud to IoT. Specifically, for systems with networkd, this relieves the user from having to configure up to three different files per device or configuration.

## Apply a configuration

Users should save configurations under `/etc/netplan` with a .yaml extension (e.g. `/etc/netplan/config.yaml`).

Then run `sudo netplan apply` and the configuration is parsed, written, and applied to the system. Since the file is written to disk the the configuration will persist between reboots.

## Test a configuration

If a user wishes to verify that a configuration file is valid it is recommended to first pass the configuration through a YAML syntax validator. This is done to validate the syntactic validity of the file.

Next, a user can run `sudo netplan generate` to validate the configuration is correctly parsed by netplan and written to disk. However, be warned that once generated the new configuration is written to disk the configuration is activated on next boot. Therefore, backing up a current working configuration is highly recommended.

## Hierarchy of configuration files

Configuration files can exist in three different locations with the precedence from most important to least as follows:

* /run/netplan/\*.yaml
* /etc/netplan/\*.yaml
* /lib/netplan/\*.yaml

Alphabetically later files, no matter what directory in, will amend keys if the key does not already exist and override previous keys if they do.

## Bring interfaces up or down

Previously users were used to using the `ifconfig` command. Users should now familiarize themselves with the more powerful `ip` command. Manually modifying network devices is now accomplished via the ip command.

As an example to bring up an interface and bring it back down:

```shell
ip link set enp3s0 up
ip link set enp3s0 down
```

See `man ip` for more information on how to manipulate the state of routing, network devices, interfaces and tunnels.

## Prevent waiting for interface

Interfaces that are not required for booting or should not be waited on during boot should have the `optional: true` key added to them. This will prevent long delays in booting for interfaces that may not come up.

## Get the current system address

Netplan is only meant to translate configuration into the appropriate files for the backend specified. It does not display IP information by itself, since it does not manage those by itself.

To get the most accurate state of the IP addresses for the system using the `ip addr` command.

## Find the current DNS servers

To determine the current DNS servers used by the system run `systemd-resolve --status` and look for the 'DNS Servers:' entry to see what DNS server is used.

## Deconfigure an interface

To deconfigure an interface, remove the configuration for the device from the netplan .yaml file and run `sudo netplan apply`.

If the interface is not configured in a .yaml file in `/etc/netplan`, it will not be configured at boot. To remove addresses manually, a user can run `ip address del <address> dev <interface>`.

## Use pre-up, post-up, etc. hook scripts

Users of ifupdown may be familiar with using hook scripts (e.g pre-up, post-up, etc.) in their interfaces file. Netplan configuration does not include support for hook scripts. Instead to achieve this functionality users can use [networkd-dispatcher](https://github.com/craftyguy/networkd-dispatcher) to aid in writing scripts. See `man networkd-dispatcher` for more information.

The same is possible with NetworkManager by writing a script watching for the right event in `/etc/NetworkManager/dispatcher.d`. See the NetworkManager(8) manpage for details.

This applies to Open vSwitch ifupdown declarations as well.

## How to go back to ifupdown

First, if netplan does not have the features or functionality for a particular use-case we would really like to know about it. Please help us and the community by filing a [bug against netplan](https://bugs.launchpad.net/netplan/+filebug) on Launchpad.

On a running system, netplan can be removed by installing ifupdown and configuring `/etc/network/interfaces` manually as users have done before.

At install time, a user can opt to use ifupdown by preseeding `netcfg/do_not_use_netplan=true`. This is done by adding the preseed line to the command line when booting the installation media (i.e. at install media boot menu, press F6, type 'e', and add to the command line).

</div>
<div class="col-4" markdown="1">

<h3 class="p-muted-heading">Table of contents</h3>

* TOC
{:toc}

</div>
</div>
</div>
