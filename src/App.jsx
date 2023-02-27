import { useState } from 'react'
import Navbar  from "./Components/Navbar"
import "./App.css"
import Main from "./Pages/Main"
import { Routes , Route} from 'react-router-dom'
import CategoryPost from './Pages/CategoryPost'
import ErrorPages from './Pages/ErrorPages'



function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/c/:category" element={<CategoryPost />}/>
          <Route path='*' element={<ErrorPages/>}/>
        </Routes>
    </div>
  )
}

export default App
