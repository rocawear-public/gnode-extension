import { zip } from "zip-a-folder"
import fs from "fs-extra"
import p from "./package.json"
import e from "./store/extension.json"

async function main() {
  try {
    await fs.copy("./dist", "./store")
    await createPackage()
    await createExtension()
    await zip("./store", "./store/extension.zip")
  } catch (err) {
    console.error(err)
  }
}

async function createPackage() {
  const { devDependencies, scripts, type, ...rest } = p

  const filtered = {
    ...rest,
    type,
    main: "index.js",
    scripts: {
      start: "node ./src/index.js",
    },
  }
  try {
    await fs.writeFile("./store/package.json", JSON.stringify(filtered, null, 2))
  } catch (err) {
    console.error(err)
  }
}

async function createExtension() {
  const { title, description, authors, framework, ...rest } = e
  const d = new Date()
  const time = `${d.getDay()}-${d.getMonth()}-${d.getFullYear()} ${d.getHours()}-${d.getMinutes()}-${d.getSeconds()}`

  const filtered = {
    title: p.name,
    description: p.description,
    ...rest,
    authors: [
      {
        ...authors[0],
        name: p.author,
      },
    ],
    version: p.version,
    framework: {
      ...framework,
      version: p.dependencies["gnode-api"].replace("^", ""),
    },
    source: {
      source: p.source,
      readme: p.readme,
      releases: p.releases,
    },
    updateDate: time,
  }

  try {
    await fs.writeFile("./store/extension.json", JSON.stringify(filtered, null, 2))
  } catch (err) {
    console.error(err)
  }
}

main()
