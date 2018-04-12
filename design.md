---
layout: default
desc: Design | netplan.io
sitemap:
    priority: 1.0
    changefreq: 'monthly'
    lastmod: 2017-01-13T17:20:30+00:00
source: https://wiki.ubuntu.com/Netplan/Design
---
<div class="p-strip--light is-bordered is-shallow">
  <div class="row">
    <div class="col-12">
      <h1>Netplan design</h1>
    </div>
  </div>
</div>

<div class="p-strip">
  <div class="row">
    <div class="col-8" markdown="1">

There are central network config files for Snappy, Server, Client, MAAS, cloud-init in `/etc/netplan/*.yaml`. All installers only generate such a file, no /etc/network/interfaces any more. There is also a netplan command line tool to drive some operations.

Systems are configured during early boot with a "network renderer" which reads `/etc/netplan/*.yaml` and writes configuration to /run to hand off control of devices to the specified networking daemon.

- Wifi and WWAN get managed by <a class="p-link--external" href="https://wiki.ubuntu.com/NetworkManager">NetworkManager</a>
- Any other configured devices get handled by networkd by default, unless explicitly marked as managed by a specific manager (<a class="p-link--external" href="https://wiki.ubuntu.com/NetworkManager">NetworkManager</a>)
- Devices that are not covered by the network config do not get touched at all.


## Key goals

- Usable in initramfs (few dependencies and fast)
- No persistent generated config, only original YAML config
- Default policy applies with no config file present
- Parser supports multiple config files to allow applications (libvirt, lxd) to package up expected network config (virbr0, lxdbr0), or to change the global default policy to use <a class="p-link--external" href="https://wiki.ubuntu.com/NetworkManager">NetworkManager</a> for everything.
- Retains the flexibility to change backends/policy later or adjust to "apt purge network-manager" as generated configuration is ephemeral

## Requirements


- Initial configuration of network on a host from an oracle: MAAS, Cloud, Installer (Subiquity/Ubiquity), WebDM
- Machine-parseable, but human readable configuration: YAML
- Allowing full control over links and ip configuration (link properties and ip network configuration options) bond-* bridge-* ipv6-* , etc
- Mtu, wake-on-lan, ethtool settings
- Rule-based application of configuration
- Related to smart defaults, e.g. Ubuntu Core might want to always run DHCP on any on-board interface (it doesn't care which one)
- Smart defaults, with predictable fallback configuration
- Support VMs in cloud (EC2, and Azure variants)
- Support containers in LXD
- Support servers booting on baremetal (ISO)
- Support servers booting via MAAS
- Automatic appropriate backend selection without any config, but pluggable (config.d) policy for desktops to use NM for everything
- Compatibility with older images which have existing 70-persistent-net.rules or boot with "net.ifnames=0" or similar.


## Design overview

<img src="https://assets.ubuntu.com/v1/a1a80854-netplan_design_overview.svg" alt="" />

## Network Config format

This is called "version 2", as current MAAS/curtin already use a (different) YAML format that is called "version 1".

## General structure

The top-level node is a network: mapping that contains "version: 2" (the YAML currently being used by curtin, MAAS, etc. is version 1), and then device definitions grouped by their type, such as "ethernets:", "wifis:", or "bridges:". These are the types that our renderer can understand and are supported by our backends.

Each type block contains device definitions as a map where the keys (called "configuration IDs") are defined as below.

## Device Configuration IDs

The key names below the per-device-type definition maps (like "ethernets:") are called "ID"s. They must be unique throughout the entire set of configuration files. Their primary purpose is to serve as anchor names for composite devices, for example to enumerate the members of a bridge that is currently being defined.

There are two physically/structurally different classes of device definitions, and the ID field has a different interpretation for each:

### Physical devices

*Examples: ethernet, wifi*

These can dynamically come and go between reboots and even during runtime (hotplugging). In the generic case, they can be selected by "match:" rules on desired properties, such as name/name pattern, MAC address, driver, or device paths. In general these will match any number of devices (unless they refer to properties which are unique such as the full path or MAC address), so without further knowledge about the hardware these will always be considered as a group.

With specific knowledge (taken from the admin, a gadget snap, etc.), or by using unique properties such as path or MAC, match rules can be written so that they only match one device. Then the "set-name:" property can be used to give that device a more specific/desirable/nicer name than the default from udev's ifnames. Any additional device that satisfies the match rules will then fail to get renamed and keep the original kernel name (and dmesg will show an error).

It is valid to specify no match rules at all, in which case the ID field is simply the interface name to be matched. This is mostly useful if you want to keep simple cases simple, and it's how we have done network device configuration since the mists of time.

If there are match: rules, then the ID field is a purely opaque name which is only being used for references from definitions of compound devices in the config.

### Virtual devices

*Examples: veth, bridge, bond*

These are fully under the control of the config file(s) and the network stack. I. e. these devices are being created instead of matched. Thus "match:" and "set-name:" are not applicable for these, and the ID field is the name of the created virtual device.

## Complex example

This shows most available features that are planned for the initial 16.10 implementation:

```
`network:
  version: 2

  # if specified globally, can only realistically have that value, as networkd cannot
  # render wifi/3G. This would be shipped as a separate config.d/ by desktop images.
  # it can also be specified by-type or by-device
  #renderer: NetworkManager
  ethernets:
    # opaque ID for physical interfaces with match rules, only referred to by
    # other stanzas
    id0:
      match:
      macaddress: 00:11:22:33:44:55
    wakeonlan: true
    dhcp4: true
    addresses:
      - 192.168.14.2/24
      - 2001:1::1/64
    lom:
      # example for explicitly setting a backend (default would be networkd)
  renderer: network-manager
      match:
        driver: ixgbe
      # you are responsible for setting tight enough match rules
      # that only match one device if you use set-name
      set-name: lom1
      dhcp6: true
    switchports:
      # all cards on second PCI bus; unconfigured by themselves, will be added
      # to br0 below
      match:
        name: enp2*
      mtu: 1280
    wifis:
      all-wlans:
      # useful on a system where you know there is only ever going to be one device
      match: {}
      access-points:
        "Joe's home":
          # mode defaults to "managed" (client), key type to wpa-psk
          password: "s3kr1t"
      # this creates an AP on wlp1s0 using hostapd; no match rules, thus ID
      # is the interface name
      wlp1s0:
        access-points:
          "guest":
            mode: ap
            channel: 11
            # no WPA config implies default of open
    bridges:
      # renderer: NetworkManager
      # the key name is the name for virtual (created) interfaces;
      # no 'match' or 'set-name' attributes are allowed.
      br0:
        # IDs of the components; switchports expands into multiple interfaces
        interfaces: [wlp1s0, switchports]
        dhcp4: true
      routes:
        - to: 0.0.0.0/0
        via: 11.0.0.1
        metric: 3
      nameservers:
        search: [foo.local, bar.local]
        addresses: [8.8.8.8]`
```

## Commands

      <dl>
        <dt>`Generate`</dt>
        <dd>

            Runs during early boot and will read config, and write files

        </dd>
        <dt>`Apply`</dt>
        <dd>

            Kicks the various backends to realize network config

        </dd>
        <dt>`List`</dt>
        <dd>



        </dd>
        <dt>`Update`</dt>
        <dd>



        </dd>
        <dt>`Config`</dt>
        <dd>
    <strong>Set</strong>
    Capture existing config on an interface into the equivalent YAML.
    <strong>Show</strong>
    Merge and display all the current available configuration on the system.
        </dd>
      </dl>

## Use cases
Some of the possible ways of using netplan are captured below.

### Discovery (Subiquity)
Cathy boots the latest Ubuntu Server Image on her Intel NUC via USB key. The NUC has both a wired ethernet port and a wireless NIC builtin and has added a third USB-NIC as well, though it's not currently connected. During the installation, the installer presents Cathy with the 3 interfaces. Cathy selects the wired ethernet device; it was the only one with an IP configured via DHCP. After the installation is complete Cathy reboots her NUC and finds the following in `/etc/netplan/01-install.yaml:`

```
`network:
  version: 2
  ethernets:
    # configured by subiquity
    eno1:
      dhcp4: true`
```

The installer wrote out a config which included elements for the explicitly chosen/configured wired device. The other NICs are unconfigured, as the installer should not make any assumptions about their future usage or configuration.

### Data oracle (cloud-init, MAAS, gadget snap)

A user creates a cloud-init userdata file for a cloud instance that will get two network cards attached. That cloud-init file contains a network definition that configures a bond device from these two.

The gadget snap for a router specifies that all ethernet interfaces on the second PCI bus belong to the builtin switch, and configures a bridge for them. The other ethernet interface is renamed to "eth-uplink" to provide a more specific and useful name for it.

In general there are many situations where users (via the installer), hardware vendors, or cloud management software can make assumptions about the nature, number, and purpose of network interfaces -- these should be expressible in terms of specific interface names and vendor-provided configuration for them.

### Device Add

Alice plugs a USB nic into her Intel NUC after installing Ubuntu Server. The default policy for server uses networkd, and does not attempt to do any networking configuration for devices that are not already present in `/etc/netplan/`.

#### Using a previously configured device

Sally plugs in USB NIC that previously had been configured and expects that it retains the same configuration despite being connected in a different port.

On device removal, no config change has been made. If the server was rebooted, then when processing e/n/c, we will write out the config again in /run/network, including MATCH rules for .LINK to retain the name and likely the same MATCH rules .NETWORK to apply the same config.

(Note: This behaviour is already how NM/networkd/ifupdown etc. behave -- this use case is just for a complete behaviour description.)

### Update network config on package install

lxd, libvirt, and others might include network config by shipping a /{etc,lib}/netplan/\*.yaml snippet, for e. g. setting up a bridge (virbr0, lxdbr0).

### Device configuration removal

Alice is done with the usb0 device that was added and now wants to purge the configuration from the system.

### Show current config

Configuration is a merge of all `/etc/netplan/\*.yaml`. The `netplan config show` command will read the current on-disk configuration and merge any configs in `/etc/netplan/\*.yaml` merge them and produce a YAML formatted output to stdout.

</div>
<div class="col-4" markdown="1">

<h3 class="p-muted-heading">Table of contents</h3>

* TOC
{:toc}

</div>
</div>
</div>
