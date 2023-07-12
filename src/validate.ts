import { validateOrReject } from "class-validator";
import { Packfile } from "./export";
import { plainToInstance } from "class-transformer";

export async function objectToPackfile(obj: object): Promise<Packfile>;
export async function objectToPackfile(json: string): Promise<Packfile>;

export async function objectToPackfile(obj: object | string): Promise<Packfile> {
  let instance;
  if (typeof obj === "object") {
    instance = plainToInstance(Packfile, obj);
  } else if (typeof obj === "string") {
    instance = plainToInstance(Packfile, JSON.parse(obj));
  } else {
    throw new TypeError("Object must be of type string or object");
  }

  await validateOrReject(instance);
  return instance;
}
