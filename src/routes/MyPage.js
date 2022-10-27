import { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../store/userSlice';
import Modal from ".././component/Modal"
import SearchAddress from '../component/SearchAddress';
import { setPost } from '../store/postSlice';
import { firestore } from ".././firebase";

function MyPage() {
    const [modalVisible, setModalVisible] = useState(false)
    const openModal = () => {
        setModalVisible(true)
    }
    const closeModal = () => {
        setModalVisible(false)
    }

    let rs = useSelector(state => state.user);
    let postState = useSelector(state => state.post);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const nameRef = useRef();
    const phone1Ref = useRef();
    const phone2Ref = useRef();
    const phone3Ref = useRef();
    const add1Ref = useRef();
    const add2Ref = useRef();

    // 로그인 여부 관련 **********************************************************************
    const _session_key = `firebase:authUser:${process.env.REACT_APP_FIREBASE_APIKEY}:[DEFAULT]`;

    // 로그인 정보 세션에서 확인
    if (sessionStorage.getItem(_session_key)) {
        if (rs === null || rs === undefined)
            dispatch(setUser(sessionStorage.getItem("userInfo")));
    } else {
        navigate("/");
    }
    let userObj = JSON.parse(sessionStorage.getItem("userInfo"));
    // ***************************************************************************************

    useEffect(() => {
        // post state 초기화
        dispatch(setPost(userObj.add1));
    }, [])

    useEffect(() => {
        if (add1Ref.current !== undefined) {
            add1Ref.current.value = postState;
        }
    }, [postState])

    return (
        (rs === null || rs === undefined) ? null :
            <div className="container">
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">이메일</label>
                    <div className="col-sm-9 col-form-label">
                        <label>{userObj.email}</label>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">이름</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" ref={nameRef} defaultValue={userObj.name} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">전화번호</label>
                    <div className="col-sm-3">
                        <input type="tel" className="form-control" ref={phone1Ref} defaultValue={userObj.phone1} />
                    </div>
                    <div className="col-sm-3">
                        <input type="tel" className="form-control" ref={phone2Ref} defaultValue={userObj.phone2} />
                    </div>
                    <div className="col-sm-3">
                        <input type="tel" className="form-control" ref={phone3Ref} defaultValue={userObj.phone3} />
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">주소</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" disabled={true} ref={add1Ref} defaultValue={postState} />
                    </div>
                    <div className="col-sm-2">
                        <Button variant="light" onClick={() => { openModal() }}>검색</Button>
                    </div>
                </div>
                <div className="mb-3 row">
                    <label className="col-sm-3 col-form-label">상세주소</label>
                    <div className="col-sm-9">
                        <input type="text" className="form-control" ref={add2Ref} defaultValue={userObj.add2} />
                    </div>
                </div>

                <Modal open={modalVisible} close={closeModal} header={"주소"}>
                    <SearchAddress close={closeModal} />
                </Modal>

                <Button variant="light" onClick={() => { btnClick() }}>수정</Button>
            </div>
    )

    /**
     * 이메일, 비밀번호 검증
     */
    function btnClick() {
        const name = nameRef.current.value;
        const phone1 = phone1Ref.current.value;
        const phone2 = phone2Ref.current.value;
        const phone3 = phone3Ref.current.value;
        const add2 = add2Ref.current.value;

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

        if (String(postState).length < 1 || add2.length < 1) {
            alert("주소를 입력해주세요.");
            add2Ref.current.focus();
            return;
        }

        editUser();
    }

    /**
     * 검증 후 가입 처리
     */
    function editUser() {
        const name = nameRef.current.value;
        const phone1 = phone1Ref.current.value;
        const phone2 = phone2Ref.current.value;
        const phone3 = phone3Ref.current.value;
        const add1 = postState;
        const add2 = add2Ref.current.value;
        const uid = JSON.parse(sessionStorage.getItem(_session_key)).uid;

        firestore.collection("USER").doc(uid).update({
            name: name,
            add1: add1,
            add2: add2,
            phone1: phone1,
            phone2: phone2,
            phone3: phone3,
        }).then(() => {
            alert("정보수정이 완료되었습니다.");

            // 수정된 유저 정보로 session storage, state 수정
            const bucket = firestore.collection("USER");
            bucket
                .doc(uid)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        sessionStorage.setItem("userInfo", JSON.stringify(doc.data()));
                        dispatch(setUser(JSON.stringify(doc.data())));
                    }
                });

            // post state 초기화
            dispatch(setPost(null));

            navigate("/");
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("정보수정이 중단되었습니다. 에러코드 : " + errorCode);

            console.log(errorCode);
            console.log(errorMessage);
        })
    }
}

export default MyPage;