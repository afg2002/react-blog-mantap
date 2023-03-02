import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { view } from '@risingstack/react-easy-state';
import { loginUser,registerUser } from '../lib/supabaseQuery';
import { ErrorMessage, BerhasilDaftar } from './Message';


const Navbar = view(() => {
    const [theme, setTheme] = useState('light');
    const toggleTheme = () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    };
    
    useEffect(() => {
      document.querySelector('html').setAttribute('data-theme', theme);
    }, [theme]);
    
    // Modal
    const [isSignIn, setIsSignIn] = useState(true)

    const tempUserLoginData = {
      email : '',
      name : '',
      isLogin : false,
    }

    const [userLoginData,setUserLoginData] = useState({
      email : '',
      name : '',
      isLogin : false,
    })
    const [message, setMessage] = useState([{}])
    const [userLogin, setUserLogin] = useState({
        email: '',
        password : '',
    })

    const [userRegister, setUserRegister] = useState({
        name: '',
        password : '',
        email : '',
        role : 'anggota'
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

    const clearMessage = ()=>{
        setTimeout(() => {
            setMessage({})
    },2000);
    }

    const clearLoginForm = ()=>{
      setUserLogin({
        email : "",
        password : "",
      })
    }

    const handlerLogin = (data)=>{
        if(data.email === "" || data.password === ""){
            clearMessage()
            setMessage({
                       message : <ErrorMessage message ={"Data ada yang belum diisi."} />
                   })
           return 
       }
       loginUser(data)
       .then((res) =>{
            if(res.length === 0){
                setMessage({
                    message : <ErrorMessage message ={"Email atau Password salah."} />
                })
            }else{
                document.getElementById('modal-signin').checked = false;
                clearMessage()
                const newLogin = res[0]
                newLogin.isLogin = true
                setUserLoginData((prevState)=>({
                  ...prevState,
                  ...newLogin
                }),
                )
                clearLoginForm()
            }
       })
    }

    const handlerRegister = (data)=>{
        if(data.name === ""|| data.email === "" || data.password === ""){
             clearMessage()
             setMessage({
                        message : <ErrorMessage message ={"Data ada yang belum diisi."} />
                    })
            return 
        }
        registerUser(data)
        .then((res)=>{
            if(res){
                if(res.code === "23505"){
                    setMessage({
                        message : <ErrorMessage message ={"Email sudah dipakai"} />
                    })
                    clearMessage()
                }
                
            }else{
                setMessage({
                    Code : "200",
                    message : <BerhasilDaftar message={"Berhasil daftar"}/>
                })
                setUserRegister({})
                clearMessage()
                setIsSignIn(true)
            }
        })
    }

    const handleLogout = ()=>{
      setUserLoginData((prevState)=>({
        ...prevState,
        ...tempUserLoginData
      }))
    }

    


    return (
    <div className="navbar bg-base-100 p-5">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>
          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/">All</Link></li>
            <li><Link to="/c/art">Art</Link></li>
            <li><Link to="/c/technology">Technology</Link></li>
            <li><Link to="/c/science">Science</Link></li>
            <li><Link to="/c/movies">Movies</Link></li>
            <li><Link to="/c/food">Food</Link></li>
          </ul>
        </div>
        <Link to={"/"} className="btn btn-ghost normal-case text-xl">Blog Mantap</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">All</Link></li>
          <li><Link to="/c/art">Art</Link></li>
          <li><Link to="/c/technology">Technology</Link></li>
          <li><Link to="/c/science">Science</Link></li>
          <li><Link to="/c/movies">Movies</Link></li>
          <li><Link to="/c/food">Food</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className='btn-swap mr-5 mt-2'>
          <label className="swap swap-rotate">
          <input type="checkbox" onClick={toggleTheme}/> 
          <svg className="swap-on fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
          
          <svg className="swap-off fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
            
          </label>
        </div>
        <div className="mx-3">
            {userLoginData.name}
        </div>
        <div className='flex flex-row gap-2'>
          
          {userLoginData.isLogin ? 
          <button className="btn btn-outline btn-primary" onClick={()=>handleLogout()}>Logout</button>:
          <label htmlFor="modal-signin" className="btn btn-outline btn-accent">Sign in</label>
          }
        </div>


        {isSignIn ? <div>
                <input type="checkbox" id="modal-signin" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                {/* Alert Message */}
                {message.message}
                <h3 className="font-bold text-lg">Sign in</h3>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Email</span>
                    </label>
                    <input type="email" name='email' value={userLogin.email} onChange={onHandleChange}  placeholder="Type your email here" className="input input-bordered w-full max-w-md" required/>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Password</span>
                    </label>
                    <input type="password" name="password"  value={userLogin.password} onChange={onHandleChange} placeholder="Type your password here" className="input input-bordered w-full max-w-md" required/>
                </div>
                <div className='my-2'>
                    <p>Not Registered?<button onClick={() => {
                        setIsSignIn(false) 
                        setMessage({})
                    }} className="btn btn-link">Create account</button></p>
                </div>
                <div className="modal-action">
                <button className='btn btn-accent' onClick={()=>handlerLogin(userLogin)}>Sign in</button>
                <label htmlFor="modal-signin" className="btn">Close</label>
                </div>
            </div>
            </div>
            </div>: <div>
                <input type="checkbox" id="modal-signin" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
                {/* Alert Message */}
                {message.message}
                
                <h3 className="font-bold text-lg">Sign up</h3>
                
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Name</span>
                    </label>
                    <input type="text" name='name' value={userRegister.name} onChange={onHandleChange2} placeholder="Type Your name" className="input input-bordered w-full max-w-md" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Email</span>
                    </label>
                    <input type="email" name='email' value={userRegister.email} onChange={onHandleChange2}  placeholder="Type your email here" className="input input-bordered w-full max-w-md" />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Your Password</span>
                    </label>
                    <input type="password" name='password' value={userRegister.password} onChange={onHandleChange2}  placeholder="Type your password here" className="input input-bordered w-full max-w-md" />
                </div>
                <div className='my-2'>
                    <p>Registered?<button onClick={() => {
                        setIsSignIn(true)
                        setMessage({})
                    }}  className="btn btn-link">Login Here</button></p>
                </div>
                <div className="modal-action">
                <button className='btn btn-accent'  onClick={()=>handlerRegister(userRegister)}>Sign up</button>
                <label htmlFor="modal-signin" className="btn">Close</label>
                </div>
            </div>
            </div>
            </div>}
      </div>
    </div>
    );
});

export default Navbar;
