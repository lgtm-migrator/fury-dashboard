require 'yaml'

Vagrant.configure("2") do |config|
    {:'fury-connect-switch' => {
        :os         => 'bento/ubuntu-20.04',
        :hostname   => 'fury-dashboard',
        :ip         => '192.168.33.75',
        :memory     => '4096',
        :cpus       => 2,
        :autostart  => true,
      },
    }.each do |name, configuration|
      config.vm.network "forwarded_port", guest: 8080, host: 8087,
        auto_correct: true
      # Install Docker
      config.vm.provision :docker
      config.vm.provision "shell",
        inline: "apt-get install -yqq make"
      config.vm.define name,
        primary: configuration[:primary],
        autostart: configuration[:autostart] do |instance|
          instance.vm.box = configuration[:os]
          instance.vm.hostname = configuration[:hostname]
          instance.vm.network 'private_network', ip: configuration[:ip]
          # VirtualBox
          instance.vm.provider 'virtualbox' do |vb|
          # Boot in headless mode
            vb.gui = false
          # VM customization
            vb.cpus = configuration[:cpus]
            vb.customize ['modifyvm', :id, '--memory', configuration[:memory]]
            vb.customize ['modifyvm', :id, '--natnet1', '192.168.0/24']
          end
        end
    end
  end
