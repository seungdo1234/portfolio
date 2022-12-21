import './App.css';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import React,{useState,useEffect} from 'react';
import Home from './pages/Home';
import MyPortfolio from './pages/MyPortfolio';
import MessageBox from './pages/MessageBox'; 
import Login from './pages/LoginForm'; 
import RegisterForm from './pages/RegisterForm';
function App() {
  // const sendRequest = async() => {
  //   const response = await axios.get('https://localhost:8080');
  //   console.log(response);
  //   console.log(response.data);s
  // };

  // useEffect(()=>{
  //   sendRequest();    
  // });
  return (
    <Routes>
     <Route path='/' element={<Home/>}/>
     <Route path='/portfolio' element={<MyPortfolio/>}/>
     <Route path='/LoginForm' element={<Login/>}/>
     <Route path='/message' element={<MessageBox/>}/>
     <Route path='/registerform' element={<RegisterForm/>}/>
    </Routes>
  );
}

export default App;
