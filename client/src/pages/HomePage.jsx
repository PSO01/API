import React from "react";
import styled from "styled-components";
import Header from "layout/Header";
import { Link } from "react-router-dom";

const HomePage = () =>{
    return(
        <>
            <Header />
            <Wrapper>
                <Link to="/main/html"><h1>WELCOME</h1></Link>
            </Wrapper>
        </>
    );
}

export default HomePage;

const Wrapper = styled.div`
    position: absolute;     
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;    
    // Header 내 링크 클릭이 가능하도록 Header 컴포넌트보다 우선 순위를 낮춤
    // z-index는 position 속성이 있는 요소에만 적용 가능
    h1 {
        font-size: 50px;
        letter-spacing: 3px;
    }
`