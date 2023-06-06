import * as core from '@actions/core'
import * as cache from '@actions/cache'
import {execSync} from 'child_process'
import {NodeSSH} from 'node-ssh'
import path from 'path'

async function run(): Promise<void> {
  try {
    //Define o caminho para o diretório do projeto EasyChannel
    const reactBuildPath = path.join(
      process.cwd(),
      'assets',
      'js',
      'react',
      'dist'
    )

    const paths = ['assets/js/react/dist']

    const key = 'react_build'

    const cacheKey = await cache.restoreCache(paths, key)

    if (!cacheKey) {
      const output = execSync(`yarn && cd assets/js/react && npm run build`)

      core.info(output.toString('utf-8'))

      await cache.saveCache(paths, key)
    }

    // Navega até o diretório do projeto EasyChannel

    const password = core.getInput('ssh-password')
    const port = Number(core.getInput('ssh-port') || 22)
    const username = core.getInput('ssh-username')

    const hosts = [{host: '144.217.220.179', name: 'Debian teste'}]

    const ssh = new NodeSSH()

    for await (const {host, name} of hosts) {
      core.info(`Atualizando o cliente ${name}`)

      await ssh.connect({
        host,
        username,
        readyTimeout: 5 * 1000,
        port,
        password
      })

      core.info(`Conectado no ssh`)

      const {stderr, code} = await ssh.execCommand(
        `cd /var/www && git pull origin master`,
        {
          onStderr(chunk: Buffer) {
            core.info(chunk.toString('utf8'))
          },
          onStdout(chunk: Buffer) {
            core.info(chunk.toString('utf8'))
          }
        }
      )

      if (code !== 0) {
        throw new Error(stderr)
      }

      core.info('Subindo build react')

      core.info(`Arquivo ${reactBuildPath}`)

      await ssh.putFile(reactBuildPath, '/var/www/assets/js/react/dist')

      core.info('A build do react foi adicionadada com sucesso')

      core.info(`O comando foi executado`)
    }
    process.exit(core.ExitCode.Success)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)

    process.exit(core.ExitCode.Failure)
  }
}

run()
