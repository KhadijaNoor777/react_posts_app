import React, {useState, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import Posts from './Posts'
import AddPost from './AddPost'


export const PostContext = React.createContext();

const categories = ['category1', 'category2', 'category3', 'category4']

function App() {
  
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('')

  useEffect(() => {
    getPosts();
  },[])

  const getPosts = async () => {
    setLoading(true);
    try{
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10`)
      console.log(response.data)
      const data = response.data
      //setPosts(response.data);
      //adding an extra attribute of category to each post
      const somePosts = data.map(data => { return { ...data, category: categories[Math.floor(Math.random()*4)] }})
      //setPosts([...posts, {category: categories[Math.floor(Math.random()*4)]}])
      setPosts(somePosts);

    }
    catch(err){
      setError(err)
    }
    setLoading(false);
  }

  const handleOptionChange = (e) => {
    console.log('change')
    console.log(e.target.value)
    setSelectedCategory(e.target.value)
    
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSelectedCategory('')
  }

  const deletePost = (id) => {
    //console.log(id);
    setPosts(posts.filter(post => post.id !== id));
  }

  const addPost = (post) => {
    console.log("add post")
    setPosts([...posts, {id: posts.length + 1, title:post.title, body:post.body, category:'category1' }])
  }

  return (
    <div>
      <h1>Posts</h1>
      
      <AddPost addPost={addPost} />

      <form onSubmit={handleFormSubmit}>
        <input type='radio' name='scategory' value='category1' checked={selectedCategory === 'category1'}
                onChange={handleOptionChange}/> Category 1 <br/>
        <input type='radio' name='scategory' value='category2' checked={selectedCategory === 'category2'}
                onChange={handleOptionChange}/> Category 2 <br/>
        <input type='radio' name='scategory' value='category3' checked={selectedCategory === 'category3'}
                onChange={handleOptionChange}/> Category 3 <br/>
        <input type='radio' name='scategory' value='category4' checked={selectedCategory === 'category4'}
                onChange={handleOptionChange}/> Category 4 <br/>
        <button type='submit'>Clear Selection</button>
      </form>

      {console.log('categories')}

      <PostContext.Provider value={posts}>
        { loading ? ( <div style={msgStyle}><b>Loading Posts...</b></div> )
                  : (<Posts deletePost={deletePost} selectedCategory={selectedCategory} /> )}
      </PostContext.Provider>

      {error && <div style={msgStyle}><b>{error.message}</b></div>}

    </div>
  );
}

const msgStyle = {
  margin: '20px',
  fontSize: '20px'
}

export default App;
