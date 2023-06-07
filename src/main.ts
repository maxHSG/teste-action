import * as core from '@actions/core'
import * as cache from '@actions/cache'
import * as glob from '@actions/glob'
import {execSync} from 'child_process'

async function run(): Promise<void> {
  try {
    const platform = process.env.RUNNER_OS

    const fileHash = await glob.hashFiles('assets/js/react')

    const key = `teste-${platform}-yarn-${fileHash}`

    core.info(`Procurando pela key ${key}`)

    const paths = ['teste.txt']

    const cacheKey = await cache.restoreCache(paths, key)

    core.info(`cacheKey ${cacheKey}`)

    if (cacheKey) {
      core.info('Recuperando arquivo do cache')
    } else {
      core.info('Cache nao encontrado')
      // core.info('Fazendo build...')

      const output = execSync(`echo "teste" > teste.txt && cat teste.txt && ls`)

      core.info(output.toString('utf-8'))
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
