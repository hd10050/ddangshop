import { ListGroup, Nav, Navbar, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Header() {

    let navigate = useNavigate();

    return (
        <div className="container">
            <div className="fixedclear">
                {/* 내정보, 로그인/로그아웃, 장바구니 */}
                <div style={{ float: 'right' }} className="cursorPointer">
                    <ListGroup horizontal>
                        <ListGroup.Item>회원가입</ListGroup.Item>
                        <ListGroup.Item>로그인</ListGroup.Item>
                        <ListGroup.Item onClick={()=>{ navigate("/cart") }}>장바구니</ListGroup.Item>
                    </ListGroup>
                </div>
            </div>

            {/* logo, search */}
            <div className="fixedclear" >
                <div style={{ float: 'left' }}>
                    <img className="cursorPointer" alt="LOGO IMAGE" src="img/shopLogo.png" onClick={()=>{ navigate("/") }}/>
                </div>
            </div>

            {/* nev */}
            <Navbar bg="light" variant="light">
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
}

export default Header;