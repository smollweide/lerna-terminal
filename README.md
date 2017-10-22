# lerna-terminal [![Build Status](https://img.shields.io/travis/smollweide/lerna-terminal/master.svg)](https://travis-ci.org/smollweide/lerna-terminal)

> Powerful cli ui for monorepos

## Install

```
$ npm install lerna-terminal
```

## Usage

```
$ lerna-terminal --help

  Usage
    $ lerna-terminal [options]

  Options
    -V, --version                   output the version number
    -s, --script [string]           Define the script which should be executed
    -i, --ignoredPackages [string]  Add packages which should be ignored
    -f, --focus [string]            Focus one subterminal initially
    -t, --theme [string]            Define theme (default, minimal, massive)
    -h, --help                      output usage information

  Example
    $ lerna-terminal -s start -t minimal -i utils
```

## Cli

```
lerna-terminal~$ help

  Usage
    lerna-terminal~$ [command]

  Commands
    [string]          Focus one terminal panel and update current pwd
    focus             Leave focused mode and displays all terminal panels
    focus [string]    Focus one terminal panel and update current pwd
    clear             Clear all terminal panels
    clear [string]    Clear one terminal panel
    start             Start (or restart) the npm script (see Usage) in all terminal panels
    start [string]    Start (or restart) the npm script (see Usage) in one terminal panels
    stop              Stops the npm script (see Usage) in all terminal panels
    stop [string]     Stops the npm script (see Usage) in one terminal panels
    exit              Leave current mode and displays all terminal panels

  Example
    lerna-terminal~$ start
```

## Related

- [lerna](https://github.com/lerna/lerna) - A tool for managing JavaScript projects with multiple packages.

## License

MIT © [Simon Mollweide](https://github.com/smollweide)
