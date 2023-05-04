import React, { useState } from 'react'
import {MdDelete,MdDone,MdEdit} from  "react-icons/md"

interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}


 
function Tasker() {
    const [todo, setTodo] =useState<string>("");
    const [todos, setTodos] =useState<Todo[]>([]);
    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo)
   const handleAdd= (e:React.FormEvent)=>{
    e.preventDefault();
    if(todo){
      setTodos([...todos,{id: Date.now(),todo ,isDone:false}]);
      setTodo("")
    }
  }
  const handleDelete= (id:number)=>{
    setTodos(todos.filter((todos)=>todos.id !==id))

  }
  const handleDone = (id: number) => {
    setTodos(todos.map((todo) => todo.id === id ? {
      ...todo,
      isDone: !todo.isDone // toggle the isDone property
    } : todo))
  }
const handleEdit = (e:React.FormEvent,id: number) => {
  e.preventDefault()
  setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));
  setEdit(false);
}
  
  return (
    <div>

  <form className="input" onSubmit={(e)=>{handleAdd(e)}}>
    <input type="input" className="box" placeholder="Enter a task" value={todo} onChange={(e)=>setTodo(e.target.value)} />
    <button className="btn submit" > Submit</button>
    
  </form>
  <div>


    {todos?.map((t)=>(
    <span key={t.id} className="">
     <div className="todolist">
     { 
     
       edit?(
        <form onSubmit={(e) => handleEdit(e, t.id)}>
        <input value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
        </form>
       ):(
         
          t.isDone?(<s>{t.todo}</s>):
          (<span> {t.todo} </span>)
         
       )
     }
     
     
      <span className='icons' onClick={() => {if(!edit&&!t.isDone){
        setEdit(!edit);
      }}}>
      <MdEdit/>
        </span>
      <span className='icons' onClick={()=>{handleDelete(t.id)}}>

      <MdDelete/>
      </span>
    
      <span className='icons'onClick={()=>{handleDone(t.id)}}>
      <MdDone/>
      </span>

      </div> 
    </span>
    ))}
    </div>
    </div>

  )
}

export default Tasker
 