import { useContext, useEffect, useState } from 'react'
import {Navigate, Outlet, Route} from 'react-router-dom'
import AuthContext from './AuthContext'

const PrivateRoutes = ()=>{
    const {auth,setAuth} = useContext(AuthContext)
    useEffect(()=>{
        const ls  = localStorage.getItem('sb-tommwganypatxlngvfok-auth-token')
        if(ls != null){
          setAuth(true)
          // console.log(auth)
        }    
      },[auth])
    return (
        <div>
            {auth == true ? <Outlet/> : <Navigate to='/'/> } 
        </div>
    )
}

export default PrivateRoutes