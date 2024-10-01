import { useContext, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { ToDoContext } from "./context";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useCompletedTodoContext } from "./context/CompletedTodoContext";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
 
  const context = useContext(ToDoContext);

  const { todos, setTodos } = context;
  const {completed,setCompleted} = useCompletedTodoContext()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      console.log(todos);
      setTodo("");
    }
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { source, destination } = result;
  
    console.log("hello world");
  
    // If there's no destination (e.g., drop outside), exit early
    if (!destination) return;
  
    // If the item is dropped at the same position, exit early
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }
  
    // Create shallow copies of the todos and completed lists
    let active = todos;
    let complete = completed;
    let add;
  
    // Moving from active todos
    console.log(source.droppableId);
    
    if (source.droppableId === "TodosList") {
      console.log("reached");
      
      add = active[source.index];
      active.splice(source.index, 1);
    } 
    // Moving from completed todos
    else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }
  
    // Dropping into active todos
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } 
    // Dropping into completed todos
    else {
      complete.splice(destination.index, 0, add);
    }
  
    // Update the state with the new arrays
    setTodos(active);
    setCompleted(complete);
    console.log(todos);
    console.log(completed);
    
    
  };
  
 
  return (
   
    <DragDropContext onDragEnd={handleOnDragEnd}>
        <div className="container">
          <h1 className="text-gray-600 text-5xl font-bold m-5 ">Taskify</h1>
          <InputField
            todo={todo}
            setTodo={setTodo}
            handleSubmit={handleSubmit}
          />
          <TodoList />
        </div>
      </DragDropContext>
 
  );
};

export default App;
