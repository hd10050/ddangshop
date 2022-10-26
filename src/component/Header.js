import { useEffect, useState } from 'react';
import { ListGroup, Nav, Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import { useCookies } from 'react-cookie';
import { setUid, setUserName, setUserEmail, setUser } from '.././store/userSlice';
import { getAuth, signOut } from "firebase/auth";

function Header(props) {
    let navigate = useNavigate();    

    return (
        <div className="container mt-3">
            <div className="fixedclear">
                {
                    props.isloggin ?
                        <div style={{ float: 'right' }} className="cursorPointer">
                            <ListGroup horizontal>
                                <ListGroup.Item onClick={() => { navigate("/mypage") }}>{JSON.parse(props.userObj).name}</ListGroup.Item>
                                <ListGroup.Item onClick={() => { logOut() }}>로그아웃</ListGroup.Item>
                                <ListGroup.Item onClick={() => { navigate("/cart") }}>장바구니</ListGroup.Item>
                            </ListGroup>
                        </div>
                        :
                        <div style={{ float: 'right' }} className="cursorPointer">
                            <ListGroup horizontal>
                                <ListGroup.Item onClick={() => { navigate("/join") }}>회원가입</ListGroup.Item>
                                <ListGroup.Item onClick={() => { navigate("/login") }}>로그인</ListGroup.Item>
                                <ListGroup.Item onClick={() => { navigate("/login") }}>장바구니</ListGroup.Item>
                            </ListGroup>
                        </div>
                }

            </div>

            {/* logo, search */}
            <div className="fixedclear" >
                <div style={{ float: 'left' }}>
                    <img className="cursorPointer" alt="LOGO IMAGE" src="img/shopLogo.png" onClick={() => { navigate("/") }} />
                </div>
            </div>

            {/* nev */}
            <Navbar bg="light" variant="light" className="mb-5">
                <Container >
                    <Nav className="me-auto" >
                        <Nav.Link href="#home">전체보기</Nav.Link>
                        <Nav.Link href="#features">생활</Nav.Link>
                        <Nav.Link href="#pricing">패션</Nav.Link>
                        <Nav.Link href="#pricing">문구</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
    function logOut() {
        const auth = getAuth();
        signOut(auth).then(() => {
            // 로그아웃시 state의 유저 정보, 쿠키의 uid 초기화
            // dispatch(setUid(null));
            // dispatch(setUserEmail(null));
            // dispatch(setUserName(null));
            // setIsloggion(false);
            //removeCookie("user", navigate("/"));

            props.setIsloggion(false);
            localStorage.clear();
            navigate("/")
        }).catch((error) => {
            alert("로그아웃에 실패했습니다. " + error);
            console.log(error);
        });
    }
}

export default Header;