import config from '../../config.json';
import axios from "axios";
import { useEffect, useState } from "react";
import "../Posts/Posts.css";
import{useNavigate} from "react-router-dom";

const Posts = () =>{
    const navigate = useNavigate();
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        const fetchPosts = async() =>{
            const { data } = await axios.get(config.apiUrl);
            setPosts(data);
        };
        fetchPosts();
     },[]);
     const handleDelete = async (post) =>{
       try {
        setPosts(posts.filter(p=>p._id !== post._id));
        
        await axios.delete(`${config.apiUrl}/${post._id}`);

       } catch (error) {   
            console.log(error);
       }
     }

     console.log(posts);
    return(

        <div className="posts">
            <div className="container">
                <button onClick={()=>navigate('/post/new')} className="btn btn-primary mb-4">New Post</button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Content</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post)=>(
                            <tr key ={post._id} >
                                <td>{post.title}</td>
                                <td>{post.content}</td>
                                <td><button onClick={() => navigate(`/post/${post._id}`)} className = "btn btn-primary">Update</button></td>
                                <td> 
                                    <button onClick={()=>handleDelete(post)}
                                     className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>

                        )
                        )}
                    </tbody>
                </table>
            </div>
            </div>
    );
};
export default Posts;