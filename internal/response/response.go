// Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package response

import (
	"fmt"

	"github.com/sighupio/fury-connect-switch/internal/config"
)

type ResponseStatusSpec struct {
	ActiveStatus string `json:"active_status"`
	LoadStatus   string `json:"load_status"`
}

type ResponseError struct {
	ErrorCode int
	Message   string
}

type ResponseServiceSpec struct {
	Code    int
	Service string
	Status  string
}

type ResponseLogSpec struct {
	Service string
	Log     string
}

type ResponseListSpec []config.Unit

func ErrorResponse(err error, code int) *ResponseError {

	return &ResponseError{
		ErrorCode: code,
		Message:   fmt.Sprintf("%v", err),
	}
}

func SuccessServiceResponse(service, status string, code int) *ResponseServiceSpec {

	return &ResponseServiceSpec{
		Service: service,
		Status:  status,
		Code:    code,
	}
}

func SuccessLogResponse(service, log string) *ResponseLogSpec {

	return &ResponseLogSpec{
		Service: service,
		Log:     log,
	}
}

func SuccessListResponse(units []config.Unit) *ResponseListSpec {

	return (*ResponseListSpec)(&units)
}
