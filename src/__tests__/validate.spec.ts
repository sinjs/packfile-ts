import { ValidationError } from "class-validator";
import { Packfile, IPackfile, ModLoader, objectToPackfile } from "../";
import { obj_copy } from "../helper/obj-copy";
import "../helper/test/to-contain-instance-of";
import valid_obj from "../helper/test/valid-packfile-obj";

describe("object to packfile", () => {
  test("valid object", () => {
    expect(objectToPackfile(valid_obj)).resolves.toBeInstanceOf(Packfile);
  });

  test("invalid object", () => {
    expect(objectToPackfile({})).rejects.toContainInstanceOf(ValidationError);
  });

  test("perf: 1000 mods", () => {
    let obj = obj_copy(valid_obj);

    while (obj.mods.length < 1000) {
      obj.mods.push(valid_obj.mods[0]);
    }

    expect(objectToPackfile(obj)).resolves.toBeInstanceOf(Packfile);
  });
});
