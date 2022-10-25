import { Form, Button } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from ".././component/Modal"
import SearchAddress from '../component/SearchAddress';
import { useDispatch, useSelector } from 'react-redux';
import { setPost } from '../store/postSlice';

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
    let [formAddress1, setAddress1] = useState("");
    let [formAddress2, setAddress2] = useState("");
    let rs = useSelector(state => state.post);
    let dispach = useDispatch();
    let navigate = useNavigate();

    useEffect(() => {
        // post state 초기화
        dispach(setPost(null));
    }, [])
    

    return (
        <div className="container">
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">이메일</label>
                <div className="col-sm-9">
                    <input type="email" className="form-control" placeholder="name@example.com"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">비밀번호</label>
                <div className="col-sm-9">
                    <input type="password" className="form-control"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">이름</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control"
                        onChange={(e) => {
                            setName(e.target.value);
                        }} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">전화번호</label>
                <div className="col-sm-3">
                    <input type="tel" className="form-control"
                        onChange={(e) => {
                            setPhone1(e.target.value);
                        }} />
                </div>
                <div className="col-sm-3">
                    <input type="tel" className="form-control"
                        onChange={(e) => {
                            setPhone2(e.target.value);
                        }} />
                </div>
                <div className="col-sm-3">
                    <input type="tel" className="form-control"
                        onChange={(e) => {
                            setPhone3(e.target.value);
                        }} />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">주소</label>
                <div className="col-sm-7">
                    <input type="text" className="form-control" disabled={true} defaultValue={rs}
                        onChange={(e) => {
                            setAddress1(e.target.value);
                        }} />
                </div>
                <div className="col-sm-2">
                    <Button variant="light" onClick={() => { openModal() }}>검색</Button>
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-3 col-form-label">상세주소</label>
                <div className="col-sm-9">
                    <input type="text" className="form-control"
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

                // post state 초기화
                dispach(setPost(null));

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
