import * as core from '@actions/core'
import * as cache from '@actions/cache'
// import * as glob from '@actions/glob'

// import * as toolsCache from '@actions/tool-cache'
// import {NodeSSH} from 'node-ssh'
// import path from 'path'

// import {exec, execSync} from 'child_process'
async function run(): Promise<void> {
  try {
    //Define o caminho para o diretório do projeto EasyChannel

    const reactBuildPath = 'assets/js/react'

    //Define o caminho para o diretório do projeto EasyChannel

    // Use o diretório em cache para outras etapas do fluxo de trabalho
    // ...

    // const platform = process.env.RUNNER_OS

    // const fileHash = await glob.hashFiles('assets/js/react')

    const key = `node-cache-Linux-yarn-9d9ca08425b4ab3372af0499f67dfa47d2535160da750efc51da4a857f9995a8`

    core.info(`Procurando pela key ${key}`)

    const paths = [reactBuildPath]

    const cacheKey = await cache.restoreCache(paths, key)

    core.info(`cacheKey ${cacheKey}`)

    if (cacheKey) {
      core.info('Recuperando arquivo do cache')
    } else {
      core.info('Cache nao encontrado')
      // core.info('Fazendo build...')

      // const output = exec(`cd assets/js/react && yarn && npm run build`)

      // output.stdout?.on('data', stdout => {
      //   core.info(stdout)
      // })
      // output.stderr?.on('data', stdout => {
      //   core.info(stdout)
      // })

      // await new Promise(resolve => {
      //   output.on('close', () => {
      //     resolve(null)
      //   })
      // })

      // core.info('Build termiada')

      // const lsOutput = execSync(`ls ${reactBuildPath}`)

      // core.info(lsOutput.toString('utf-8'))

      // await cache.saveCache(paths, key)
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
