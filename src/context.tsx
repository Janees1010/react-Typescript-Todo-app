import { createContext, ReactNode, useState } from "react";
import { Todo } from "./model";

interface TodoContextType {
    todos: Todo[];
    setTodos:  React.Dispatch<React.SetStateAction<Todo[]>>
}

interface props {
    children:ReactNode
}

const defaultContextValue: TodoContextType = {
    todos: [],
    setTodos: () => {}
};

export const ToDoContext = createContext<TodoContextType>(defaultContextValue)

const TodoContextProvider = ({children}:props)=>{
    const [todos,setTodos] = useState<Todo[]>([])
    return(
        <ToDoContext.Provider value={{todos,setTodos}}>
             {children}
        </ToDoContext.Provider>
    )
}


export default TodoContextProvider;
