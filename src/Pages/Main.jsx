import { useEffect,useState,React, useContext} from 'react';
import Card from "../Components/Card"
import AuthContext from '../lib/AuthContext';
import {getAllPosts} from "../lib/supabaseQuery"


const Main = () => {
    const [posts,setPosts] = useState([])
    // const [isLoading, setIsLoading] = useState(true)
    const {auth} = useContext(AuthContext)

    useEffect(()=>{
        getAllPosts()
        .then((data) =>{
            setPosts(data)
            console.log(data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    return (
        <div className='container mx-auto md:px-12 my-12'>
            {posts.length >0 ? <div className="flex flex-wrap -mx-1 lg:mx-4 md">
                {posts.map((post) => (
                            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3" key={post.id_post} >
                                <Card data={post}/>
                            </div>
                ))}
            </div> : 'Tidak ada data'}
        </div>
    );
};

export default Main;