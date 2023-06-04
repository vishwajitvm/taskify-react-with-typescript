import React, { useEffect, useRef, useState } from 'react'
import './styles.css' ;
import { Todo } from '../model'
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";

type Props = {
    todo: Todo ;
    todos:Todo[] ;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>> ;
}

const SingleTodo = ({ todo , todos , setTodos }: Props) => {
    const [edit, setEdit] = useState<boolean>(false) ;
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    const inputRef = useRef<HTMLInputElement>(null) ;

    //HANDEL MARK AS DONE 
    const handeleDone = (id: number) => {
        setTodos(todos.map(
            (todo) => todo.id === id?{ ...todo,isDone: !todo.isDone }:todo)) 
    }

    //HANDLE DELETE
    const handeleDelete = (id: number) => {
        setTodos( todos.filter((todo) => todo.id !== id) )
    }

    //HANDEL EDIT ==> On Click Enter it Submit
    const handelEdit = (e:React.FormEvent , id:number) => {
        e.preventDefault() ;
        setTodos(todos.map((todo) => (
            todo.id === id? { ...todo, todo: editTodo }:todo
        ))) ;
        setEdit(false) ; //Edit input will disapper
    }

    useEffect(() => {
        inputRef.current?.focus() ;
    },[edit])


  return (
    <form className='todos__single' onSubmit={ (e) => handelEdit(e, todo.id) } >
          {
              edit ? (
                  <input type="text" className='todos__single--text' value={editTodo} onChange={ (e) => setEditTodo(e.target.value) } ref={inputRef} />
              ) : (
                      todo.isDone ? (
                          <s className='todos__single--text'> {todo.todo} </s>
                      ) : (
                          <span className='todos__single--text'> {todo.todo} </span>
                      )
              )
          }
      {/* <span className='todos__single--text'> { todo.todo } </span> */}
      <div>
      <span className='icon' onClick={() => {
        if( !edit && !todo.isDone ) {
            setEdit (!edit) 
        }}}> <AiFillEdit /> </span>
      <span className='icon' onClick={() => handeleDelete(todo.id)} > <AiFillDelete /> </span>
      <span className='icon' onClick={() => handeleDone(todo.id)} > <MdDone /> </span>
      </div>
    </form>
  )
}

export default SingleTodo
