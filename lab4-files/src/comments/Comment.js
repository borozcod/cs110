import CommentForm from "./CommentForm";
import Comments from "./Comments";

const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  addComment,
  parentId = null,
  getReplies
}) => {
  
  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === "replying";
  
  const replyId = parentId ? parentId : comment.id; // assign id of parent
  console.log(parentId, comment.id, replyId);
  const createdAt = new Date(comment.createdAt).toLocaleDateString(); // create date to display 

  return (
    <div key={comment.id} className="comment">
      <div className="comment-right-part">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <div>{createdAt}</div>
        </div>
        <div className="comment-text">{comment.body}</div>
        <div
          className="comment-actions"
          onClick={() => setActiveComment({ id: comment.id, type: "replying" , parentId: parentId})  }
        > Reply </div>
        
        {isReplying && (
          <CommentForm
            submitLabel="Reply"
           
            handleSubmit={(username, text) => addComment(username,text, replyId)}
            
          />
        )
}

        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                addComment={addComment}
                parentId={comment.id}
                replies={() => Comment.getReplies(comment.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comment;
