import {NodeSSH} from 'node-ssh'

export const createExecSSH =
  (crendetials: {
    host: string
    username: string
    port: number
    password: string
  }) =>
  async (command: string): Promise<string> => {
    const ssh = new NodeSSH()

    await ssh.connect({
      readyTimeout: 60 * 1000,
      ...crendetials
    })

    const {stderr, stdout, code} = await ssh.execCommand(command)

    if (code === 0) {
      return stdout
    }

    throw new Error(stderr)
  }
