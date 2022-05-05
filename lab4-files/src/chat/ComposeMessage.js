import React, {useState} from 'react'

const ComposeMessage = () => {

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
        </>
    )
}

export default ComposeMessage