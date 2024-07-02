import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostContent from "./PostContent";
import PostComment from "./PostComment";
import "./DetailPost.css";

function DetailPost() {
    const { postId } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await fetch(
                    `http://43.202.192.54:8080/api/boards/happy/${postId}`
                );
                const data = await response.json();
                setPost(data);
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [postId]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-page">
            <PostContent post={post} />
            <PostComment postId={postId} />
        </div>
    );
}

export default DetailPost;
