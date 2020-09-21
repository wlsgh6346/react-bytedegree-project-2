import React, {useReducer, createContext, useContext, useRef } from 'react';

const initialTodos = [
    {
        id: 1,
        title: '용개반점',
        category: '식사',
        amount: 7000,
        done: true,
    },
    {
        id: 2,
        title: '양배추',
        category: '식료품',
        amount: 5000,
        done: true,
    },
    {
        id: 3,
        title: '택시비',
        category: '교통',
        amount: 20000,
        done: true,
    },
    {
        id: 4,
        title: '관리비',
        category: '생활',
        amount: 100000,
        done: true,
    },
    {
        id: 5,
        title: '병원 진료',
        category: '의료',
        amount: 7000,
        done: true,
    },
]

/*
    CREATE
    TOGGLE
    REMOVE
*/
function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return state.concat(action.todo);
        case 'FILTER':
            console.log(action);
            if (action.category==="") {
                return state.map(todo => (
                    todo.done === false ? {...todo, done: true} : {...todo}
                ))
            }
            return state.map(todo =>
                todo.category === action.category ? {...todo, done: true} : {...todo, done: false}
            );
        case 'EDIT':
            return (state.map(todo =>
                    todo.id === action.todo.id ? {
                        id: action.todo.id,
                        title: action.todo.title,
                        category: action.todo.category,
                        amount: action.todo.amount,
                        done: action.todo.done } : todo
                ));
        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(6);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState() {
    const context = useContext(TodoStateContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoDispatch() {
    const context = useContext(TodoDispatchContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}

export function useTodoNextId() {
    const context = useContext(TodoNextIdContext);
    if (!context) {
        throw new Error('Cannot find TodoProvider');
    }
    return context;
}