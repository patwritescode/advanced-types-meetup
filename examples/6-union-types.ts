/**
 * Union Types
 * - Declares the type as one OR another
 * - Union types only allow access to properties that are shared until type guarded
 * - Also used for concepts that don't always fit the class object-oriented mold
 */


const printString = (text: string | string[]): string => {
    text.push() // doesn't work because push is on array of string but not string!
    if(typeof text === "string") { // <- type guard
        return text;
    }
    // compiler is aware that "text" is a string array now
    text.push("more");
    return text.join(" ");
}

