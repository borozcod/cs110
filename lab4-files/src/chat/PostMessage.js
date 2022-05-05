import React, {useState} from 'react'

const PostMessage = ({replies = [0,1]}) => {

    const [message, setMessage] = useState();
    const [name, setName] = useState();

    const formSubmit = (e) => {
        e.preventDefault();

        console.log(message);
        console.log(name);
    }

    return(
        <>
            <form className="py-3" onSubmit={formSubmit}>
                <h1 className="text-start"><strong>New Post</strong></h1>
                <div className="mb-3">
                    <input type="text" onChange={(e)=> {setName(e.target.value)}} placeholder="Name" className="form-control" id="exampleInputPassword1"/>
                </div>
                <div className="mb-3">
                    <textarea onChange={(e)=> {setMessage(e.target.value)}} placeholder="Write a new post..." className="form-control" />
                </div>
                <div className="mb-3 text-end">
                    <button type="submit" className="btn btn-primary">Submit</button>
                </div>
            </form>
            {
                // replies.map(r => {
                //     return (
                //         // <PostMessage/>
                //     )
                // })
            }
        </>
    )
}

export default PostMessage