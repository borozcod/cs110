import { useState } from "react";
import {ChevronUpIcon, ChevronDownIcon} from '@primer/octicons-react'

const Likes = () => {

    const [numLikes, setNumLikes] = useState(0);

    function upvote() {
        setNumLikes(numLikes+1);
    }

    function downvote() {
        setNumLikes(numLikes-1);
    }

    return (
        <div className="Likes">
            <button className='btn btn-link text-muted' onClick={upvote}><ChevronUpIcon/></button>
            <div id="NumLikes">{numLikes}</div>
            <button className='btn btn-link text-muted' onClick={downvote}><ChevronDownIcon/></button>
        </div> 
    )
}

export default Likes;