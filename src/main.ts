import * as core from '@actions/core'
// import {NodeSSH} from 'node-ssh'

async function run(): Promise<void> {
  try {
    // const password = core.getInput('ssh-password')
    // const port = Number(core.getInput('ssh-port') || 22)
    // const username = core.getInput('ssh-username')

    const hosts = [{host: '144.217.220.182', name: 'Debian teste'}]

    // const ssh = new NodeSSH()

    for await (const {host, name} of hosts) {
      core.debug(`Atualizando o cliente ${name}`)
      core.debug(`Atualizando o cliente ${host}`)

      // await ssh.connect({
      //   readyTimeout: 20 * 1000,
      //   host,
      //   username,
      //   port,
      //   password
      // })

      // const {stderr, stdout} = await ssh.execCommand(`cd /var/www/ && ls`)

      // if (stderr) {
      //   throw new Error(stderr?.toString())
      // }

      // core.setOutput('stdout', stdout)

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
