import { Form, Button } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from ".././component/Modal"
import SearchAddress from '../component/SearchAddress';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from '../store/postSlice';
import { firestore } from ".././firebase";

function Join() {
    const [modalVisible, setModalVisible] = useState(false)
    const openModal = () => {
        setModalVisible(true)
    }
    const closeModal = () => {
        setModalVisible(false)
    }

    let [formEmail, setEmail] = useState("");
    let [formPsw, setPassword] = useState("");
    let [formName, setName] = useState("");
    let [formPhone1, setPhone1] = useState("");
    let [formPhone2, setPhone2] = useState("");
    let [formPhone3, setPhone3] = useState("");
    //let [formAddress1, setAddress1] = useState("");
    let [formAddress2, setAddress2] = useState("");
    const emailRef = useRef();
    const pswRef = useRef();
    const nameRef = useRef();
    const phone1Ref = useRef();
    const phone2Ref = useRef();
    const phone3Ref = useRef();
    const add1Ref = useRef();
    const add2Ref = useRef();


    let postState = useSelector(state => state.post);
    let dispatch = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        // post state 초기화
        dispatch(setPost(null));
    }, [])

    useEffect(() => {
        if (add1Ref.current !== undefined) {
            add1Ref.current.value = postState;
        }
    }, [postState])

    return (
        <div className="container">
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">이메일</label>
                <div className="col-sm-9">
                    <input type="email" className="form-control" placeholder="name@example.com" ref={emailRef}
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">비밀번호</label>
                <div className="col-sm-9">
                    <input type="password" className="form-control" ref={pswRef}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">이름</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" ref={nameRef}
                        onChange={(e) => {
                            setName(e.target.value);
                        }} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">전화번호</label>
                <div className="col-sm-3">
                    <input type="tel" className="form-control" ref={phone1Ref}
                        onChange={(e) => {
                            setPhone1(e.target.value);
                        }} />
                </div>
                <div className="col-sm-3">
                    <input type="tel" className="form-control" ref={phone2Ref}
                        onChange={(e) => {
                            setPhone2(e.target.value);
                        }} />
                </div>
                <div className="col-sm-3">
                    <input type="tel" className="form-control" ref={phone3Ref}
                        onChange={(e) => {
                            setPhone3(e.target.value);
                        }} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">주소</label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" disabled={true} ref={add1Ref}
                        onChange={(e) => {
                            //setAddress1(e.target.value);
                        }} />
                </div>
                <div className="col-sm-2">
                    <Button variant="light" onClick={() => { openModal() }}>검색</Button>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">상세주소</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control" ref={add2Ref}
                        onChange={(e) => {
                            setAddress2(e.target.value);
                        }} />
                </div>
            </div>

            <Modal open={modalVisible} close={closeModal} header={"주소"}>
                <SearchAddress close={closeModal} />
            </Modal>

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
        const name = formName;
        const phone1 = formPhone1;
        const phone2 = formPhone2;
        const phone3 = formPhone3;
        //const add1 = formAddress1;
        const add1 = postState;
        const add2 = formAddress2;

        if (!regex.test(email)) {
            alert("이메일을 확인해 주세요.");
            emailRef.current.focus();
            return;
        }

        if (password.length < 6) {
            alert("비밀번호는 6자리 이상 입니다.");
            pswRef.current.focus();
            return;
        }

        if (name.length < 1) {
            alert("이름을 입력해주세요.");
            nameRef.current.focus();
            return;
        }

        if (phone1.length < 1) {
            alert("전화번호를 입력해주세요.");
            phone1Ref.current.focus();
            return;
        }
        if (phone2.length < 1) {
            alert("전화번호를 입력해주세요.");
            phone2Ref.current.focus();
            return;
        }
        if (phone3.length < 1) {
            alert("전화번호를 입력해주세요.");
            phone3Ref.current.focus();
            return;
        }
        if (isNaN(phone1)) {
            alert("전화번호는 숫자만 입력할 수 있습니다.");
            phone1Ref.current.focus();
            phone1Ref.current.value = "";
            return;
        }
        if (isNaN(phone2)) {
            alert("전화번호는 숫자만 입력할 수 있습니다.");
            phone2Ref.current.focus();
            phone2Ref.current.value = "";
            return;
        }
        if (isNaN(phone3)) {
            alert("전화번호는 숫자만 입력할 수 있습니다.");
            phone3Ref.current.focus();
            phone3Ref.current.value = "";
            return;
        }

        if (String(add1).length < 1 || add2.length < 1) {
            alert("주소를 입력해주세요.");
            add2Ref.current.focus();
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
        const name = formName;
        const phone1 = formPhone1;
        const phone2 = formPhone2;
        const phone3 = formPhone3;
        //const add1 = formAddress1;
        const add1 = postState;
        const add2 = formAddress2;


        createUserWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {
                try {
                    firestore.collection("USER").doc(userCredential.user.uid).set({
                        uid: userCredential.user.uid,
                        email: email,
                        name: name,
                        phone1: phone1,
                        phone2: phone2,
                        phone3: phone3,
                        add1: add1,
                        add2: add2,
                        access: '0',
                    });
                } catch (e) {
                    alert("회원가입이 중단되었습니다. 에러코드 : " + e);
                    console.log(e);
                    return;
                }

                alert("회원가입이 완료되었습니다.");

                // post state 초기화
                dispatch(setPost(null));

                navigate("/");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode == "auth/email-already-in-use") {
                    alert("중복된 이메일 입니다.");
                    return;
                }
                else {
                    alert("회원가입이 중단되었습니다. 에러코드 : " + errorCode);
                }
                console.log(errorCode);
                console.log(errorMessage);
            });
    }
}

export default Join;
