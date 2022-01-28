
export function omit(obj:any, key:string) {
    const { [key]: omitted, ...rest } = obj;
    return rest;
}