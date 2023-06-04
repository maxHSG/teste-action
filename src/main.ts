import * as core from '@actions/core'
import {NodeSSH} from 'node-ssh'

async function run(): Promise<void> {
  try {
    const password = core.getInput('ssh-password')
    const port = Number(core.getInput('ssh-port') || 22)
    const username = core.getInput('ssh-username')

    const hosts = [{host: '144.217.220.182', name: 'Debian teste'}]

    const ssh = new NodeSSH()

    for await (const {host, name} of hosts) {
      core.setOutput(`Atualizando o cliente`, name)

      await ssh.connect({
        host,
        username,
        readyTimeout: 5 * 1000,
        port,
        password
      })

      core.debug(`Conectado no ssh`)

      const {stderr, stdout, code} = await ssh.execCommand(
        `cd /var/www && git pull origin master && docker compose up -d`
      )

      core.setOutput('o comando retornou', {
        stderr,
        stdout,
        code
      })

      if (code !== 0) {
        throw new Error(stderr)
      }

      core.setOutput('o comando retornou', {stdout, stderr})

      core.debug(`O comando foi executado`)
    }
    process.exit(core.ExitCode.Success)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)

    process.exit(core.ExitCode.Failure)
  }
}

run()
