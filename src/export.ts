import * as interface_v0 from "./interface/v0";
import * as model_v0 from "./model/v0";

export const VERSION = "v0";

const v0 = { ...interface_v0, ...model_v0 };

export { v0 };

export * from "./model/v0";
export * from "./interface/v0";
