import React,{useState,useEffect, memo, useContext} from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import {supabase as SupabaseClient} from '../lib/supabase'
import {supabase, ThemeSupa } from '@supabase/auth-ui-shared';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../lib/supabaseQuery';
import { ErrorMessage, SuccessMessage } from '../lib/Message';
import ThemeContext from '../lib/ThemeContext'
import AuthContext from '../lib/AuthContext';
// import { getUserSession,getUserProfile, newUserProfile } from '../lib/supabaseQuery';



const Navbar = () => {

    const {auth, setAuth} = useContext(AuthContext)
    const [modalVal, setModalVal] = useState(true)
    const [successMsg, setSucesssMsg]= useState(null)
    const [errorMsg, setErrorMsg]= useState(null)
    const [session , setSession] = useState(null)
    const [login, setLogin] = useState({
      email : '',
      password : ''
    })

    const [register, setRegister] = useState({
      email : '',
      password : '',
      name : '',
      username : ''
    })

    const {theme,toggleTheme} = useContext(ThemeContext)

    const handleLoginChange = (e) =>{
      const {name, value} = e.target
      setLogin((prevState) =>({
        ...prevState,
        [name] : value
      }))
    }

    const handleRegisterChange = (e) =>{
      const {name, value} = e.target
      setRegister((prevState) =>({
        ...prevState,
        [name] : value
      }))
    }

    const clearForm = () =>{
      setLogin({'email' : '', 'password' : ''})
      setRegister({'email' : '', 'password' : '','name':'','username' : ''})
      setTimeout(() => {
        setErrorMsg(null)
      }, 2000);
    }

    const handleLogout = ()=>{
      SupabaseClient.auth.signOut()
      setSession(null)
    }
    
    const handleLogin = async ()=>{
      let {data,error} = await SupabaseClient.auth.signInWithPassword({
          'email' : login.email,
          'password' : login.password
        })
        if(data && (error != null || error != undefined)){
          setErrorMsg(error.message)
          clearForm()
        }
        if(data && error ==  null){
          setSession(data.session)
          document.getElementById('modal-signin').checked = false;
          clearForm()
          setAuth(true)
        }
    }
    

    const handlRegister = async ()=>{
        if(register.email == '' || register.password == '' || register.name == ''|| register.username ==''){
          setErrorMsg('Isi data terlebih dahulu')
          clearForm()
          return
        }

       
        let {data,error} = await SupabaseClient.auth.signUp({
          'email' : register.email,
          'password' : register.password,
          'options' : {
            data : {
              'name' : register.name,
              'username' : register.username,
            }
          }
        })
        
        if(data.user != null){
          console.log(data)
          setModalVal(false)
          clearForm()
        }

        if(data && (error != null || error != undefined)){
          setErrorMsg(error.message)
          clearForm()
        }
        if(data?.user?.identities?.length === 0){
          setErrorMsg('Data udah ada.')
          console.log(data)
          setModalVal(false)
        }
    }

    useEffect(() => {
      document.querySelector('html').setAttribute('data-theme', theme);
      
    }, [theme])

    useEffect(()=>{
      const ls  = localStorage.getItem('sb-tommwganypatxlngvfok-auth-token')
      if(ls){
        setSession(JSON.parse(ls))
        setAuth(true)
        // console.log(auth)
      }    
    },[])

    useEffect(()=>{
      console.log(auth)
    },[auth])

    

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
            {/* {session ? session.user.email : ''} */}
            {session ? <Link to ={'/profile'}>{session.user.user_metadata.name}</Link> : ''}
        </div>
        <div className='flex flex-row gap-2'>
          {!session ? <label htmlFor="modal-signin" className="btn btn-outline btn-accent">Sign in</label> : <button className='btn btn-accent' onClick={handleLogout}>Logout</button>}
        </div>
            <div>
                    <input type="checkbox" id="modal-signin" className="modal-toggle" />
                <div className="modal modal-bottom sm:modal-middle">
                  
                  <div className="modal-box">
                      {successMsg ? <SuccessMessage message={successMsg}/> : ''}
                      {errorMsg ? <ErrorMessage message={errorMsg}/> : ''}

                      {modalVal ? <><h3 className="font-bold text-lg">Sign in</h3>
                    <form onSubmit={(e)=>{e.preventDefault()}}>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Your Email</span>
                        </label>
                          <input type="text" name="email" placeholder="Your Email" value={login.email} onChange={handleLoginChange} className="input input-bordered w-full" />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Your Password</span>
                        </label>
                          <input type="password" name="password" placeholder="Your Password" value={login.password} onChange={handleLoginChange} className="input input-bordered w-full" />
                      </div>
                      <div className='my-2'>
                          <p>Not Registered?<button onClick={() => {
                              setModalVal(false)
                              clearForm()
                          }} className="btn btn-link">Create account</button></p>
                      </div>
                      <div className="modal-action">
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                        <label htmlFor="modal-signin" className="btn">Close</label>
                      </div>
                    </form></> : <><h3 className="font-bold text-lg">Sign up</h3>
                    <form onSubmit={(e)=>{e.preventDefault()}}>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Your Name</span>
                        </label>
                          <input type="text" name="name" placeholder="Your Name" value={register.name} onChange={handleRegisterChange} className="input input-bordered w-full" />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Your Username</span>
                        </label>
                          <input type="text" name="username" placeholder="Your Username" value={register.username} onChange={handleRegisterChange} className="input input-bordered w-full" />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Your Email</span>
                        </label>
                          <input type="text" name="email" placeholder="Your Email" value={register.email} onChange={handleRegisterChange} className="input input-bordered w-full" />
                      </div>
                      <div className="form-control">
                        <label className="label">
                          <span className="label-text">Your Password</span>
                        </label>
                          <input type="password" name="password" placeholder="Your Password" value={register.password} onChange={handleRegisterChange} className="input input-bordered w-full" />
                      </div>
                      <div className='my-2'>
                          <p>Registered?<button onClick={() => {
                              setModalVal(true)
                              clearForm()
                          }} className="btn btn-link">Login here</button></p>
                      </div>
                      <div className="modal-action">
                        <button className="btn btn-primary" onClick={handlRegister}>Register</button>
                        <label htmlFor="modal-signin" className="btn">Close</label>
                      </div>
                    </form></>}
                  </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default memo(Navbar);
