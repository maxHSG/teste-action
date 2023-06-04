import * as core from '@actions/core'
import {wait} from './wait'
import {createExecSSH} from './exec'

async function run(): Promise<void> {
  try {
    const sshPassword = core.getInput('ssh-password')
    const sshPort = Number(core.getInput('ssh-port') || 22)
    const sshUsername = core.getInput('ssh-username')

    const hosts = [{host: '144.217.220.182 '}]

    for await (const {host} of hosts) {
      const execSSH = createExecSSH({
        host,
        password: sshPassword,
        port: sshPort,
        username: sshUsername
      })

      core.debug(new Date().toTimeString())
      await execSSH(
        `cd  /var/wwww && git pull origin master && docker-compose up -d`
      )
      core.debug(new Date().toTimeString())
    }

    core.setOutput('time', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
