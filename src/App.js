import './App.css';
import { useEffect } from "react";
import { firestore } from "./firebase";
import { collection, getDoc, getDocs, query, where, orderBy } from 'firebase/firestore'

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

    </div>
  )
}

export default App;
