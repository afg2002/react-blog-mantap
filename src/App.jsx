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
      <div className="container mx-auto px-32  mt-10 " >
      <button className="rounded bg-slate-300 p-3 text-black mb-5" >My Post</button>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/c/:category" element={<CategoryPost />}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
