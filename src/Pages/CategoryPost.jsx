import { useEffect,useState,React} from 'react';
import Card from "../Components/Card"
import { useParams,useLocation } from 'react-router-dom';
import {getPostsByCategory} from "../lib/supabaseQuery"

const CategoryPost = () => {
    const [posts,setPosts] = useState([])
    const categoryPost = useParams()
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
        getPostsByCategory(categoryPost)
        
        .then((data) =>{
            setPosts(data)
            setIsLoading(false)
        }).catch((error)=>{
            console.log(error)
        })
    },[location])
    return (
        <div className='container mx-auto md:px-12 my-12'>
            {isLoading ? "Loading.." : <div className="flex flex-wrap -mx-1 lg:mx-4">
                {posts.map((post) => (
                            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" key={post.id_post} >
                                <Card data={post}/>
                            </div>
                ))}
            </div>}
        </div>
    );
};

export default CategoryPost;