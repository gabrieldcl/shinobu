import fs from 'fs'
import path from 'path'

export const requireContext = (fullpath: string = '.', scanSubDirectories: boolean = false, regularExpression: RegExp = /\.js$/): __WebpackModuleApi.RequireContext => {
  const files = {}

  function readDirectory(directory: string) {
    fs.readdirSync(directory).forEach((file) => {
      const fullPath = path.resolve(directory, file)

      if (fs.statSync(fullPath).isDirectory()) {
        if (scanSubDirectories) readDirectory(fullPath)

        return
      }

      if (!regularExpression.test(fullPath)) {
        return
      }

      files[fullPath] = true
    })
  }

  readDirectory(fullpath)

  function Module(file: any) {
    return require(file)
  }

  Module.keys = () => Object.keys(files)

  return Module as __WebpackModuleApi.RequireContext
}

export const importAll = (r: __WebpackModuleApi.RequireContext) => {
  r.keys().forEach(r)
}
