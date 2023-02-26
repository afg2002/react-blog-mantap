import {React,Fragment} from 'react';
import { Button } from 'flowbite-react';

const ModalSign = () => {
    return (<div className='flex flex-row gap-2'>
        <Button color={'gray'}>
            Sign up
        </Button>
        <Button color={'gray'}>
            Sign in
        </Button>
    </div>
    );
};

export default ModalSign;