import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { MdDone } from "react-icons/md";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { Draggable } from "react-beautiful-dnd";

interface props {
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
  index: number;
}

const TodoCard: React.FC<props> = ({ todo, setTodos, todos, index }) => {
  console.log(todo,"testing");
  
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setIsEdit((prev) => !prev);
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [isEdit]);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          onSubmit={(e) => handleEdit(e, todo.id)}
          className="flex gap-3 justify-between  items-center rounded-md text-xl font-semibold text-white shadow-md min-w-[310px] px-5 py-5 mt-2 bg-blue-600"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {isEdit ? (
            <input
              ref={inputRef}
              className="focus:outline-none bg-blue-600 rounded-md p-1 "
              onChange={(e) => setEditTodo(e.target.value)}
              value={editTodo}
            />
          ) : (
            <h2 className={todo.isDone ? "line-through" : ""}>{todo.todo}</h2>
          )}
          <div className="flex gap-3">
            <span
              onClick={() => (!todo.isDone ? setIsEdit((prev) => !prev) : "")}
            >
              {" "}
              <FaRegEdit />{" "}
            </span>
            <span onClick={() => handleDone(todo.id)}>
              {" "}
              <MdDone />
            </span>
            <span onClick={() => handleDelete(todo.id)}>
              <FaDeleteLeft />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoCard;
