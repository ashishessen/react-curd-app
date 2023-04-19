import config from '../../config.json';
import { useEffect, useState } from "react";
import "./Post.css";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const Posts = () =>{

    const navigate = useNavigate();
    
    const {id} = useParams();

    const [post,SetPost] = useState({
        title:"",
        content:"",
    });
    useEffect(()=>{
        if(id == 'new') return;
        const fetchPost = async() =>{
            const {data} = await  axios.get(`${config.apiUrl}/${id}`);
            SetPost(data);
        };
        fetchPost();

    },[]);

    const handleChange = (e)=>{
        const postClone = {...post};
        postClone[e.target.name] = e.target.value;
        SetPost(postClone);
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

       try{
        if(id ==='new'){
            axios.post(config.apiUrl,post);
            return navigate('/');
        }
        else{
            axios.put(config.apiUrl + '/' +id, post);
            return navigate('/');
        
        }
       }catch(error){
        console.log(error);

    }
    }

    return(
        <div className="post_wrapper">
            <div className="container">
                <form className='post'>
                    <input onChange={handleChange} name='title' type='text' placeholder='Title...' value={post.title}/>
                    <input onChange={handleChange} name = 'content' type='text'placeholder='Content...'  value={post.content}/>
                    <button onClick={handleSubmit} className='btn btn-primary'>{id === 'new'? "Post": "Update"}
                    </button>

                </form>
            </div>
            </div>
    );
};
export default Posts;