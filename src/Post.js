import React, {useState} from 'react'

function Post(props) {

    const [detail, setDetail] = useState(false);

    const showDetails = (e) => {
        setDetail(!detail);
    }

    const bodyStyle = {

        display: detail ? 'inline' : 'none'
    }

    return (
        <div className='todoStyle'>  
            
            {props.selectedCategory === '' || props.selectedCategory === props.post.category ? (
                <div>    
                    <span>{props.post.title}</span>
                    <span style={{margin: '1%'}}><b>{props.post.category}</b></span><br/>
                    <button onClick={showDetails}><b>Details</b></button>
                    <button className='btnStyle' onClick={()=>props.deletePost(props.post.id)}><b>Delete</b></button>
                    <br/><p style={bodyStyle}>{props.post.body}</p>
                    <hr/>
                </div>
            ): (
                <span></span>
            )}
            
        </div>
    )
}

export default Post;
