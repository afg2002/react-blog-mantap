import { useState } from 'react'
import Navbar  from "./Components/Navbar"
import "./App.css"
import Main from "./Pages/Main"
import { Routes , Route} from 'react-router-dom'
import CategoryPost from './Pages/CategoryPost'



function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/c/:category" element={<CategoryPost />}/>
        </Routes>
    </div>
  )
}

export default App
