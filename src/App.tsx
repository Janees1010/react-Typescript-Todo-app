import { useContext, useEffect, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { ToDoContext } from "./context";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useCompletedTodoContext } from "./context/CompletedTodoContext";
import axios,{AxiosResponse} from "axios"
import { Todo } from "./model";


const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const {todos,setTodos} = useContext(ToDoContext);
  const {completed,setCompleted} = useCompletedTodoContext()

  useEffect(()=>{
    const fetchTodos = async () => {
      try {
          const response: AxiosResponse<Todo[]> = await axios.get("http://localhost:3000");
          if (response) {
              setTodos(response.data);
          }
      } catch (error) {
          console.error("Error fetching todos:", error);
      }
  };

  fetchTodos(); 

  },[])

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (todo) { 
      try {
        const response:AxiosResponse<Todo> = await axios.post("http://localhost:3000/addtodo",{todo})
        if(response.data){
           setTodos([...todos,response.data])
        }
      } catch (error) {
        console.log(error);
      } 
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
