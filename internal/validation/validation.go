// Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package validation

import (
	"context"
	"fmt"
	"os"
	"strings"

	"github.com/coreos/go-systemd/v22/dbus"
	"github.com/sighupio/fury-connect-switch/internal/config"
)

type notFoundUnit struct {
	UnitName string
	Error    string
}

func UnitsExistInConfig(conf *config.YamlConfig) (bool, error) {

	conn, err := dbus.NewWithContext(context.Background())

	var (
		unitsNotFound []notFoundUnit
	)
	if len(conf.Units) == 0 {
		err = fmt.Errorf("no unit defined")
		return false, err
	}
	for _, unit := range conf.Units {
		if err != nil {
			return false, err
		}

		name := unit.ID
		statuses, err := conn.ListUnitsByNamesContext(context.Background(), []string{name})

		if err != nil {
			return false, err
		}

		if statuses[0].LoadState == "not-found" {
			unitsNotFound = append(unitsNotFound, notFoundUnit{
				UnitName: unit.Name,
				Error:    fmt.Sprintf("%s unit not found", unit.ID),
			})
		}

	}

	getErrorFromStruct := func() error {
		var errors []string
		for _, unit := range unitsNotFound {

			elementSpec := fmt.Sprintf("%s:%s", unit.UnitName, unit.Error)

			errors = append(errors, elementSpec)
		}
		return fmt.Errorf(strings.Join(errors, ","))
	}

	if len(unitsNotFound) > 0 {
		return false, getErrorFromStruct()
	}
	return true, nil
}

func EnsureUnitInConfig(unitID string) error {
	conf := config.GetYamlConf()
	for _, confUnit := range conf.Units {
		if confUnit.ID == unitID {
			return nil
		}
	}
	return fmt.Errorf("no unit found in config file with id %s", unitID)
}

func RunAsRoot() error {
	if os.Geteuid() != 0 {
		return fmt.Errorf("the server must run as root in order to interact with systemd and journald. Current uid is: %d", os.Geteuid())
	}
	return nil
}
