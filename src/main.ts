import * as core from '@actions/core'
import * as cache from '@actions/cache'
import path from 'path'
import {execSync} from 'child_process'
async function run(): Promise<void> {
  try {
    //Define o caminho para o diretório do projeto EasyChannel
    const reactBuildPath = path.join(
      process.cwd(),
      'CI.php'
      //   'assets',
      //   'js',
      //   'react',
      //   'dist'
    )

    const paths = [reactBuildPath]

    const key = 'teste2'

    const cacheKey = await cache.restoreCache(paths, key, [key])

    core.info(`cacheKey ${cacheKey}`)

    if (cacheKey) {
      core.info('Recuperando arquivo do cache')
    } else {
      const lsOutput = execSync(`ls`)

      core.info(lsOutput.toString('utf-8'))

      await cache.saveCache(paths, key)
    }

    process.exit(core.ExitCode.Success)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)

    process.exit(core.ExitCode.Failure)
  }
}

run()
