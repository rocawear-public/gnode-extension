import { zip } from "zip-a-folder"
import fs from "fs-extra"
import p from "./package.json"
// import e from "./store/extension.json"

async function main() {
  try {
    await fs.copy("./store", "./dist")
    await createPackage()
    // await createExtension()
    await zip("./dist", "./store/extension.zip")
  } catch (err) {
    console.error(err)
  }
}

main()

async function createPackage() {
  const { devDependencies, scripts, type, ...rest } = p

  const filtered = {
    ...rest,
    type,
    main: "./src/index.js",
    scripts: {
      start: "node ./src/index.js",
    },
  }
  await fs.writeFile("./dist/package.json", JSON.stringify(filtered, null, 2))
}

// async function createExtension() {
//   const { title, description, authors, framework, ...rest } = e
//   // const d = new Date()

//   const filtered = {
//     title: p.name,
//     description: p.description,
//     ...rest,
//     authors: [
//       {
//         ...authors[0],
//         name: p.author,
//       },
//     ],
//     version: p.version,
//     framework: {
//       ...framework,
//       version: p.dependencies["gnode-api"].replace("^", ""),
//     },
//     source: {
//       source: p.source,
//       readme: p.readme,
//       releases: p.releases,
//     },
//     // updateDate: time,
//   }

//   await fs.writeFile("./store/extension.json", JSON.stringify(filtered, null, 2))
// }
