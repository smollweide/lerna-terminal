# lerna-terminal [![build status](https://img.shields.io/travis/smollweide/lerna-terminal/master.svg)](https://travis-ci.org/smollweide/lerna-terminal)

> Powerful cli ui for lerna - replace `lerna run <scriptName>` with `lerna-terminal <scriptName>`.

![kapture 2017-11-02 at 17 25 41](https://user-images.githubusercontent.com/2912007/32337702-08be4f34-bff3-11e7-808b-54c9bd09a0c9.gif)

## Getting Started

This application requires Node `8` or higher.

### Install

```
$ npm install lerna-terminal
```

### Usage

```
$ lerna-terminal --help

  Usage
    $ lerna-terminal <scriptName> [options]

  Options
    -V, --version                   Output the version number
    -i, --ignoredPackages [string]  Add packages which should be ignored
    -f, --focus [string]            Focus one subterminal initially
    -t, --theme [string]            Define theme (default, minimal, massive)
    -r, --root                      Run given scriptName also in root package
    -h, --help                      output usage information

  Example
    $ lerna-terminal start -t minimal -i utils
```

## CLI

```
lerna-terminal~$ help

  Usage
    lerna-terminal~$ [command]

  Commands
    [string]          Focus one terminal panel and update current pwd
    focus             Leave focused mode (child process) and displays all terminal panels
    focus [string]    Focus one terminal panel and update current pwd
    clear             Clear all terminal panels
    clear [string]    Clear one terminal panel
    start             Start (or restart) the npm script (see Usage) in all terminal panels
    start [string]    Start (or restart) the npm script (see Usage) in one terminal panels
    stop              Stops the npm script (see Usage) in all terminal panels
    stop [string]     Stops the npm script (see Usage) in one terminal panels
    exit              Leave current child process and displays all terminal panels

  Example
    lerna-terminal~$ start
```

### CLI in child process (focused)

```
lerna-terminal/<packageName>~$ help

  Usage
    lerna-terminal/<packageName>~$ [command]

  Commands
    [string]          On Enter the given string will be executed in child process
    clear             Clear focused terminal panel
    start             Start (or restart) the npm script (see Usage) in focused terminal panel
    stop              Stops the npm script (see Usage) in focused terminal panel
    exit              Leave current child process and displays all terminal panels

  Example
    lerna-terminal~$ start
```

## Shields
[![coverage status](https://coveralls.io/repos/github/smollweide/lerna-terminal/badge.svg?branch=master)](https://coveralls.io/github/smollweide/lerna-terminal?branch=master)
[![npm](https://img.shields.io/npm/v/lerna-terminal.svg)](http://npm.im/lerna-terminal)
[![downloads](https://img.shields.io/npm/dm/lerna-terminal.svg)](https://npm-stat.com/charts.html?package=lerna-terminal)
[![MIT License](https://img.shields.io/npm/l/lerna-terminal.svg)](http://opensource.org/licenses/MIT)
[![Codestyle](https://img.shields.io/badge/codestyle-namics-green.svg)](https://github.com/namics/eslint-config-namics)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Related

- [lerna](https://github.com/lerna/lerna) - A tool for managing JavaScript projects with multiple packages.

## License

MIT © [Simon Mollweide](https://github.com/smollweide)
