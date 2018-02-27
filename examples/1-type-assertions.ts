// declare a type
const someValue: any = "this is a string";
const stringLength = (<string>someValue).length;
const stringLength2 = (someValue as string).length;