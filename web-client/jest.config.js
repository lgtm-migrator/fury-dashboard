/**
 * Copyright (c) 2021 SIGHUP s.r.l All rights reserved.
 * Use of this source code is governed by a BSD-style
 * license that can be found in the LICENSE file.
 */

const esModules = ['react-to-webcomponent'].join('|');

module.exports = {
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!${esModules})`],
  transform: {
    "^.+\\.[tj]s$": "ts-jest"
  },
  moduleFileExtensions: ["ts", "js", "json", "node", "tsx"]
};