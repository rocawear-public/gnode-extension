import { Extension } from "gnode-api"
import extensionInfo from "../package.json" assert { type: "json" }

const ext = new Extension(extensionInfo)
ext.run()
