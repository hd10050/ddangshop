import './App.scss';
import { useEffect } from "react";
import { firestore } from "./firebase";
import { collection, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore'
import { ListGroup, Nav, Navbar, Container, Carousel } from 'react-bootstrap';

function App() {
  useEffect(() => {

    const bucket = firestore.collection("PRODUCT");
    bucket
      .doc("F_001")
      .get()
      .then((doc) => {
        // .exists를 써서 데이터가 있는 지 없는 지 확인
        if (doc.exists) {
          // 데이터를 콘솔에 찍어보기
          console.log(doc.data());
        }
      });

  });


  return (
    <div className="App">
      {/* header */}
      <div className="fixedclear">
        {/* 내정보, 로그인/로그아웃, 장바구니 */}
        <div style={{ border: '1px solid black', float: 'right' }}>
          <ListGroup horizontal>
            <ListGroup.Item>회원가입</ListGroup.Item>
            <ListGroup.Item>로그인</ListGroup.Item>
            <ListGroup.Item>장바구니</ListGroup.Item>
          </ListGroup>
        </div>
      </div>

      {/* logo, search */}
      <div className="fixedclear" >
        <div style={{ border: '1px solid black', float: 'left' }}>
          <img alt="LOGO IMAGE" src="img/shopLogo.png" />
        </div>
      </div>

      {/* nev */}
      <div>
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

      <div className="main">
        {/* add slider */}
        <Carousel variant="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="img/shopLogo.png"
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>

        {/* item */}
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width="80%" />
              <h4>제목</h4>
              <p>가격</p>
            </div>
            <div className="col-md-4">
              <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width="80%" />
              <h4>제목</h4>
              <p>가격</p>
            </div>
            <div className="col-md-4">
              <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width="80%" />
              <h4>제목</h4>
              <p>가격</p>
            </div>
            <div className="col-md-4">
              <img src={"https://codingapple1.github.io/shop/shoes1.jpg"} width="80%" />
              <h4>제목</h4>
              <p>가격</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* footer */}
      <footer className="footer">
        <div className="footerContents">
          <h2 className="footerTitle">
            Do what you love
          </h2>
        </div>
      </footer>
    </div>
  )
}

export default App;
