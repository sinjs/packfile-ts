import { ValidationError } from "class-validator";
import { Packfile, fetchPackfileFromPath, fetchPackfileFromURL } from "../";
import validPackfileObj from "../helper/test/valid-packfile-obj";
import "../helper/test/to-contain-instance-of";
import fs from "fs/promises";

declare var fetch: jest.Mock;

global.fetch = jest.fn(function (url: string) {
  if (url.includes("valid-object")) {
    return Promise.resolve({
      json: () => Promise.resolve(validPackfileObj),
      ok: true,
    });
  } else if (url.includes("wrong-object")) {
    return Promise.resolve({
      json: () => Promise.resolve({}),
      ok: true,
    });
  }
  return null;
}) as jest.Mock;

jest.mock("fs/promises", () => {
  return {
    open: jest.fn(),
    readFile: jest.fn(),
  };
});

describe("fetch packfile from url", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("valid object", async () => {
    const packfile = fetchPackfileFromURL("https://valid-object.org");
    expect(packfile).resolves.toBeInstanceOf(Packfile);
  });

  test("invalid object", async () => {
    const packfile = fetchPackfileFromURL("https://wrong-object.org");
    expect(packfile).rejects.toContainInstanceOf(ValidationError);
  });
});

describe("fetch packfile from file", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("valid object", async () => {
    const mockOpen = (fs.open as jest.Mock).mockImplementation(async function open(
      ..._: unknown[]
    ) {
      return {
        async readFile(..._: unknown[]) {
          return JSON.stringify(validPackfileObj);
        },
      };
    });

    const packfile = await fetchPackfileFromPath("valid-object");

    expect(mockOpen).toHaveBeenCalledWith(expect.stringContaining("valid-object"), "r");
    expect(packfile).toBeInstanceOf(Packfile);
  });

  test("invalid object", async () => {
    const mockOpen = (fs.open as jest.Mock).mockImplementation(async function open(
      ..._: unknown[]
    ) {
      return {
        async readFile(..._: unknown[]) {
          return JSON.stringify({});
        },
      };
    });

    const packfile = fetchPackfileFromPath("invalid-object").finally(() =>
      expect(mockOpen).toHaveBeenCalledWith(expect.stringContaining("invalid-object"), "r"),
    );

    expect(packfile).rejects.toContainInstanceOf(ValidationError);
  });
});
