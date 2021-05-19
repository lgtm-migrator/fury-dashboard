// Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
	"embed"
	"fmt"
	"io/fs"

	"net/http"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"github.com/sighupio/fury-dashboard/internal/config"
)

// https://github.com/gin-contrib/static/issues/19
// It will add all non-hidden file in images, css, and js.
//go:embed static/*
var embeded embed.FS

type embedFileSystem struct {
	http.FileSystem
}

func (e embedFileSystem) Exists(prefix string, path string) bool {
	_, err := e.Open(path)
	if err != nil {
		return false
	}
	return true
}

func EmbedFolder(fsEmbed embed.FS, targetPath string) static.ServeFileSystem {
	fsys, err := fs.Sub(fsEmbed, targetPath)
	if err != nil {
		panic(err)
	}
	return embedFileSystem{
		FileSystem: http.FS(fsys),
	}
}

func main() {

	router := gin.Default()

	corsConfig := cors.DefaultConfig()

	corsConfig.AllowAllOrigins = true

	appConfig := config.GetYamlConf()

	router.Use(cors.New(corsConfig))

	router.GET("/config/config.js", func(c *gin.Context) {
		c.String(http.StatusOK, config.GetFrontEndConfigFile(*appConfig))
	})
	router.Use(static.Serve("/", EmbedFolder(embeded, "static")))
	router.NoRoute(func(c *gin.Context) {
		fmt.Println("%s doesn't exists, redirect on /", c.Request.URL.Path)
		c.Redirect(http.StatusMovedPermanently, "/")
	})

	_ = router.Run(appConfig.Listener)

}
