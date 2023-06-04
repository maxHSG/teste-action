import * as core from '@actions/core'
import {createExecSSH} from './exec'

async function run(): Promise<void> {
  try {
    const sshPassword = core.getInput('ssh-password')
    const sshPort = Number(core.getInput('ssh-port') || 22)
    const sshUsername = core.getInput('ssh-username')

    const hosts = [{host: '144.217.220.182', name: 'Debian teste'}]

    for await (const {host, name} of hosts) {
      core.debug(`Atualizando o cliente ${name}`)

      const execSSH = createExecSSH({
        host,
        password: sshPassword,
        port: sshPort,
        username: sshUsername
      })

      const output = await execSSH(`cd  /var/www && ls`)

      core.setOutput('output', output)
      // await execSSH(
      //   `cd  /var/www && git pull origin master && docker compose up -d`
      // )
    }

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
