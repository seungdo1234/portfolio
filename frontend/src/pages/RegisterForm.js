
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import '../styles/Login.css'
const RegisterForm = () => {
  const [inputName, setName] = useState('');
  const [inputID, setID] = useState('');
  const [inputPW, setPW] = useState('');
  const [inputCheckPW, setCheckPW] = useState('');
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();

  const onChangeID = (e) => {
    setID(e.target.value);
  }
  const onChangePW = (e) => {
    setPW(e.target.value);
  }
  const onChangeCheckPW = (e) => {
    setCheckPW(e.target.value);
  }
  const onChangeName = (e) => {
    setName(e.target.value);
  }
  const checkInputValue = () => {
    if (inputName === "" || inputID === "" || inputPW === "" || inputCheckPW === "") {
      setDisable(true);
    }
    else {
      setDisable(false);
    }
  }
  const clickToLoginForm = () => {
    navigate("/LoginForm");
  }
  const resetData = () => {
    setName ('');
    setID ('');
    setPW ('');
    setCheckPW ('');
  }
  const clickToRegister = async () => {
    if (inputPW === inputCheckPW) {
      const data = {
        name: inputName,
        email: inputID,
        password: inputPW
        // date : todayTime()
      };
      const res = await axios.post('/api/register', data);
      console.log(res.status);
      if (res.status === 200) {
        alert("회원가입 성공");
        clickToLoginForm();
      } else {
        alert("에러가 발생하였습니다.");
      }
    }
    else {
      alert("비밀번호를 확인하시오.. ");
      resetData();
    }
  }
  useEffect(() => {
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }, [])
  useEffect(() => {
    checkInputValue();
  }, [inputName, inputID, inputPW, inputCheckPW])
  return (
    <div id="loginBody">
      <div className="container">
        <div className="form" id="createAccount">
          <h1 className="logintitle">Create Account</h1>
          <div className="input_group">
            <input type="text" id="signupUsername" className="input" autoFocus placeholder="Username" onChange={onChangeName} value={inputName} />
          </div>
          <div id="msg" className="message message_error" />
          <div className="input_group">
            <input type="text" className="input" autoFocus placeholder="Email Address" onChange={onChangeID} value={inputID} />
          </div>
          <div className="input_group">
            <input type="password" className="input" autoFocus placeholder="Password" onChange={onChangePW} value={inputPW} />
          </div>
          <div className="input_group">
            <input type="password" className="input" autoFocus placeholder="Confirm password" onChange={onChangeCheckPW} value={inputCheckPW} />
          </div>
          <button disabled={disable} onClick={clickToRegister} className="btn" type="submit">Continue</button>
          <p className="text">
            <a onClick={clickToLoginForm} className="link" id="linkLogin">Already have an account? Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default RegisterForm;