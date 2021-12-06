import logo from './logo.svg';
import './App.css';
import Problem from './components/Problem';
import Todos from './components/Todos';
import TodoProblem from './components/TodoProblem';
import { Link, Route, Routes } from 'react-router-dom';
import styled, {createGlobalStyle} from 'styled-components';
import { Fragment } from 'react';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import WritePage from './pages/WritePage';
import PostListPage from './pages/PostListPage';
import PostPage from './pages/PostPage';

function App() {
  return (
    <div>
      <Fragment>
          <GlobalStyle/>
      {/* <Problem title={'검증수'}/> */}
       <h1><Link to="/Todos">문제풀러가기</Link></h1>
      <Routes>
        <Route exact path ='/Todos' element = {<Todos/>} />
        <Route exact path ='/TodoProblem' element ={<TodoProblem/>} />
        <Route exact path ='/problem' element ={<Problem />} />
        <Route exact path ='/login' element ={<LoginPage/>} />
        <Route exact path ='/register' element ={<RegisterPage/>} />
        <Route exact path ='/write' element={<WritePage/>} />
        <Route exact path ='/@:username' element={<PostListPage/>}/>
        <Route exact path ='/' element={<PostListPage/>}/>
        <Route exact path ='/@:username/:postId' element={<PostPage/>} />
      </Routes>
      
      {/* <Todos/> */}
      </Fragment>
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
  body{
    background-color: #c5cfda;
  }
`
export default App;
