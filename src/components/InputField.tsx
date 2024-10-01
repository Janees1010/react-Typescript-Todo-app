


interface props {
  todo:string,
  setTodo:React.Dispatch<React.SetStateAction<string>>,
  handleSubmit:(e:React.FormEvent)=>void
}

const InputField = ({todo,setTodo,handleSubmit}:props) => {
 console.log(todo,"todos");
 
  return (
    <form onSubmit={handleSubmit} className="relative">
         <input 
          value={todo}
          onChange={(e)=>setTodo(e.target.value)} placeholder="Enter Todos" 
          className="mb-4 focus:outline-none py-3 shadow-lg px-10 min-w-[450px] text mt-2 border rounded-xl" type="text" />
        
         <button className="transform transition-transform duration-150 active:scale-[0.8] absolute top-[18%] shadow-lg text-white right-[10px] px-3 py-2 bg-blue-600 hover:bg-blue-400   rounded-[40px]" type="submit">Go</button>        
    </form>

  )
}

export default InputField

