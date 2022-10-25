import { Form, Button } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Join() {
    let [formEmail, setEmail] = useState("");
    let [formPsw, setPassword] = useState("");
    let [formName, setName] = useState("");
    let [formPhone1, setPhone1] = useState("");
    let [formPhone2, setPhone2] = useState("");
    let [formPhone3, setPhone3] = useState("");
    let [formAddress, setAddress] = useState("");
    let navigate = useNavigate();

    return (
        <div className="container">
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">이메일</label>
                <div className="col-sm-9">
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">비밀번호</label>
                <div className="col-sm-9">
                    <input type="password" className="form-control" id="inputPassword"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">이름</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" id="inputPassword"
                        onChange={(e) => {
                            setName(e.target.value);
                        }} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">전화번호</label>
                <div className="col-sm-3">
                    <input type="tel" className="form-control" id="inputPassword"
                        onChange={(e) => {
                            setPhone1(e.target.value);
                        }} />
                </div>
                <div className="col-sm-3">
                    <input type="tel" className="form-control" id="inputPassword"
                        onChange={(e) => {
                            setPhone2(e.target.value);
                        }} />
                </div>
                <div className="col-sm-3">
                    <input type="tel" className="form-control" id="inputPassword"
                        onChange={(e) => {
                            setPhone3(e.target.value);
                        }} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">주소</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" id="inputPassword"
                        onChange={(e) => {
                            setAddress(e.target.value);
                        }} />
                </div>
            </div>
            <Button variant="light" onClick={() => { joinUser() }}>회원가입</Button>
        </div>
    )

    /**
     * 이메일, 비밀번호 검증
     */
    function joinUser() {
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        const email = formEmail;
        const password = formPsw;

        if (!regex.test(email)) {
            alert("이메일을 확인해 주세요.");
            return;
        }

        if (password.length < 6) {
            alert("비밀번호는 6자리 이상 입니다.");
            return;
        }

        createUser();
    }

    /**
     * 검증 후 가입 처리
     */
    function createUser() {
        const auth = getAuth();
        const email = formEmail;
        const password = formPsw;

        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
                alert("회원가입이 완료되었습니다.");
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                alert("회원가입이 중단되었습니다. 에러코드 : " + errorCode);
                navigate("/");
            });
    }
}



export default Join;
