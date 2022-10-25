import { Button } from 'react-bootstrap';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setUid } from '../store/userSlice';

function Login() {
    let [formEmail, setEmail] = useState("");
    let [formPsw, setPassword] = useState("");

    let dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(['user']);
    let navigate = useNavigate();
    
    return (
        <div className="container">
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                </div>
            </div>
            <Button variant="light" onClick={() => { loginUser() }}>로그인</Button>
        </div>
    )
    function loginUser() {
        const auth = getAuth();
        const email = formEmail;
        const password = formPsw;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                dispatch(setUid(userCredential.user.uid));
                setCookie('user', userCredential.user.uid);
                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);
                alert("이메일과 비밀번호를 확인해주세요.");
            });
    }
}



export default Login;
