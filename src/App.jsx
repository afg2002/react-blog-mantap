import { useState } from 'react'
import Navbar  from "./Components/Navbar"
import "./App.css"
import Main from "./Pages/Main"
import { Routes , Route, Outlet} from 'react-router-dom'
import CategoryPost from './Pages/CategoryPost'
import ErrorPages from './Pages/ErrorPages'
import Profile from './Pages/Profile'
import { CookiesProvider } from 'react-cookie';
import { ThemeProvider } from './lib/ThemeContext'
import PrivateRoutes from './lib/PrivateRoutes'
import { AuthProvider } from './lib/AuthContext'

function AppLayout (){
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}


function App() {
  return (
    <CookiesProvider>
          <div className="App">
            <AuthProvider>
              <ThemeProvider>
                <Routes>
                  <Route  element={<AppLayout/>}>
                    <Route path="/" element={<Main />}/>
                    <Route path="/c/:category" element={<CategoryPost />}/>
                    <Route path='*' element={<ErrorPages/>}/>
                  </Route>
                  <Route element = {<PrivateRoutes/>}>
                    <Route path='/profile' element={<Profile/>} />
                  </Route>
                </Routes>
                </ThemeProvider>
            </AuthProvider>
          </div>
    </CookiesProvider>
  )
}

export default App
