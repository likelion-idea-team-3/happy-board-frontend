import React, { useEffect, useState } from "react";
import PostContent from "./PostContent";
import PostComment from "./PostComment";
import "./DetailPost.css";

function DetailPost() {
  return (
    <div className="post-page">
      <PostContent />
      <PostComment />
    </div>
  );
}

export default DetailPost;
