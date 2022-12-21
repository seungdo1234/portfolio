import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import '../styles/Login.css'

const LoginForm = () => {
     const navigate = useNavigate();
     const [inputID,setID] = useState('');
     const [inputPW,setPW] = useState('');
     const [disable, setDisable] = useState(true);

  const onChangeID = (e) =>{
    setID(e.target.value);
  }

  const onChangePW = (e) =>{
    setPW(e.target.value);
  }
  const checkInputValue = () => {
    if(inputID ===  "" || inputPW === "" ){
      setDisable(true);
    }
    else{
      setDisable(false);
    }
  }
  const resetData = () => {
    setID ('');
    setPW ('');
  }
  const gotoMessageBox = () => {
    document.body.style.backgroundColor = "rgba(0,0,0,0.0)";
    navigate("/message");
  }
  useEffect(() => {
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }, [])

    const clickToLogin = async () => {
        const data = {
            email : inputID,
            password : inputPW
        };
        console.log(data);
        const res = await axios.post('/api/login', data);
        console.log(res.data);
        alert(res.data.message);
        if(res.data.loginSuccess === true){
            gotoMessageBox();
        }
        resetData();
    };
    const clickToResister = async() => {
       navigate("/registerform");
    };
    useEffect(() => {
        checkInputValue();
      }, [inputID, inputPW])
    return (
        <div id="loginBody">
            <div className="container">
                <div className="form" id="login">
                    <h1 className="logintitle">Login</h1>
                    <div id="msg" className="message message_error" />
                    <div className="input_group">
                        <input type="text" id="loginUsername" className="input" autoFocus placeholder="Username or email"  onChange={onChangeID}  value={inputID}/>
                    </div>
                    <div className="input_group">
                        <input type="password" id="loginUserpwd" className="input" autoFocus placeholder="Password" onChange={onChangePW}  value={inputPW}/>
                    </div>
                    <button disabled={disable} onClick={clickToLogin} className="btn" type="submit" >Continue</button>
                    {/* <p className="text">
                        <a href="#" className="link">Forgot your password?</a>
                    </p> */}
                    <p className="text">
                        <a   onClick={clickToResister} className="link" id="linkCreateAccount">Don't have an account? Create account</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
