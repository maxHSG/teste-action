import * as core from '@actions/core'
import * as cache from '@actions/cache'
import {execSync} from 'child_process'

async function run(): Promise<void> {
  try {
    const platform = process.env.RUNNER_OS

    const key = `teste-${platform}-yarn`

    core.info(`Procurando pela key ${key}`)

    const paths = ['teste.txt']

    core.info(paths[0])

    const cacheKey = await cache.restoreCache(paths, key)

    core.info(`cacheKey ${cacheKey}`)

    if (cacheKey) {
      core.info('Recuperando arquivo do cache')
    } else {
      core.info('Cache nao encontrado')
      // core.info('Fazendo build...')

      const output = execSync(`echo "teste" > teste.txt && cat teste.txt && ls`)

      core.info(output.toString('utf-8'))

      await cache.saveCache(paths, key)
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
