# advanced-types-meetup

You can read the blog post write up here: http://www.patrickdunn.org/advanced-types-in-typescript/

I gave a presentation at the Boston TypeScript Meetup recently on this subject and figured I'd do a quick write up to reference in the future. You can find the examples and talking points from the meetup on [my GitHub](https://github.com/patwritescode/advanced-types-meetup). Some of the examples use specific libraries or patterns such as Redux and React.

## Type Assertions

In TypeScript you have two forms of type assertion; generic cast and a "cast as". They both accomplish the same thing, however, they are a bit different than how casting works in other programming languages. Namely, a type assertion does not have any runtime impact, instead, it simply indicates to the compiler that it should trust your judgement on what this type is. This is particularly useful when dealing with libraries that return bad typings such as `any`.

```typescript
const someValue: any = "this is a string";
const stringLength = (<string>someValue).length;
const stringLength2 = (someValue as string).length;
```

## Generic Types

Generics are something you're likely familiar with if you're used any strongly typed language in the past. It's a very common pattern and is the basis to a lot of programmtic patterns such as the "generic repository pattern". Generics are used to create reusable components. Classes, functions, and their constraints can be generic. Without generics in TypeScript we would be forced to use `any` for a generic component, losing type safety, or we would have to have a concrete implementation per type.

Consider the following class example:

```typescript
class Something<T> {
    performAction(val: T): Something<T> {
        return this;
    }
}
```

In this case `Something` take a generic argument of `T`. When we instatiate `Something` we will define what T is. The `performAction` function on the class uses this type to also assert the type expected for its `val` parameter and then it simply returns itself. Not a particularly useful class but it serves the purpose of showing how you can use that generic type through your class and its functions, constraints, return types, etc.

```typescript
const something = new Something<string>();
something
    .performAction("hello")
    .performAction("goodbye");

something
    .performAction(12345); // <- does not work
```

When we instantiate `Something` above we are asserting the generic type to `string`. This means that `performAction` is expecting to receive a string. So the first chain of actions works. However, when we try to pass in a number we will get a compiler error that the value passed in is not assignable to type string.

Generics are also used by typings for third-party libraries a lot to help you assert a type of an unknown value type, which is kind of a type assertion in its own way. Consider the below example which uses the promise-based http client `axios` to make a `GET` call to a restful web service. We can't be sure exactly what it will return so axios let's us use a generic on its `get` function to assert the type we assume the data will be in return.

```typescript
import axios from "axios";
const result = axios
                .get<Something<string>>("http://somesite.com/api/somethings")
                .then(result => result.data); // <- result.data is of type "Something<string>"
```

Keep in mind, if the result comes back in a form that is not what you set as your generic, it won't cause any immediate runtime errors since it's simply describing the expected shape of the data and not trying to explicitly deserialize it into that shape. For something like that, you would want to take a look at typestack's [`class-transformer`](https://github.com/typestack/class-transformer) library.

## Interfaces

Much like the above two examples, interfaces are something you might conceptually be familiar with from strongly-typed languages but they also come with their own differences. In TypeScript, interfaces have no runtime representation. This means they can't be decorated or reflected on with `reflect-metadata`. In another post I'll go more in depth about this and the state of dependency injection in TypeScript. For now, understand that interfaces simply describe the contract between pieces of your code by type checking the expected shape of that object. You can't use it to directly declare primitive types, unions, or intersections like a type alias but you can extend them or implement from them.

```typescript
interface IProps {
    title: string;
    name: string;
    count: number;
    update: () => void;
}

interface IOther extends IProps {
    description: string;
}

class Other implements IOther {
    description: string;
    title: string;
    name: string;
    count: number;
    update () {
        console.log("updated");
    };
    
}
```

## Type Aliases

Type aliases allow you to assign a name to an existing type. They do not declare new types but because you can assign a name to an object literal you can use it in place of interfaces in a lot of situations. You'll see a lot of mixed opinions on whether or not to use a type alias or an interface. My thought is, if it's describing a new data shape or type then create an interface and if it's just referencing an existing type use a type alias. Type aliases also allow you to alias primitive types, unions, and intersections.

A type alias cannot be extended or implemented from unless the type consists solely of extendable and implementable types. What this means is, in the example below, the `Props` type is an intersection of interfaces which are all extendable and implementable and therefore the type can be extended and implemented. However, `SomeInput` is an alias to a union of primitive types which cannot be implemented or extended.

```typescript
interface IStateProps {
    title: string;
}

interface IOwnProps {
    isVisible: boolean;
}

interface IDispatchProps {
    doSomething: () => void;
}

type Props = IOwnProps & IStateProps & IDispatchProps;

type SomeInput = string | number;
```

## Intersections

Intersections allow you to combine multiple types into one. The resulting type will have all the members of all the types declared in the intersection. This is used primarily for concepts that don't always fit the class object-oriented mold, which is fairly common in JS.

One of the most common intersections you'll make is when working with `react` `redux` and the `react-redux` `connect()` function. In this scenario you need to declare an interface for the result of `mapStateToProps` as well as `mapDispatchToProps` as the connect function takes them individually declared in its generic constraints.

In the below example, the component takes the intersected interfaces as its type for `props`.

```typescript
interface IStateProps {
    title: string;
}

interface IOwnProps {
    isVisible: boolean;
}

interface IDispatchProps {
    doSomething: () => void;
}

const SomeStatelessComponent = (props: IStateProps & IOwnProps & IDispatchProps) => {
    if(props.isVisible) {
        return null
    }
    return (
        <div>
            {props.title}
            <button onClick={props.doSomething}>do something</button>
        </div>
    )
}

const mapStateToProps = (state): IStateProps => {
    return {
        title: "something"
    }
}

const mapDispatchToProps = (): IDispatchProps => ({
    doSomething: () => console.log("button clicked")
});

export default connect<IStateProps, IDispatchProps, IOwnProps>(mapStateToProps, mapDispatchToProps)(SomeStatelessComponent);
```

## Unions

So we learned that intersections declare a type as one **AND** another. Unions declare a type as one **OR** another. The big difference being that while intersections allow access to properties of each of its members, union only allows access to the shared props between the types.

In the example below, the `text` param is declared as a union between a string and array of strings. Until we are in context under a type guard we can only access the props shared by both string and string array.

```typescript
const printString = (text: string | string[]): string => {
    text.push() // doesn't work because push is on array of string but not string!
    if(typeof text === "string") { // <- type guard
        return text; // <- we know this is a string now
    }
    // compiler is aware that "text" is a string array now
    text.push("more");
    return text.join(" ");
}
```

## Type Guards

In the example above we used `typeof` to create a type guard so that the compiler was aware of a context where the `text` prop was a `string` and another where it was a `string[]`. This works because the compiler is smart enough to understand that in a union of two types if one is explicitly checked in `if` statement, in the context of the `if` statement it must be a string and not an array of string. Since we return out of that context all fall throughs not caught by that statement must be an array of string type.

Similarly to primitive types using a `typeof` safe guard, classes and functions can use `instanceof`. However, be mindful that you can't always trust that a third party won't mutate your instance of a class or function in a way that strip their type.

```typescript
class StringSomething implements ISomething<string> {
    constructor(public value: string) {}
}

class NumberSomething implements ISomething<number> {
    constructor(public value: number) {}
}

const doSomething = (something: StringSomething | NumberSomething) => {
    if(something instanceof StringSomething) {
        // we know value is a string here
        something.value = "test";
        return something.value;
    }
    else if(something instanceof NumberSomething) {
        // we know value is a number here
        something.value = 123;
        return something.value;
    }
}
```

User defined type guards use an expression to perform a runtime check that guarantees the type in some scope. In the example below, both interfaces for Fish and Cat declare the property name as a string. our `doAction` function takes a union of `Fish | Cat` and we create a user defined type guard to assert whether the parameter `pet` is a `Cat`.

```typescript
interface Fish {
    swim: () => void;
    name: string;
}

interface Cat {
    climb: () => void;
    name: string;
}
const isCat = (pet: Fish | Cat): pet is Cat => {
    return (<Cat>pet).climb !== undefined;
}
const doAction = (pet: Fish | Cat): void => {
    if(isCat(pet)) {
        pet.climb();
    }
    else {
        pet.swim();
    }
}
```
In the scope of the `if` statement created without our user defined type guard, we know that pet can climb since it is a `Cat`. Since we don't return out of that context, we have to declare `else` in order to cover both `Fish` and `Cat`. If we tried to access `pet.swim()` outside of the `else` statement it would fail since the compiler once again isn't sure if it's a `Cat` or a `Fish`.

## Numeric and String Literal Types

Both numeric and string literal types allow you to specify the exact value a primitive numer or string type should have. They are especially useful with union types and aliases to declare types where we know we have a fixed value. While in some situations you could use an interface, a union of string or numeric literals is especially valuable when declaring types of expected values from a third party or already declared types.

Below I have simple React component that somewhat describes what it would be like to wrap a bootstrap column. Since bootstrap has a set range of values expected for column size and value we can use string and numeric literals to declare these types on an props interface.

```typescript
type ColSize = "xs" | "sm" | "md" | "lg"; <- string literal
type ColValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12; <- numeric literal
interface IColProps {
    size: ColSize;
    value: ColValue;
}

const Col = (props: IColProps) => {
    return (
        <div className={`col col-${props.size}-${props.value}`}/>
    );
}
```

## Discriminated Unions
Also known as "tagged unions" or "algebraic data types", a discriminated union pulls in a combination of the aforementioned types we discussed. It combines singleton types, unions, and type aliases in a way that is most useful for functional programming or building type safety into patterns such as a Redux reducer.

The sample below declares two interfaces describing the shape of two different actions we'll pass to a reducer function. They both declare type as a string literal but have a separate second property `value` and `index`. We create a type alias `Action` which names the union of these two interfaces.

Inside the reducer function the `switch` statement acts a type guard giving a context where each of the unioned types are accessible.

```typescript
interface UpdateAction {
    type: "UPDATE_ACTION",
    value: string;
}

interface RemoveAction {
    type: "REMOVE_ACTION",
    index: number;
}

type Action = UpdateAction | RemoveAction;

// our switch cases know the type now
const reducer = (state, action: Action) => {
    switch(action.type) {
        case "UPDATE_ACTION":
            // recognizes "value" and that it is a string
            action.value
            break;
        case "REMOVE_ACTION":
            // recognizes "index" and that it is a number
            action.index
            break;
    }
}
```

## keyof and lookup types

The keyof keyword and lookup types help enforce generic types that expect property names and/or values as parameters. In this scenarios, the compiler checks that a property is available as a stype and that the value of the property is the same as it is declared on that type.

Below I have a `FakeImmutable` class that demonstrates how to use a keyof and lookup type in order to ensure out `setValue` function only accepts types from our declared type in the generic.

```typescript
class FakeImmutable<T> {
    setValue<K extends keyof T>(field: K, val: T[K]): FakeImmutable<T> {
        // do some immutable stuff
        return this;
    }
}

class Person {
    name: string;
    age: number;
}

const fakeImmutable = new FakeImmutable<Person>();
fakeImmutable.setValue("name", "test");
fakeImmutable.setValue("name", 123); // not valid!
fakeImmutable.setValue("age", 123); // valid!
```

## Summary

There's a lot to TypeScript's type system so expect some posts that go further in depth on these topics in the future. Also, be sure to read over the [2.7 release notes](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html); they have a lot of good changes to types especially involving symbols and additional ways to create typeguards.

Again, here's [my repo that contains the examples and talking points](https://github.com/patwritescode/advanced-types-meetup) I used while presenting. If you're in the Boston area and want to join us [checkout our meetup](https://www.meetup.com/Boston-TypeScript-Meetup/).
