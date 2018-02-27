const test = false;
const obj = test ? { text: "hello" } : {};
const val = obj.text;
// the above fails because obj type is inferred as {} instead of
// { text: string } | { text? : undefined }


 
const SERIALIZE = Symbol("some-key");
interface ISerializable {
    [SERIALIZE](obj: {}): string;
}
// the above is valid in 2.7