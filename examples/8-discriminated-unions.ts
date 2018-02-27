/**
 * Discriminated Unions
 * - These are also known as "tagged unions" or "algebraic data types"
 * - Combines singleton types, unions, and type aliases
 * - Useful in areas such as functional programming or building type safety
 *   into things such as Redux reducers;
 */

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