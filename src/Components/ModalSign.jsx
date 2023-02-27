import {React,Fragment} from 'react';
import {button} from 'daisyui'

const ModalSign = () => {
    return (
    <div className='flex flex-row gap-2'>
        <button className="btn btn-outline btn-info">Sign up</button>
        <button className="btn btn-outline btn-accent">Sign in</button>
    </div>
    );
};

export default ModalSign;