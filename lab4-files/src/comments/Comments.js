import { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";


const Comments = ({ commentsUrl, currentUserId }) => {
  const [backendComments, setBackendComments] = useState([]);
  const [activeComment, setActiveComment] = useState(null);
  const rootComments = backendComments.filter(
    (backendComment) => backendComment.parentId === null
  );

  const getReplies = (commentId) =>
    backendComments
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

  const addComment = (username, text, parentId) => {
    createComment(username, text, parentId).then((comment) => {
      setBackendComments([comment, ...backendComments]);
      setActiveComment(null);
    });
  };
  

  useEffect(() => {
    getComments().then((data) => {
      setBackendComments(data);
    });
  }, []);

  return (
    <div className="comments">
      <div className="comment-form-title">New Post</div>
      <CommentForm submitLabel="Write" handleSubmit={addComment} />
      <div className="comments-container">
        {rootComments.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            replies={getReplies(rootComment.id)}
            activeComment={activeComment}
            setActiveComment={setActiveComment}
            addComment={addComment}
          />
        ))}
      </div>
    </div>
  );
};

// Helper function
export const getComments = async () => {
  return [
    {
      id: "1",
      body: "First comment",
      username: "Mariam",
      userId: "100", // not really needed but can be used in a later example
      parentId: null,
      createdAt: "2022-05-02T23:00:33.010+02:00",
    },
    {
      id: "2",
      body: "First nested comment",
      username: "Mariam",
      userId: "100", // not really needed but can be used in a later example
      parentId: 1,
      createdAt: "2022-05-02T23:00:33.010+02:00",
    },
    {
      id: "3",
      body: "second nested comment comment",
      username: "Mariam",
      userId: "100", // not really needed but can be used in a later example
      parentId: 2,
      createdAt: "2022-05-02T23:00:33.010+02:00",
    }
  ];
};

// Helper Function
export const createComment = async (username,text, parentId = null) => {
  let commentId = Math.random().toString(36).substr(2, 9);
  console.log("New comment:", parentId,text, commentId);
  return {
    id: commentId,
    body: text,
    parentId,
    userId: "100",
    username: username,
    createdAt: new Date().toISOString(),
  };
};

export default Comments;
