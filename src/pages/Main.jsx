import React, { useState, useRef, useEffect, useMemo} from 'react';
import { Routes,Route} from "react-router-dom";
import {useNavigate, useLocation} from "react-router-dom"
import Content from '../components/Content';
import Create from '../components/Create';
import Update from '../components/Update';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import styled from 'styled-components';

/* 
    window.localStorage
    
    localStorage 속성은 현재 도메인의 로컬 저장소에 접근할 수 있게 해준다.

    로컬 저장소는 웹브라우저에서 각 도메인에 대해 할당해주는 저장 공간으로, 
    데이터를 영구적으로 보관할 수 있게 해준다.
    (브라우저를 껐다 켜기 or 페이지 새로고침 시에도 해당 페이지에 데이터가 남도록 한다.)

    데이터는 key-value 쌍으로 저장되며, 데이터 타입은 '문자열' 형태만 허용된다.
    ! key 중복 불가 

    * 로컬 저장소로부터 데이터를 읽거나 쓸 때에는 '메소드'를 이용해 접근한다.
    1. setItem : key & value 전달받아 저장  => setItem("key", "value")
    2. getItem : 전달받은 key에 해당하는 value 반환  = > getItem("key")
    3. removeItem : 전달받은 key에 해당하는 value 삭제 => removeItem("key") 
    4. clear : 모든 데이터 삭제 => clear()   

    <JSON 데이터 & JS 객체 간의 변환 방법>
    1) JSON.stringify(object name)
    - 객체(Object, Array)를 JSON 문자열로 변환
    => localStorage.setItem("topics", JSON.stringify(topics));

    2) JSON.parse(localStorage key)
    - JSON 문자열을 js 객체로 변환
    => const localTopics = JSON.parse(localStorage.getItem("topics"));

*/
const Page = () => {

    const initTopic = () =>{
        return([ 
            {link: "/html", title: "HTML", body: "html is ...", img: "img/html.png"},
            {link: "/css", title: "CSS", body: "css is ...", img: "img/css.png"},
            {link: "/js", title: "JavaScript", body: "js is ...", img: "img/js.png"}
        ]);
    };

    const [topics, setTopics] = useState(initTopic);  // 초기값을 콜백 함수로 주면 처음 렌더링 될 때만 useState 호출
    const currentTopic = useRef(null);                // 현재 페이지에 대한 topic 저장
    const navigate = useNavigate();                   // 특정 이벤트가 발생할 때 주소를 이동시키는 기능 제공
    const location = useLocation();                   // 현재 페이지의 위치를 반환

    // 렌더링될 때마다 currentTopic.current 값 변경이 이루어짐
    useEffect(() => {
        const newTopic = topics.find(topic => 
            topic.link === location.pathname && (topic.link !== "/create" || topic.link !== "/update"));
        
            // newTopic이 undefined가 아닌 경우에만 실행
            if(newTopic){
                currentTopic.current = newTopic;
            }
    });

     /* 
        각 topic에 대한 라우팅 경로 설정

        ! 주의사항 
        () => { 와 같은 화살표 함수는 useMemo가 객체가 아닌 undefined를 반환한다.
        자바스크립트의 () => { 는 화살표 함수의 본문의 시작을 의미하므로,
        실수를 방지하기 위해 return문을 명시적으로 작성하자.
    */
    const routeList = useMemo(() => {
        return topics.map(topic => {
            const {link, title , body , img } = topic;
            return (
                <Route 
                    key = {link}
                    path = {link}
                    element = {<Content title={title} body={body} img={img}/>}
                />
            );
        });
    },[topics]);


    // topic 삭제 기능
    const onDelete = () =>{
        setTopics(topics.filter(topic=> topic.link !== currentTopic.current.link));
        navigate('/');  // 삭제 완료 후 메인 페이지로 이동
    }

    return (
        <>
            <Wrapper className='flex-between'>
                <Header />
                <Nav topics={topics}/>
            </Wrapper>

            <Routes>
                <Route path='/' element={<Content title="Welcome" body="web is ..." img="img/web.png"/>}></Route>
                {routeList}
                <Route path='/create' element={<Create topics={topics} setTopics={setTopics}/>}/>
                <Route path='/update' element={<Update currentTopic={currentTopic.current} topics={topics} setTopics={setTopics}/>}/>
            </Routes>

            <Footer currentTopic={currentTopic.current}onDelete={onDelete}/>
        </>
    );
}

export default Page;

const Wrapper = styled.div`
    background-color: ${props => props.theme.mainColor};
    color: ${props => props.theme.textColor};
    border-bottom: 1px solid black;
    padding: 10px;
`;
