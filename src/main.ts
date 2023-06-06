import * as core from '@actions/core'
import {execSync} from 'child_process'
// import {NodeSSH} from 'node-ssh'
import path from 'path'

async function run(): Promise<void> {
  try {
    //Define o caminho para o diretório do projeto EasyChannel
    const easyChannelPath = path.join(process.cwd(), 'assets', 'js', 'react')

    // Navega até o diretório do projeto EasyChannel
    process.chdir(easyChannelPath)

    // Executa o comando de build
    const output = execSync('yarn && npm run build', {
      encoding: 'utf-8'
    })

    core.info(output)
    // const password = core.getInput('ssh-password')
    // const port = Number(core.getInput('ssh-port') || 22)
    // const username = core.getInput('ssh-username')
    // const hosts = [{host: '144.217.220.182', name: 'Debian teste'}]
    // const ssh = new NodeSSH()
    // for await (const {host, name} of hosts) {
    //   core.info(`Atualizando o cliente ${name}`)
    //   await ssh.connect({
    //     host,
    //     username,
    //     readyTimeout: 5 * 1000,
    //     port,
    //     password
    //   })
    //   core.info(`Conectado no ssh`)
    //   const {stderr, code} = await ssh.execCommand(
    //     `cd /var/www && git pull origin master && docker compose up -d`,
    //     {
    //       onStderr(chunk) {
    //         core.info(chunk.toString('utf8'))
    //       },
    //       onStdout(chunk) {
    //         core.info(chunk.toString('utf8'))
    //       }
    //     }
    //   )
    //   if (code !== 0) {
    //     throw new Error(stderr)
    //   }
    //   core.info(`O comando foi executado`)
    // }
    process.exit(core.ExitCode.Success)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)

    process.exit(core.ExitCode.Failure)
  }
}

run()
