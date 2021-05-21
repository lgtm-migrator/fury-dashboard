### Fury Dashboard

This is a PoC project for the Fury Dashboard container, that actually runs on a `GOLANG` server, taking some configurations in order to import and show other UIs that runs as standalone.

It imports the other UIs as a webpack federated modules, so it must know the basic info (url, scope, module name).

## Requirements

To deploy this utility in your hosts, take in mind the following requirements must be already addressed in your host:

**WARNING:** Only tested on debian based systems.

- `libsystemd-dev` package installed.
- `systemd` working
- `journal` working

### Deployment

To install/update the latest version in your hosts:

```bash
$ curl -s https://api.github.com/repos/sighupio/fury-dashboard/releases/latest | grep browser_download_url | grep linux | cut -d '"' -f 4 | xargs curl -Ls -o fury-dashboard
$ chmod +x fury-dashboard
$ sudo mv fury-dashboard /usr/local/bin/fury-dashboard
```

Then, don't forget to create a `config.yml` file (you can copy/paste the `sample-config.yaml`):

```bash
$ cat config.yml
---
listener: 0.0.0.0:8080
externalEndpoint: http://localhost:8087
remoteComponents:
  furyconnectswitchui:
    scope: FuryConnectSwitchUI 
    module: ./FurySupport
    url: http://localhost:8083/remoteEntry.js
    params:
      apiUrl: http://localhost:8083

```

### Run

```bash
TBD
```

## Building

The agent requires to be compiled using golang `1.16` as it embeds the static assets of the frontend application.

### Locally *(docker)*

You can build the `linux` *(amd64)* binary using `docker` by running:

```bash
$ make build
```

You will find the generated binary in the `./bin/linux/fury-dashboard` directory.

### Vagrant

The project provides another alternative to actually builds the binary, this is using
[vagrant](https://www.vagrantup.com/). The provided [Vagrantfile](./Vagrantfile) contains a defintion to spin up an
ubuntu box containing all the requirements to build the binary using [docker](#locally-docker).

```bash
$ vagrant destroy --force # Just in case
$ vagrant up
$ vagrant ssh
vagrant@fury-dashboard:~$ cd /vagrant
vagrant@fury-dashboard:~$ make build
vagrant@fury-dashboard:~$ cp example-config.yml config.yml
vagrant@fury-dashboard:~$ ./bin/linux/fury-dashboard

```

## License

For license details please see [LICENSE](LICENSE)
