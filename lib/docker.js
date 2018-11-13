const command = require('./docker/command')

const build = name => {
  command(`build -t ${name} .`).then(res => {
    console.log(res)
  })
}

module.exports = {
  build
}
