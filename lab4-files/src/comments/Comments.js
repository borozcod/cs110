import { useState } from "react";
import CommentForm from "./CommentForm";
import Comment from "./Comment";


const Comments = () => {
  const [replieList, setReplyList] = useState([]);

  const addComment = (username, text) => {
    const newReplyList = [...replieList, {
          username: username,
          body: text,
        }];

        setReplyList(newReplyList);
  }

  return (
    <div className="comments">
      <div className="container-md mt-4">
        <CommentForm submitLabel="Write" heading="New Post" handleSubmit={addComment} />
      </div>
      <div className="comments-container">
        {replieList.map((rootComment) => (
          <Comment
            key={rootComment.id}
            comment={rootComment}
            depth={0}
          />
        ))}
      </div>
    </div>
  );
};


export default Comments;
