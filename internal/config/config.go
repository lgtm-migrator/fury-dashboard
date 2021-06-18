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
	Listener         string                     `json:"listener"`
	AppEnv           string                     `json:"appEnv"`
	ExternalEndpoint string                     `json:"externalEndpoint"`
	RemoteComponents map[string]RemoteComponent `json:"remoteComponents"`
}

type RemoteComponent struct {
	Scope  string            `json:"scope"`
	Module string            `json:"module"`
	Url    string            `json:"url"`
	Params map[string]string `json:"params"`
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
"DASHBOARD_ENDPOINT": "%v",
"REMOTE_COMPONENTS": %v
};
`, cfg.ExternalEndpoint, string(config))
}
