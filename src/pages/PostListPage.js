import React from "react";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import HeaderContainer from "../containers/common/HeaderContainer";

const PostListPage = () => {
  return (
    <div>
      <HeaderContainer/>
       <div>안녕하세요</div>
      <Link to="login"><Button>GO</Button></Link>
    </div>
  )
};

export default PostListPage;

