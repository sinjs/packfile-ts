import { IPackfile, ModLoader } from "../../export";

export default {
  _pf_version: "v0",
  loader: ModLoader.Forge,
  meta: {
    author: "Max",
    description: "Hello, world!",
    name: "Testpack",
    version: { major: 1, minor: 0, patch: 0, name: "Update 1" },
  },
  mods: [
    {
      download: "https://example.org/mods/download/123456/jar",
      meta: {
        author: "Sax",
        description: "Goodbye, world!",
        name: "Testmod",
        version: { major: 1, minor: 0, patch: 0, name: "1.0.0" },
      },
    },
  ],
} as IPackfile;
