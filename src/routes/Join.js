import { Form, Button } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Join() {
    let [formEmail, setEmail] = useState("");
    let [formPsw, setPassword] = useState("");
    let navigate = useNavigate();

    return (
        <div className="container">
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Email address</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword"
                        onChange={(e) => {
                            setPassword(e.target.value);
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

        if (!regex.test(email))
        {
            alert("이메일을 확인해 주세요.");
            return;
        }

        if (formPsw.length < 6)
        {
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
