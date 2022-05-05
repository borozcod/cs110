import { useState } from "react";

const CommentForm = ({
  handleSubmit,
  submitLabel
}) => {
  const [text, setText] = useState("");
  const [username, setUsername] = useState("");
  const isTextareaDisabled = text.length === 0;
  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(username,text);
    setText("");
    setUsername("");
  };

  return (
      <form className="py-3" onSubmit={onSubmit}>
          <h1 className="text-start"><strong>New Post</strong></h1>
          <div className="mb-3">
              <input type="text" onChange={(e)=> {setUsername(e.target.value)}} placeholder="Name" className="form-control" id="exampleInputPassword1"/>
          </div>
          <div className="mb-3">
              <textarea onChange={(e)=> {setText(e.target.value)}} placeholder="Write a new post..." className="form-control" />
          </div>
          <div className="mb-3 text-end">
              <button type="submit" className="btn btn-primary" disabled={isTextareaDisabled}>{submitLabel}</button>
          </div>

      
    </form>
  );
};

export default CommentForm;
