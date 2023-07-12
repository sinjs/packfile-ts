export function obj_copy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
