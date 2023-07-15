import { HttpResponseError } from "./helper/http-error";
import { Packfile } from "./export";
import { objectToPackfile } from "./validate";
import { isObject } from "class-validator";
import * as path from "path";
import * as fs from "fs/promises";

export async function fetchPackfileFromURL(url: string): Promise<Packfile> {
  const res = HttpResponseError.checkResponse(await fetch(url));
  const json = await res.json();

  if (!isObject(json)) {
    throw new TypeError("Response JSON is not object");
  }

  return objectToPackfile(json);
}

export async function fetchPackfileFromPath(ipath: string): Promise<Packfile> {
  const fpath = path.resolve(ipath);
  const handle = await fs.open(fpath, "r");
  const content = await handle.readFile("utf-8");

  return await objectToPackfile(content);
}
