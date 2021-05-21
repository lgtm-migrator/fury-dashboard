// Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package config

import (
	"encoding/json"
	"fmt"
	"log"

	"github.com/spf13/viper"
)

type YamlConfig struct {
	Listener         string            `yaml:"listener"`
	ExternalEndpoint string            `yaml:"externalEndpoint"`
	RemoteComponents []RemoteComponent `yaml:"remoteComponents"`
}

type RemoteComponent struct {
	Scope  string `yaml:"scope"`
	Module string `yaml:"module"`
	Url    string `yaml:"url"`
}

func GetConfig() *viper.Viper {
	v := viper.New()
	v.SetConfigName("config")
	v.AddConfigPath(".")
	v.AddConfigPath("..")
	v.AutomaticEnv()
	v.SetEnvPrefix("FURY")
	err := v.ReadInConfig()
	if err != nil {
		log.Fatalf("Fatal error config file: %s \n", err)
	}
	return v
}

func GetYamlConf() *YamlConfig {
	var yamlConfig YamlConfig
	err := GetConfig().Unmarshal(&yamlConfig)

	if err != nil {
		log.Fatalf("error: %v", err)
	}
	return &yamlConfig
}

func GetFrontEndConfigFile(cfg YamlConfig) string {
	config, err := json.Marshal(cfg.RemoteComponents)

	if err != nil {
		log.Fatalf("error: %v", err)
	}

	return fmt.Sprintf(`window.dashboard_config = {
"REMOTE_COMPONENTS": %v
};
`, string(config))
}
