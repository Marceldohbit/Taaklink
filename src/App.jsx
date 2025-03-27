import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'

import Dashboard from './components/dashboard/Dashboard'
import JobsPage from "./JobPage";
import JobDetailsPage from "./components/Jobdetail";
import JobApplication from "./components/JobApplication";
import Signup from './components/career/SignUp'

const App = () => {
  return (
    
    <BrowserRouter>
     
        <Navbar/>   

        <Routes>



          <Route path='/'exact element={<Home/>}/>
          <Route path='hirer-dashboard'element={<Dashboard/>}/>
          <Route path="/register" exact element={<Signup/>} />
          <Route path="/job" exact element={<JobsPage/>} /> 
          <Route path="/dashboard" exact element={<Dashboard/>} />
    
          <Route path="/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/jobs/:id/apply" element={<JobApplication />} />
        
        </Routes>

          
    </BrowserRouter>
    
  )
}

export default App
