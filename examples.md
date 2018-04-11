---
layout: examples
desc: Examples | netplan.io
sitemap:
    priority: 1.0
    changefreq: 'monthly'
    lastmod: 2018-04-11T17:20:30+00:00
---

Below are a collection of example netplan configurations for common scenarios. If you see a scenario missing or have one  to contribute, please file a bug against this documentation with the example using the links at the bottom of this page. Thank you!

* TOC
{:toc}

## Configuration

Users should save configurations under `/etc/netplan` with a .yaml extension (e.g. `/etc/netplan/config.yaml`).

Then run `sudo netplan apply` and the configuration is parsed, written, and applied to the system. Since the file is written to disk the the configuration will persist between reboots.

## DHCP and static addressing

To have the interface named 'enp3s0' get assigned a DHCP address create a YAML file with the following:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      dhcp4: true
```

If instead a user wishes to set a static IP address the addresses key is used to set the IP address, IPv4 or IPv6, that is desired for the interface along with the subnet prefix length (e.g. /24). The user can also provide gateway and DNS information here as well:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
      addresses:
        - 10.10.10.2/24
      gateway4: 10.10.10.1
      nameservers:
          search: [mydomain,otherdomain]
          addresses: [10.10.10.1, 1.1.1.1]
```

## Wireless interfaces

Wireless devices use the 'wifis' key and are then configured similarly to other ethernet devices. The wireless access-point name and password should also be specified:

```yaml
network:
  version: 2
  renderer: networkd
  wifis:
    wlp2s0b1:
      dhcp4: no
      dhcp6: no
      addresses: [192.168.0.21/24]
      gateway4: 192.168.0.1
      nameservers:
        addresses: [192.168.0.1, 8.8.8.8]
      access-points:
        "network_ssid_name":
          password: "**********"
```

## Multiple addresses on an interface

The addresses key can take a list of addresses to assign to an interface:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp3s0:
     addresses:
       - 10.100.1.38/24
       - 10.100.1.39/24
     gateway4: 10.100.1.1
```

Virtual addresses (e.g. eth0:0) are not supported.

## Network Manager

If a user wishes to forgo the use of netplan and use Network Manager to configure the system then the following is used to so:

```yaml
network:
  version: 2
  renderer: NetworkManager
```

## Bonding

Bonding is configured with a list of interfaces and by specifying the mode. Below is an example of an active-backup bond that uses DHCP to obtain an address:

```yaml
network:
  version: 2
  renderer: networkd
  bonds:
    bond0:
      dhcp4: yes
      interfaces:
        - enp3s0
        - enp4s0
      parameters:
        mode: active-backup
        primary: enp3s0
```

## Bridging

To create a very simple bridge consisting of a single device using DHCP use:

```yaml
network:
  version: 2
  renderer: networkd
  bridges:
    br0:
      dhcp4: yes
      interfaces:
        - enp3s0
```

A more complex example, to get libvirtd to use a specific bridge with a tagged vlan, while continuing to provide an untagged interface as well would involve:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    enp0s25:
      dhcp4: true
  bridges:
    br0:
      addresses: [ 10.3.99.25/24 ]
      interfaces: [ vlan15 ]
  vlans:
    vlan15:
      accept-ra: no
      id: 15
      link: enp0s25
```

Then libvirtd would be configured to use this bridge by adding the following content to a new XML file under `/etc/libvirtd/qemu/networks/`. The name of the bridge in the <bridge> tag as well as in <name> need to match the name of the bridge device configured using netplan:

```xml
<network>
  <name>br0</name>
  <bridge name='br0'/>
  <forward mode="bridge"/>
</network>
```

## VLANs

To configure multiple VLANs with renamed interfaces:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    mainif:
      match:
        macaddress: "de:ad:be:ef:ca:fe"
      set-name: mainif
      addresses: [ "10.3.0.5/23" ]
      gateway4: 10.3.0.1
      nameservers:
        addresses: [ "8.8.8.8", "8.8.4.4" ]
        search: [ example.com ]
  vlans:
    vlan15:
      id: 15
      link: mainif
      addresses: [ "10.3.99.5/24" ]
    vlan10:
      id: 10
      link: mainif
      addresses: [ "10.3.98.5/24" ]
      nameservers:
        addresses: [ "127.0.0.1" ]
        search: [ domain1.example.com, domain2.example.com ]
```

## Directly connected gateway

This allows setting up a default route, or any route, using the "on-link" keyword where the gateway is an IP address that is directly connected to the network even if the address does not match the subnet configured on the interface.

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    addresses: [ "10.10.10.1/24" ]
    routes:
      - to: 0.0.0.0/0
        via: 9.9.9.9
        on-link: true
```

## Source routing

To allow routing between two networks route tables can be added to particular interfaces:

In the example below, ens3 is on the 192.168.3.0/24 network and ens5 is on the 192.168.5.0/24 network. This enables clients on either network to connect to the other and allow the response to come from the correct interface.

Furthermore, the default route is still assigned to ens5 allowing any other traffic to go through it.

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    ens3:
      addresses:
       - 192.168.3.30/24
      dhcp4: no
      routes:
       - to: 192.168.3.0/24
         via: 192.168.3.1
         table: 101
      routing-policy:
       - from: 192.168.3.0/24
         table: 101
    ens5:
      addresses:
       - 192.168.5.24/24
      dhcp4: no
      gateway4: 192.168.5.1
      routes:
       - to: 192.168.5.0/24
         via: 192.168.5.1
         table: 102
      routing-policy:
        - from: 192.168.5.0/24
          table: 102
```

## Loopback interface

Networkd does not allow creating new loopback devices, but a user can add new addresses to the standard loopback interface, lo, in order to have it considered a valid address on the machine as well as for custom routing:

```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    lo:
      match:
        name: lo
      addresses: [ 7.7.7.7/32 ]
```

## Windows DHCP Server

For networks where DHCP is provided by a Windows Server using the dpch-identifier key allows for interoperability:

```yaml
network:
  version: 2
  ethernets:
    enp3s0:
      dhcp4: yes
      dhcp-identifier: mac
```
