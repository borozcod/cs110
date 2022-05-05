import { useState } from "react";

const CommentForm = ({
  handleSubmit,
  submitLabel,
  heading
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
    <div className="card container-md mt-4">
      {heading && <h2 className="text-start mt-3"><strong>{heading}</strong></h2>}
      <form className="py-3" onSubmit={onSubmit}>
          <div className="mb-3">
              <input value={username} type="text" onChange={(e)=> {setUsername(e.target.value)}} placeholder="Name" className="form-control" id="exampleInputPassword1"/>
          </div>
          <div className="mb-3">
              <textarea value={text} onChange={(e)=> {setText(e.target.value)}} placeholder="Write a new post..." className="form-control" />
          </div>
          <div className="mb-3 text-end">
              <button type="submit" className={`btn ${isTextareaDisabled ? "btn-secondary" : "btn-primary" } `} disabled={isTextareaDisabled}>{submitLabel}</button>
          </div>
      </form>
    </div>
  );
};

export default CommentForm;
