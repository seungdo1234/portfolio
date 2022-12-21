import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

import '../styles/Messge.css'

const MyPortfolio = () => {

  const [intputName,setName] = useState('');
  const [inputEmail,setEmail] = useState('');
  const [inputSubject,setSubject] = useState('');
  const [intputMessage,setMessage] = useState('');

  const [disable, setDisable] = useState(true);

  const navigate = useNavigate();

  
  const onChangeName = (e) =>{
    setName(e.target.value);
  }

  const onChangeMessege = (e) =>{
    setMessage(e.target.value);
  }

  const onChangeEmail = (e) =>{
    setEmail(e.target.value);
  }

  const onChangeSubject = (e) =>{
    setSubject(e.target.value);
  }

  const resetData = () => {
    setName ('');
    setMessage ('');
    setEmail ('');
    setSubject ('');
  }

  const checkInputValue = () => {
    if(intputName ===  "" || inputEmail === "" || inputSubject === "" || intputMessage === ""){
      setDisable(true);
    }
    else{
      setDisable(false);
    }
  }

  const clickToHome = () => {
    navigate("/");
  };
  // const todayTime = () =>{
  //   let now = new Date();
  //   let year=   now.getFullYear();
  //   let todayMonth = now.getMonth +1();
  //   let todatDate = now.getDate();
  //   let hours = now.getHours();
  //   let minutes = now.getMinutes();
  //   return year + "-"+todayMonth +"-"+todatDate+". "+hours+" : "+minutes;
  // }

  const postData = async () =>{
    const data = {
        name: intputName,
        email : inputEmail,
        subject : inputSubject,
        message : intputMessage
        // date : todayTime()
    };
    const res = await axios.post('/api/addMessage', data);

    if(res.status === 200){
      alert("메세지가 성공적으로 보내졌습니다.");
    }else{
      alert("에러가 발생하였습니다.");
    }

    resetData();
  }

  useEffect(() => {
    checkInputValue();
  }, [intputName, inputEmail, inputSubject, intputMessage])
   
  return (
    <>
      <h1 id="lecture_css">Messege</h1>
      <div id="contactForm_form" className="form_01">
        <div>
          <h3 id="contact_h3">
            항상 열린마음으로 개발하는 개발자 "지승도" 가 되겠습니다.
            <br /> <br />
            봐주셔서 감사합니다.
            <br />
            <br /> 궁긍하신 내용 있으시면 문의해주세요 !!!
          </h3>
        </div>
        <div id="messegBox" className="tbl_frm01 tbl_wrap">
          <ul>
            <br />
            <br />
            <br />
            <li id="send_flex1">
              <label htmlFor="contact_name">
                <strong> Name</strong>
              </label>
              <input
                type="text"
                className="frm_input full_input required"
                id="contact_name"
                name="contact_name"
                title="Name"
                placeholder="Name"
                defaultValue=""
                onChange={onChangeName}
                value={intputName}
              />
            </li>
            <br />
            <li id="send_flex1">
              <label htmlFor="contact_email" className="m-sound-only">
                <strong> E-mail</strong>
              </label>
              <input
                type="email"
                className="frm_input full_input required"
                id="contact_email"
                name="contact_email"
                title="Email"
                placeholder="Email"
                defaultValue=""
                onChange={onChangeEmail}
                value={inputEmail}
              />
            </li>
            <br />
            <li id="send_flex1">
              <label htmlFor="contact_subject" className="m-sound-only">
                <strong> Subject</strong>
              </label>
              <input
                type="text"
                className="frm_input full_input required"
                id="contact_subject"
                name="contact_subject"
                title="Subject"
                placeholder="Subject"
                defaultValue=""
                onChange={onChangeSubject}
                value={inputSubject}
              />
            </li>
            <br />
            <li id="send_flex3">
              <label
                id="setcontext"
                htmlFor="contact_message"
                className="sound-only"
              >
                <strong> 내용</strong>{" "}
              </label>
              <textarea
                id="contact_message"
                className="frm_input full_input required"
                name="contact_message"
                rows={5}

                title="Message"
                placeholder="홈페이지를 이용하시다가 궁금하신 점이 있으시면 언제든지 문의해 주세요."
                value={intputMessage}
                onChange={onChangeMessege}

              />
            </li>
            <br />
          </ul>
          <div>
            <button
              id="btn_css"
              className="button button--moema button--inverted button--text-thick button--size-s"
              // disabled="disabled"
              disabled={disable}
              onClick={postData}         
                >
              Send now
            </button>
          </div>
          <div>
            <button id="clickToHome" onClick={clickToHome}>뒤로 가기
            </button>
          </div>
        </div>
      </div>
    </>

  )
}

export default MyPortfolio;