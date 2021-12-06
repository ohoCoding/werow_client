import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import Problem from "./Problem";
import TodoProblem from "./TodoProblem";


const Todos = ({title, getTitle}) =>{


  useEffect(() => {
    console.log(title);
  })

  return (
    <div> 
        <h1>문제목록</h1>
       <hr/>
      <TodoProblem title ={title} getTitle={getTitle}/>
    </div>
  )
}
export default Todos;
