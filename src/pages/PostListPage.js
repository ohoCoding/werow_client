import React from "react";
import Button from "../components/common/Button";
import { Link } from "react-router-dom";

const PostListPage = () => {
  return (
    <div>
      <Link to="login"><Button>버튼</Button></Link>
    </div>
  )
};

export default PostListPage;

