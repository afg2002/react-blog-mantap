import { useContext, useEffect, useState } from 'react'
import {Navigate, Outlet, Route} from 'react-router-dom'
import AuthContext from './AuthContext'

const PrivateRoutes = ()=>{
    const {auth} = useContext(AuthContext)
    useEffect(()=>{
        console.log(auth)
    },[auth])
    return (
        <div>
            {auth == true ? <Outlet/> : <Navigate to='/'/> } 
        </div>
    )
}

export default PrivateRoutes