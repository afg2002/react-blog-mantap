import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPages = () => {
    
    return (
        <div className='container mx-auto text-center'>
            <h1 className='font-bold text-2xl'>Oops!</h1>
            <img src="https://media.tenor.com/G0i7IcDrz4EAAAAd/tijger.gif" className='w-48 mx-auto m-5' />

            <h3 className='text-xl'>Bisa-bisanya kesini.</h3>
        </div>
    );
};

export default ErrorPages;