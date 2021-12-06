
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const TodoProblem = ({title, getTitle}) => {
  useEffect(() => {
    console.log(title);
  })
  return ( 
    <div>
      
       <input type= "checkbox"/>
       <span><Link to="/problem"></Link></span>
       <button type= "submit"><Link to="/problem">완료</Link></button>
    </div>
  );
};

export default TodoProblem;