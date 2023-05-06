import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { ToastContainer } from 'react-toastify'

import Menu from './component/Menu'
import Home from './component/Home'
import Create from './component/Create'
import Edit from './component/Edit'
import Pnf from './component/Pnf'


function App(props) {
  return(
     <BrowserRouter>
        <Menu/>
        <ToastContainer autoClose={4000} position={"top-right"}/>
        <Routes>
            <Route path={'/'} element={<Home/>} />
            <Route path={'/edit/:id'} element={<Edit/>} />
            <Route path={'/create'} element={<Create/>} />
            <Route path={'/*'} element={<Pnf/>} />
         </Routes>
     </BrowserRouter>
  )
}

export default App


