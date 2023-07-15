<center>

# packfile-ts

The official Packfile implementation for JavaScript and TypeScript

</center>

---

## Installation

**This packages requires Node.js version `18` or above, due to the global fetch API required.**

Use your favourite package manager to install!

```shell
npm install --save @packfile/packfile-ts
yarn add @packfile/packfile-ts
pnpm add @packfile/packfile-ts
```

If you are using TypeScript, you do not have to install types from `@types` because type declarations are already bundled with this package.

## Usage

It is **HIGHLY** recommended that you use **TypeScript** instead of **JavaScript** for additional type safety less runtime errors.

### ES Modules (recommended)

In TypeScript, you do **not** have to use `esModuleInterop`, since it is already an ES module.

```typescript
import packfile from "@packfile/packfile-ts";
// ...
```

### CommonJS / require

```javascript
const packfile = require("@packfile/packfile-ts");
// ...
```

### Notice

You should **always** import from `index.js` or the root of the package, because it requires `reflect-metadata` to load first. If you do not do that, you might get an error like this:

```javascript
TypeError: Reflect.getMetadata is not a function
        at ... (...:12:34)
        // ...
```

If you want other files however, there are 2 ways to fix this issue:

- _side-effect only importing_ `@packfile/packfile-ts` in your `index.ts` file (**TypeScript** only)

```typescript
import "@packfile/packfile-ts";
// other imports come BELOW this import
```

- if you want to use the default export, just importing will work fine as well

```typescript
import packfile from "@packfile/packfile-ts";
// other imports
```

## Reference

### `objectToPackfile(...): Promise<Packfile>`

- Signatures:
  - `objectToPackfile(obj: any): Promise<Packfile>`
  - `objectToPackfile(json: string): Promise<Packfile>`

This function converts a plain object or a json string to an instance of `Packfile`.

**Throws:** `ValidationError` when the validation failed, for example due to missing or bad types on properties

### `fetchPackfileFromURL(urlstr: string): Promise<Packfile>`

This function fetches a Packfile from an URL specified, then returns an instance of `Packfile`

**Throws:**

- `ValidationError` when the validation failed, for example due to missing or bad types on properties
- `HttpResponseError` if the HTTP request failed with a status code.

### `fetchPackfileFromPath(fpath: string): Promise<Packfile>`

Reads the packfile from the file path specified, then returns an instance of `Packfile`

Note: opens the file with flag `r` (read-only)

**Throws:** `ValidationError` when the validation failed, for example due to missing or bad types on properties
