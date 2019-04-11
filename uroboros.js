const { readFileSync
      , writeFileSync
      } = require('fs')
const path = require('path')

const compose = (f) => (g) => (v) => g (f (v))

const makeAbsolutePath =
  (relativePath) =>
    path.resolve(process.cwd(), relativePath)

const readJsonSync =
  (path) => {
    const absPath = makeAbsolutePath(path)
    const jsonStr = readFileSync(absPath, 'utf8')
    const obj = JSON.parse(jsonStr)

    return obj
  }

const writeJsonSync =
  (path) =>
    (data) => {
      const jsonStr = JSON.stringify(data, null, 2)
      writeFileSync(path, `${jsonStr}\n`)
    }

const questions =
  [ { question: 'Project name'
    , property: 'name'
    }
  , { question: 'Init version'
    , property: 'version'
    }
  , { question: 'Project description'
    , property: 'description'
    }
  ]

const updatePackageJson =
  ( { name
    , description
    , version
    }
  ) =>
    (packageJson) => (
      { ...packageJson
      , name
      , description
      , version
      }
    )

const setup =
  ( { name
    , description
    , version
    }
  ) => {
    const packageJson = readJsonSync('./package.json')
    const newPackageJson =
      updatePackageJson
      ( { name
        , description
        , version
        }
      )
      ( packageJson )
    writeJsonSync ('./package.json') (newPackageJson)

    return null
  }

module.exports =
  { questions
  , setup
  }
