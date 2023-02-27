import React from 'react';
import { Link } from 'react-router-dom';


function Card(props) {
    const data = props.data
    const croppedArticleBody = data.article_body.substring(0,80).substring(0, data.article_body.substring(0, 80).lastIndexOf(' ')) +
    '...'
    return (
        <div className="card md:w-72 lg:xl:w-10/12 bg-base-100 shadow-xl h-full">
            <figure><img src={data.img} alt="img_article" className='w-full h-56' /></figure>
            <div className="card-body">
                <div className="card-actions justify-start">
                {data.category === data.category && <Link to={`/c/${data.category.toLowerCase()}`}>
                    <div className="badge badge-outline">{data.category}</div>
                </Link>}
                
                </div>
                <h2 className="card-title">
                    <Link to={"/"}>{data.article_title}</Link>
                </h2>
                <p>{croppedArticleBody}</p>
                <div className="card-actions justify-end">
                <div className="author">
                    {data.users.name}
                    <div className="avatar placeholder ml-2">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                                <span className="text-xs">AA</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;