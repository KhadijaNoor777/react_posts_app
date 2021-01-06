import React, {useState, useEffect, useRef} from 'react';
import './App.css';

function AddPost({addPost}) {

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [newPost, setNewPost] = useState(null);
    const addRef = useRef()

    useEffect(() => {
        addRef.current.focus()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!title)
            return
        
        const postData = {
            title,
            body
        }

        setNewPost(postData)

        if(newPost == null)
            return

        addPost(newPost)
        setNewPost(null);
        setTitle("");
        setBody("");
        
    }


    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter title of post..." onChange={(e) => setTitle(e.target.value)}  
                       value={title}  style={inputStyle} ref={addRef} />
            <input type="text" placeholder="Enter details about post..." onChange={(e) => setBody(e.target.value)}  
                       value={body}  style={inputStyle} />
            <button style={addBtn} type='submit'><b>Add</b></button> 
        </form>
    )
}

const addBtn = {
    marginLeft:'10px',
    height: '25px',
    width: '55px'
}

const inputStyle ={
    width: '400px',
    height:'22px'
}

export default AddPost;
