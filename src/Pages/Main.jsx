import { useEffect,useState,React} from 'react';
import Card from "../Components/Card"
import {getAllPosts} from "../lib/supabaseQuery"


const Main = () => {
    const [posts,setPosts] = useState([])

    useEffect(()=>{
        getAllPosts()
        
        .then((data) =>{
            setPosts(data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
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

export default Main;