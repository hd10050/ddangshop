import './App.scss';
import Header from "./component/Header"
import Footer from "./component/Footer"
import Home from "./routes/Home"
import Detail from "./routes/Detail"
import Cart from "./routes/Cart"
import Join from "./routes/Join"
import Login from "./routes/Login"
import MyPage from "./routes/MyPage"
import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from 'react-redux';
import { collection, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore'
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom'

function App() {

  let navigate = useNavigate();

  /**
   * 로그인 여부
   */
  let [isloggin, setIsloggion] = useState(false);
  let [userObj, setUserObj] = useState(false);
  // let dispatch = useDispatch();
  // const [cookies, setCookie, removeCookie] = useCookies(['user']);
  // let rs = useSelector(state => state.user);

  /**
   * 로그인 여부 관련
   */
  useEffect(() => {
    // if (cookies.user !== undefined) {
    //     dispatch(setUid(cookies.user));
    //     // 로그인시 state에 유저 정보 저장, 쿠키에 uid 저장                
    //     setIsloggion(true);
    // }
    // else {
    //     // dispatch(setUid(null));
    //     setIsloggion(false);
    // }
    const _session_key = `firebase:authUser:${process.env.REACT_APP_FIREBASE_APIKEY}:[DEFAULT]`;
    // 로그인 정보 세션에서 확인
    setIsloggion(sessionStorage.getItem(_session_key));

    if (isloggin) {
      // console.log(JSON.parse(sessionStorage.getItem(_session_key)));
      // console.log(JSON.parse(sessionStorage.getItem("userInfo")));
      setUserObj(sessionStorage.getItem("userInfo"));
      console.log(userObj)
    }
  },);

  return (
    <div className="App">
      {/* header */}
      <Header userObj={userObj} isloggin={isloggin} setIsloggion={setIsloggion} />

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
