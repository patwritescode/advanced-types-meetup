const printString = (text: string | string[]): string => {
    if(typeof text === "string") { // <- type guard
        return text;
    }
    // compiler is aware that "text" is a string array now
    return text.join(" ");
}

