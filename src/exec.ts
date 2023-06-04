import {NodeSSH} from 'node-ssh'

const password = process.env.PASSWORD

export const createExecSSH =
  (crendetials: {
    host: string
    username: string
    port: number
    password: string
  }) =>
  (command: string): Promise<string> =>
    new Promise((resolve, reject) => {
      const ssh = new NodeSSH()
      ssh
        .connect({
          readyTimeout: 60 * 1000,
          ...crendetials
        })
        .then(async () => {
          const {stderr, stdout, code} = await ssh.execCommand(command)

          if (code === 0) {
            return resolve(stdout)
          }

          if (stdout) {
            resolve(stdout)
          } else if (stderr) {
            reject(stderr)
          }
        })
    })
