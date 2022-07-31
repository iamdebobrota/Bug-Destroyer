import { GET_TODOS_ERROR, GET_TODOS_REQUEST, GET_TODOS_SUCCESS } from "./actions"

const initState = {
    loading: false,
    todos: [],
    error: false,
}

export const todosReducer = (state = initState, action) => {

    switch (action.type) {

        case GET_TODOS_REQUEST:
            return {
                ...state,
                loading: true,
            }

        case GET_TODOS_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: action.payload
            }
        case GET_TODOS_ERROR:
            return {
                ...state,
                loading: false,
                todos: [],
                error: action.payload
            }
        default:
            return state
    }
}