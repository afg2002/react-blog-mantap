import { useState } from 'react';
import {React,Fragment} from 'react';


const ButtonSign = () => {
    const [isSignIn, setIsSignIn] = useState(true)

    const [userLogin, setUserLogin] = useState({
        username: '',
        password : '',
    })

    const [userRegister, setUserRegister] = useState({
        name: '',
        username: '',
        password : '',
    })

    const onHandleChange = (e) =>{
        const {name, value} = e.target
        setUserLogin(prevState =>({
            ...prevState,
            [name] : value
        }))
    }

    const onHandleChange2 = (e) =>{
        const {name, value} = e.target
        setUserRegister(prevState =>({
            ...prevState,
            [name] : value
        }))
    }
    
    return (
        <>
            {isSignIn ? <div>
                <input type="checkbox" id="modal-signin" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Sign in</h3>
                
            
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Username</span>
                    </label>
                    <input name="username" value={userLogin.username} onChange={onHandleChange} type="text" placeholder="Type your username" className="input input-bordered w-full max-w-md" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Password</span>
                    </label>
                    <input type="password" name="password"  value={userLogin.password} onChange={onHandleChange} placeholder="Type your password here" className="input input-bordered w-full max-w-md" />
                </div>
                <div className='my-2'>
                    <p>Not Registered?<button onClick={() => {setIsSignIn(false)}} className="btn btn-link">Create account</button></p>
                </div>
                <div className="modal-action">
                <button className='btn btn-accent' onClick={()=>{console.log(userLogin)}}>Sign in</button>
                <label htmlFor="modal-signin" className="btn">Close</label>
                </div>
            </div>
            </div>
            </div>: <div>
                <input type="checkbox" id="modal-signin" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Sign up</h3>
                
                
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Name</span>
                    </label>
                    <input type="text" name='name' value={userRegister.name} onChange={onHandleChange2} placeholder="Type Your name" className="input input-bordered w-full max-w-md" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Username</span>
                    </label>
                    <input type="text" name='username' value={userRegister.username}  onChange={onHandleChange2} placeholder="Type your username" className="input input-bordered w-full max-w-md" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Password</span>
                    </label>
                    <input type="text" name='password' value={userRegister.password} onChange={onHandleChange2}  placeholder="Type your password here" className="input input-bordered w-full max-w-md" />
                </div>
                <div className='my-2'>
                    <p>Registered?<button onClick={() => setIsSignIn(true)}  className="btn btn-link">Login Here</button></p>
                </div>
                <div className="modal-action">
                <button className='btn btn-accent'  onClick={()=>{console.log(userRegister)}}>Sign up</button>
                <label htmlFor="modal-signin" className="btn">Close</label>
                </div>
            </div>
            </div>
            </div>}
        </>
    );
};

export default ButtonSign;