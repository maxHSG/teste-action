import * as core from '@actions/core'
import * as cache from '@actions/cache'
// import * as toolsCache from '@actions/tool-cache'
// import {NodeSSH} from 'node-ssh'
// import path from 'path'

import {execSync} from 'child_process'
async function run(): Promise<void> {
  try {
    //Define o caminho para o diretório do projeto EasyChannel

    const reactBuildPath = 'assets/js/react/dist'

    //Define o caminho para o diretório do projeto EasyChannel

    // Use o diretório em cache para outras etapas do fluxo de trabalho
    // ...

    const paths = [reactBuildPath]

    const key = 'build'

    const cacheKey = await cache.restoreCache(paths, key)

    try {
      const lsOutput = execSync(`ls ${reactBuildPath}`)

      core.info(lsOutput.toString('utf-8'))
    } catch (error) {
      if (error instanceof Error) {
        core.info(error.message)
      }
    }

    if (cacheKey) {
      core.info('Recuperando arquivo do cache')
    } else {
      core.info('Fazendo build...')

      //   const output = exec(`cd assets/js/react && yarn && npm run build`)

      //   output.stdout?.on('data', stdout => {
      //     core.info(stdout)
      //   })
      //   output.stderr?.on('data', stdout => {
      //     core.info(stdout)
      //   })

      //   await new Promise(resolve => {
      //     output.on('close', () => {
      //       resolve(null)
      //     })
      //   })

      //   core.info('Build termiada')

      //   const lsOutput = execSync(`ls ${reactBuildPath}`)

      //   core.info(lsOutput.toString('utf-8'))

      //   await cache.saveCache(paths, key, undefined, true)
    }

    // Navega até o diretório do projeto EasyChannel

    // const password = core.getInput('ssh-password')
    // const port = Number(core.getInput('ssh-port') || 22)
    // const username = core.getInput('ssh-username')

    // const hosts = [{host: '144.217.220.179', name: 'Debian teste'}]

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
    //     `cd /var/www && git pull origin master`,
    //     {
    //       onStderr(chunk: Buffer) {
    //         core.info(chunk.toString('utf8'))
    //       },
    //       onStdout(chunk: Buffer) {
    //         core.info(chunk.toString('utf8'))
    //       }
    //     }
    //   )

    //   if (code !== 0) {
    //     throw new Error(stderr)
    //   }

    //   core.info('Subindo build react')

    //   core.info(`Arquivo ${reactBuildPath}`)

    //   const lsOutput = execSync(`ls ${reactBuildPath}`)

    //   core.info(lsOutput.toString('utf-8'))

    //   await ssh.putDirectory(reactBuildPath, '/var/www/assets/js/react/dist', {
    //     recursive: true
    //   })

    //   core.info('A build do react foi adicionadada com sucesso')

    //   core.info(`O comando foi executado`)
    // }
    process.exit(core.ExitCode.Success)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)

    process.exit(core.ExitCode.Failure)
  }
}

run()
