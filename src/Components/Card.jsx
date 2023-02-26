import React from 'react';

function Card(props) {
    const data = props.data
    const croppedArticleBody = data.article_body.substring(0,120).substring(0, data.article_body.substring(0, 120).lastIndexOf(' ')) +
    '...'
    return (
        <div className="sm:md:w-full  l:w-72 rounded-lg shadow-md lg:max-w-sm inline-block my-5 mr-10">
            <img
                className="object-cover w-full h-48"
                src="https://source.unsplash.com/random"
                alt="image"
            />
            <div className="p-3">
                <div className='mb-3 mt-2'>
                    <span className='rounded-full bg-sky-300 p-2 text-sky-50'>{data.category}</span>
                </div>
                <h4 className="text-xl font-semibold tracking-tight text-blue-600">
                    {data.article_title}
                </h4>
                <p className="mb-2 leading-relaxed text-base">
                   {croppedArticleBody}
                </p>
                <button className="px-4 py-2 mb-5 text-sm text-blue-100 bg-blue-500 rounded shadow">
                    Read more
                </button>
                
                <p className='text-sm'>By {data.users.name} </p>
            </div>
        </div>
    );
}

export default Card;