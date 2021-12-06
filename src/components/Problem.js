import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Todos from './Todos';

const Problem = () => {
  const [problem, setProblem] = useState('');
  const [title, setTitle] = useState('');
  
  useEffect(() => {
    console.log("제목:",title);
    console.log("내용:",problem);
  })
  const oncontentsChange = (e) => {
    setProblem(e.target.value);
  }
  const ontitleChange = (e) => {
    setTitle(e.target.value);
    <Todos title = {title}/>
  }

  const onSubmit = e => {
   
    setTitle(title);
    setProblem(problem);
    console.log("등록버튼");
    <Todos title ={title}/>
    e.preventDefault();
  };

  return (
    <Container>
        
      <LeftSide>
      <h2>제목: 
      <input
       value = {title}
       onChange = {ontitleChange}
      />  
      </h2>
      </LeftSide> 
      
      <RightSide>
       <Link to="/">
       <button type= "submit">홈</button>
       </Link>

      </RightSide>
      
      
      <p>{title}</p>
     <div>
       <hr/>
     <div>
       <p>
          컴퓨터를 제조하는 회사인 KOI 전자에서는 제조하는 컴퓨터마다 6자리의 고유번호를 매긴다.<br/>
          고유번호의 처음 5자리에는 00000부터 99999까지의 수 중 하나가 주어지며 6번째 자리에는 검증수가 들어간다.<br/>
          검증수는 고유번호의 처음 5자리에 들어가는 5개의 숫자를 각각 제곱한 수의 합을 10으로 나눈 나머지이다.<br/>
          예를 들어 고유번호의 처음 5자리의 숫자들이 04256이면, 각 숫자를 제곱한 수들의 합 0+16+4+25+36 = 81 을 10으로 나눈 나머지인 1이 검증수이다.
       </p>
     </div>
     </div>
     
     <div>
       <Solution>
       <input 
        value = {problem}
        onChange = {oncontentsChange}
      />
       </Solution>
    
     </div>
     <div>
      <p>
        {problem}
      </p>
     </div> 
     
     
     <div>
       <form onSubmit={onSubmit}>
        <button type= "submit">등록</button>
       </form>
     </div>
    </Container>

  );
};

const Container = styled.div`
  padding: 0 0.625rem;
  /* display: flex; */
  /* justify-content: space-between; */
  align-items: center;
  box-shadow: 0 0.0625rem 0.625rem rgba(0, 0, 0, 0.1);
  z-index: 1000;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const Solution = styled.div`
  & input {
    width: 1000px;
    height: 100px
  }
`;

const LeftSide = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const RightSide = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
export default Problem;