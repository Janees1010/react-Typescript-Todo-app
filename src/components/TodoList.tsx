import { useContext } from "react";
import { Todo } from "../model";
import TodoCard from "./TodoCard";
import { ToDoContext } from "../context";
import { Droppable } from "react-beautiful-dnd";
import { useCompletedTodoContext } from "../context/CompletedTodoContext";



const TodoList = () => {
  const { todos, setTodos } = useContext(ToDoContext);
  const { completed, setCompleted } = useCompletedTodoContext();
  
  return (
    <div className="flex gap-3">
      <Droppable droppableId="TodosList">
        {(provided) => (
          <div
            className="bg-red-400 p-5 min-w-[500px]"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <p className="pb-3 text-center text-2xl font-semibold text-white">
              Active Tasks
            </p>
            {todos && todos.length>0
              ? todos.map((value:Todo,index) => {
                  return (
                    <TodoCard
                      key={value?.id}
                      index={index}
                      todos={todos}
                      todo={value}
                      setTodos={setTodos}
                    />
                  );
                })
                : <h2 className="text-white text-center text-xl font-semi-bold">No Active Tasks Yet</h2>}
                {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodoRemove">
        {(provided) => (
          <div
            className="bg-green-400 p-5 min-w-[500px]"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <p className="pb-3 text-center text-2xl font-semibold text-white">
              Completed Tasks
            </p>
            {completed && completed.length > 0
          
            
              ? completed.map((value:Todo,index) => {
                  return (
                    <TodoCard
                      key={value?.id}
                      index={index}
                      todos={completed}
                      todo={value}
                      setTodos={setCompleted}
                    />
                  )})
                  : <h2 className="text-gray-500 text-xl font-semi-bold text-center">No Completed Tasks Yet</h2>}
                  {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
