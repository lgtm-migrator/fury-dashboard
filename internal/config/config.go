// Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package config

import (
	"fmt"
	"log"

	"github.com/spf13/viper"
)

type YamlConfig struct {
	Listener         string `yaml:"listener"`
	ExternalEndpoint string `yaml:"externalEndpoint"`
	Units            []Unit `yaml:"units"`
}

type Unit struct {
	Name string `yaml:"name"`
	ID   string `yaml:"id"`
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
	return fmt.Sprintf(`window.config = {
	"APP_ENDPOINT": "%v"
};
`, cfg.ExternalEndpoint)
}
