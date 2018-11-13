#!/usr/bin/env node
'use strict'
const meow = require('meow')
const debug = require('./state/debug')
const inquirer = require('inquirer')
const chalk = require('chalk')
const isBlank = require('is-blank')
const { build } = require('./docker')

const cli = meow(`
    Usage
      $ cli <type> <options>

    Type
      type is command type

    Options
      -v, --version     version of cli

    Examples
      $ cli             # Show all item
      $ cli add         # Add item
      $ cli remove -a   # Remove all item
  `, {
  flags: {
    debug: {
      type: 'boolean',
      default: false
    }
  }
})

const options = {
  cwd: cli.input[0] || cli.flags.dir,
  update: cli.flags.update,
  debug: cli.flags.debug,
  ignore: cli.flags.ignore
}

if (options.debug) {
  debug('cli.flags', cli.flags)
  debug('cli.input', cli.input)
}

const questions = [
  {
    type: 'list',
    name: 'baseImage',
    message: 'Select base image for docker',
    choices: ['node:alpine', 'node:10.13.0-alpine', new inquirer.Separator(), 'custom']
  }
]

if (isBlank(cli.input[0])) {
  console.log(cli.help)
  process.exit(1)
} else {
  inquirer.prompt(questions).then(answers => {
    build(cli.pkg.name)
  })
}
