import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Home.css'

const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {

        const elm = document.querySelectorAll('.section');
        const elmCount = elm.length;
        elm.forEach(function (item, index) {
            item.addEventListener('mousewheel', function (event) {
                event.preventDefault();
                let delta = 0;

                if (!event) event = window.event;
                if (event.wheelDelta) {
                    delta = event.wheelDelta / 120;
                    if (window.opera) delta = -delta;
                }
                else if (event.detail)
                    delta = -event.detail / 3;

                let moveTop = window.scrollY;
                let elmSelector = elm[index];

                // wheel down : move to next section
                if (delta < 0) {
                    if (elmSelector !== elmCount - 1) {
                        try {
                            moveTop = window.pageYOffset + elmSelector.nextElementSibling.getBoundingClientRect().top ;
                        } catch (e) { }
                    }
                }

                // wheel up : move to previous section
                else {
                    if (elmSelector !== 0) {
                        try {
                            moveTop = window.pageYOffset + elmSelector.previousElementSibling.getBoundingClientRect().top ;
                        } catch (e) { }
                    }
                }

                const body = document.querySelector('html');
                window.scrollTo({ top: moveTop, left: 0, behavior: 'smooth' });
            });
        });

    }, [])

    const openNav = () => {
        //sidenav 클래스를 가진 div 요소 : width:0 숨기기
        document.getElementById("mySidenav").style.width = "250px";
        //css margin-left : 250px -> js로 고칠때는 marginLeft (-나오면 무조건 지우고 대문자)
        document.getElementById("main").style.marginLeft = "250px";
        document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    }
    const closeNav = () => {
        document.getElementById("mySidenav").style.width = "0px";
        document.getElementById("main").style.marginLeft = "0px";
        document.body.style.backgroundColor = "white";
    }


    // 버튼 클릭 시 맨 위로 이동
    const homeBtn = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }


    // 버튼 클릭 시 페이지 하단으로 이동
    const profileBtn = () => {
        window.scrollTo({ top: 1100, behavior: "smooth" });
    };

    const clickToMessege = () => {
      navigate("/portfolio");
    };
    
    const clickToMessageBox = () => {
        document.body.style.backgroundColor = "rgba(0,0,0,0.0)";
        navigate("/LoginForm");
      };
  
    return (
        <>
            <div id="toast"> </div>
            <header>
                <nav>
                    <span style={{ cursor: "pointer", fontSize: 30 }} onClick={openNav}>
                        ☰
                    </span>
                </nav>
            </header>
            <div id="mySidenav" className="sidenav">
                {/* <a href="javascript:closeNav()" class="closebtn" >&times;</a> */}
                <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>
                    ×
                </a>
                <a onClick={homeBtn}>Home</a>
                <a onClick={profileBtn}>Profile</a>
                <a onClick={clickToMessageBox}>MessageBox</a>
            </div> 
            {/* #main>h2>lorem3^p>lorem20^span */}
            <div id="main">
                <div className="section">
                    <div id="flexTop">
                        <h1>Home</h1>
                        <div id="right"> Portfolio by Ji Seung Do </div>
                    </div>
                    <div id="page1">
                        <div />
                        <h1 id="flex0_index">
                            안녕하세요. <br /> 즐기면서 개발하는 개발자 "지승도" 입니다 !!
                        </h1>
                        <div> </div>
                    </div>
                </div>
                <div className="section" >
                    <h1 id="lecture_css">Profile</h1>
                    <div id="flex_index">
                        <div>
                            {" "}
                            <img
                                src="/images/image.jpg"
                                style={{ width: 300, height: 400, marginRight: 100, marginTop: 25 }}
                            />
                        </div>
                        <div>
                            <h2>지승도/ Ji Seung Do</h2>

                            <br></br>
                            <p>
                                {" "}
                                <strong> BirthDay. </strong>&nbsp; 1999.10.07
                            </p>
                            <br />
                            <p>
                                <strong> Tel.</strong> &nbsp; 010 - 4620 - 2565
                            </p>
                            <br />
                            <p>
                                <strong> Email.</strong> &nbsp; twotwo12345678@gmail.com
                            </p>
                            <br />
                            <p>
                                <strong> GitHub.</strong> &nbsp;{" "}
                                <a href="https://github.com/seungdo1234" title="깃허브로 바로가기">
                                    https://github.com/seungdo1234
                                </a>
                            </p>
                        </div>
                    </div>
                    <div id="flex2_index">
                        <div /> <div />
                        <div>
                            <h2>Graduation</h2>
                            <br />
                            ( 2015 .3 ~ 2017 .3 )<br />
                            <br />
                            전주 우석고등학교 <br />
                            <br />
                            ( 2018 .3 ~ ) <br />
                            <br />
                            군산대학교 컴퓨터정보공학과
                        </div>
                        <div>
                            <h2>Awards</h2>
                        </div>
                        <div />
                        <div>
                            <h2>Project</h2>
                            <br></br>
                            <ol>
                                <li>
                                    <a href="https://github.com/seungdo1234/Quine---McClusky" title="퀸맥클러스키 깃허브 바로가기">
                                        Quine - McClusky
                                    </a>
                                </li>
                                <br />
                                <li>
                                    <a href="https://github.com/seungdo1234/Tankress-Server" title="탱크리스 깃허브 바로가기">
                                        Tankess
                                    </a>
                                </li>
                                <br />
                                <li>
                                    <a href="https://github.com/seungdo1234/Flower_AI" title="꽃구별AI 깃허브 바로가기">
                                        separate of Flower from AI
                                    </a>
                                </li>

                                <div></div>
                                <div>
                                    <button id="messege_Btn" onClick={clickToMessege}>메세지 보내기</button>
                                </div>
                            </ol>
                        </div>
                        <div /> <div />
                    </div>

                </div>

            </div>
        </>
    )
}

export default Home;