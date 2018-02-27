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
            //action.value
            break;
        case "REMOVE_ACTION":
            //action.index
            break;
    }
}