import React, { useState, createContext, useContext } from "react";
import { Todo } from "../model";

// Define the types for props and context
type Props = {
  children: React.ReactNode;
};

interface CompletedTodoContextType {
  completed:Todo[];
  setCompleted: React.Dispatch<React.SetStateAction<Todo[]>>
}

// Define default values for context
const defaultValue: CompletedTodoContextType = {
  completed:[],
  setCompleted: () => {}
};

// Create the context
export const CompletedTodoContext = createContext<CompletedTodoContextType>(defaultValue);

// Provider component
export const CompletedTodoProvider = ({ children }: Props) => {
  const [completed, setCompleted] = useState<Todo[]>([]);

  return (
    <CompletedTodoContext.Provider value={{ completed, setCompleted }}>
      {children}
    </CompletedTodoContext.Provider>
  );
};

// Hook to use the CompletedTodoContext
export const useCompletedTodoContext = () => useContext(CompletedTodoContext);
