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