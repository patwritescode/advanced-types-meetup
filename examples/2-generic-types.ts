/**
 * Generic Types
 * - Used to create reusable components
 * - Classes, functions, and their constraints can be generic
 * - Similar to other languages such as C#
 * - Without generics we would have to use 'any' type in reusable components
 *   and lose our type safety
 */

class Something<T> {
    performAction(val: T): Something<T> {
        return this;
    }
}

const something = new Something<string>();
something
    .performAction("hello")
    .performAction("goodbye");

something
    .performAction(12345); // <- does not work

import axios from "axios";
const result = axios
                .get<Something<string>>("http://somesite.com/api/somethings")
                .then(result => result.data);
