import { useEffect,useState,React} from 'react';
import Card from "../Components/Card"
import { useParams,useLocation } from 'react-router-dom';
import {getPostsByCategory} from "../lib/supabaseQuery"

const CategoryPost = () => {
    const [posts,setPosts] = useState([])
    const categoryPost = useParams()
    const location = useLocation();
    
    useEffect(()=>{
        getPostsByCategory(categoryPost)
        
        .then((data) =>{
            setPosts(data)
        }).catch((error)=>{
            console.log(error)
        })
    },[location])
    return (
        <div>
            <div className="content-wrapper">
                {posts.map((post) => (
                    // <div key={post.id_post}>{post.article_title}</div>
                    <Card key={post.id_post} data={post}/>
                ))}
            </div>
        </div>
    );
};

export default CategoryPost;