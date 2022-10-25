import './App.scss';
import Header from "./component/Header"
import Footer from "./component/Footer"
import Home from "./routes/Home"
import Detail from "./routes/Detail"
import Cart from "./routes/Cart"
import Join from "./routes/Join"
import Login from "./routes/Login"
import MyPage from "./routes/MyPage"
import { useEffect } from "react";
import { firestore } from "./firebase";
import { collection, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore'
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom'

function App() {

  let navigate = useNavigate();

  useEffect(() => {
    const bucket = firestore.collection("PRODUCT");
    bucket
      .doc("F_001")
      .get()
      .then((doc) => {
        // .exists를 써서 데이터가 있는 지 없는 지 확인
        if (doc.exists) {
          // 데이터를 콘솔에 찍어보기
          // console.log(doc.data());
        }
      });

  });

 
  return (
    <div className="App">
      {/* header */}
      <Header />

      {/* content */}
      <div className="mainContent">
        {/** ROUTER */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />
          <Route path="/mypage" element={<MyPage />} />
          {/* <Route path="/detail/:id" element={<Detail shoes={shoes} />} /> */}
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>

      {/* footer */}
      <Footer />
    </div>
  )

  
}

export default App;
