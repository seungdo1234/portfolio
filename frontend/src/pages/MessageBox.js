import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import '../styles/MessageBox.css'
// import MessageList from '../components/DataList';

const MessageBox = () => {
    const navigate = useNavigate();
    const [MessageData, setMessageData] = useState();
    const clickToBack = () => {
        navigate("/");
    };
    const getData = async () => {

        const res = await axios.get('/api/getList');
        setMessageData(res.data.getList);

    }

    useEffect(() => {
        getData();
    }, [])
    useEffect(() => {
        console.log(MessageData);
    }, [MessageData])

    const clickToDelete = async (Message, e) => {
        const res = await axios.post('/api/todos/:id', Message);
        console.log(res.status);
        if (res.status === 404) {
            alert("에러가 발생 했습니다. ");
        } else {
            alert("메세지 삭제 완료.");
        }
        getData();
    }
    return (

        <div id="messageBoxFont">

            <div className="board_wrap">
                <div className="board_title">
                    <strong>MessageBox</strong>
                </div>
                <div className="board_list_wrap">
                    <div className="board_list">
                        <div className="top">
                            <div className="num">제목</div>
                            <div className="title">내용</div>
                            <div className="writer">이름</div>
                            <div className="date">이메일</div>
                            <div className="count">삭제</div>
                        </div>
                        {MessageData &&
                            MessageData.map((Message) => {
                                return <div key={Message.id}>
                                    {<div id="mess" >
                                        <div className="num">{Message.subject}</div>
                                        <div className="title">{Message.message}</div>
                                        <div className="writer"> {Message.name}</div>
                                        <div className="date">{Message.email}</div>
                                        <button onClick={(e)=>{clickToDelete(Message, e)}} id="msbtn" className="count">삭제</button>
                                    </div>
                                    }
                                </div>
                            })}
                        
                    </div>
    
                    <div className="bt_wrap">
                        <a onClick={clickToBack} className="on">뒤로가기</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default MessageBox;

