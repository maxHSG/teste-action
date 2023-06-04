import * as core from '@actions/core'
import {createExecSSH} from './exec'

async function run(): Promise<void> {
  try {
    const sshPassword = core.getInput('ssh-password')
    const sshPort = Number(core.getInput('ssh-port') || 22)
    const sshUsername = core.getInput('ssh-username')

    const hosts = [{host: '144.217.220.182'}]

    for await (const {host} of hosts) {
      core.setOutput(`Executando o host`, host)

      const execSSH = createExecSSH({
        host,
        password: sshPassword,
        port: sshPort,
        username: sshUsername
      })

      await execSSH(
        `cd  /var/www && git pull origin master && docker compose up -d`
      )
    }

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
