import * as core from '@actions/core'
import {NodeSSH} from 'node-ssh'

async function run(): Promise<void> {
  try {
    const password = core.getInput('ssh-password')
    const port = Number(core.getInput('ssh-port') || 22)
    const username = core.getInput('ssh-username')

    const hosts = [{host: '144.217.220.182', name: 'Debian teste'}]

    const ssh = new NodeSSH()

    const [{host, name}] = hosts

    // for await (const {host, name} of hosts) {
    core.debug(`Atualizando o name ${name}`)
    core.debug(`Atualizando o host ${host}`)

    await ssh.connect({
      host,
      username,
      timeout: 5 * 1000,
      readyTimeout: 5 * 1000,
      port,
      password
    })

    core.debug(`Conectado no ssh`)

    return
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
