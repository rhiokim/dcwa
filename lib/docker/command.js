const { exec } = require('child_process')

module.exports = (command, cb) => {
  let cmd = `docker ${command}`

  const options = {
    cwd: process.cwd(),
    env: {
      DEBUG: '',
      HOME: process.env.HOME,
      PATH: process.env.PATH
    },
    maxBuffer: 200 * 1024 * 1024
  }

  return new Promise((resolve, reject) => {
    exec(cmd, options, (err, stdout, stderr) => {
      if (err) {
        const message = `error: '${err}' stdout = '${stdout}' stderr = '${stderr}'`
        reject(message)
      }

      resolve({ result: stdout })
    })
  }).then(data => {
    return {
      command: cmd,
      raw: data.result
    }
  })
}
