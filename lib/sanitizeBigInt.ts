export function sanitizeBigInt(obj: any): any {
    if (obj === null || obj === undefined) return obj;

    if (typeof obj === "bigint") {
        return obj.toString(); // o obj.toString() si prefieres string
    }

    if (obj instanceof Date) {
        return obj.toISOString();
    }

    if (Array.isArray(obj)) {
        return obj.map(sanitizeBigInt);
    }

    if (typeof obj === "object") {
        const newObj: any = {};
        for (const key in obj) {
            newObj[key] = sanitizeBigInt(obj[key]);
        }
        return newObj;
    }

    return obj;
}