import logo from './logo.svg';
import './App.css';
import Problem from './components/Problem';
import Todos from './components/Todos';
import TodoProblem from './components/TodoProblem';
import { Link, Route, Switch } from 'react-router-dom';
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
          {/* <GlobalStyle/> */}
      {/* <Problem title={'검증수'}/> */}
       {/* <h1><Link to="/Todos">문제풀러가기</Link></h1> */}
      <Switch>
        {/* <Route exact path ='/Todos' component = {<Todos/>} />
        <Route exact path ='/TodoProblem' component ={<TodoProblem/>} />
        <Route exact path ='/problem' component ={<Problem />} /> */}
        <Route exact path ='/@:username' component={PostListPage}/>
        <Route exact path ='/login' component ={LoginPage} />
        <Route exact path ='/register' component ={RegisterPage} />
        <Route exact path ='/write' component={WritePage} />
        <Route exact path ='/' component={PostListPage}/>
        <Route exact path ='/@:username/:postId' component={PostPage} />
      </Switch>
      
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
