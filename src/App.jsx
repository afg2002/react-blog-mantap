import { useState } from 'react'
import Navbar  from "./Components/Navbar"
import "./App.css"
import Main from "./Pages/Main"
import { Routes , Route} from 'react-router-dom'
import CategoryPost from './Pages/CategoryPost'
import ErrorPages from './Pages/ErrorPages'
import Profile from './Pages/Profile'
import { CookiesProvider } from 'react-cookie';



function App() {
  return (
    <CookiesProvider>
      <div className="App">
      <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/c/:category" element={<CategoryPost />}/>
          <Route path='*' element={<ErrorPages/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
    </div>
    </CookiesProvider>
  )
}

export default App
