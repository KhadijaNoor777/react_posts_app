import React, {useContext} from 'react'
import Post from './Post';
import {PostContext} from './App'

function Posts({deletePost, selectedCategory}) {
    const posts = useContext(PostContext);
    return (
        <div>
            {posts.map((post) => 
                <Post post={post} deletePost={deletePost}  selectedCategory={selectedCategory}/>   
            )}
        </div>
    )
}

export default Posts;
