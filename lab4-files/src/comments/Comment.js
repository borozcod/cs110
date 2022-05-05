import { useState } from "react";
import CommentForm from "./CommentForm";
import Likes from "./Likes";

const Comment = ({
  comment,
  depth
}) => {

  const commentDepth = depth + 1;

  const [replieList, setReplyList] = useState([]);
  const [isReplying, setIsReplying] = useState(false);

  const addReply = (username, text, id) => {
    const newReplyList = [...replieList, {
      username: username,
      body: text,
      id: id
    }];

    setReplyList(newReplyList);
    setIsReplying(false);
  }

  return (
    <div key={comment.id} className="comment container-md mt-4 pe-0">
      <div className="comment-right-part">




        <div className="comment-content">
          
        <div class="row justify-content-between me-0 pe-0">
          <div class="col-4 me-0">
              <p className="text-primary text-start mb-0 pe-0">{comment.username}</p>
              <p className="text-start">{comment.body}</p>
              {commentDepth < 3 && (
                <div className="text-start">
                  <button onClick={() => setIsReplying(!isReplying) } type="button" className="btn btn-link text-muted py-0 px-0">Reply</button>
              </div>
              )}
          </div>
          <div class="col-2 me-0 pe-0">
            <Likes />
          </div>
        </div>

          
          {isReplying && (
            <CommentForm
              submitLabel="Reply"
              handleSubmit={addReply}
            />
          )}
        </div>
        {replieList.length > 0 && (
          <div className="replies border-start">
            {replieList.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                depth={commentDepth}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
