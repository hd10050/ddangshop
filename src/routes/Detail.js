import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import { Nav } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { addItem } from './../store';

function Detail(props) {
    let [hideStr, setHideStr] = useState(false);            // 문자열 숨기기 여부
    let [curTab, setCurTab] = useState(0);                  // 현재 탭
    let { id } = useParams();                               // 파라미터로 받아온 상품의 id
    let shoesInfo = props.shoes.find(e => e.id == id);      // 해당 id를 가진 상품 obj
    let [detailFade, setDetailFade] = useState('');         // 전환애니메이션 관련 변수
    // let dispathch = useDispatch();                          // redux dispathch

    useEffect(() => {
        // 2초후 문자열 숨기기
        let timer = setTimeout(() => {
            setHideStr(true)
        }, 2000);

        // 전환 애니메이션 부착
        let timer2 = setTimeout(() => {
            setDetailFade('end');
        }, 100)       
        
        return () => {
            clearTimeout(timer);
            clearTimeout(timer2);
            setDetailFade('');
        }
    }, [])

    useEffect(() => {
        // 최근 본 상품 목록 localStorage
        let tempArr = JSON.parse(localStorage.getItem('watched'));
        tempArr.push(shoesInfo.id);
        let tempSet = new Set(tempArr);
        localStorage.setItem('watched', JSON.stringify([...tempSet]));
        
        return () => {
        }
    }, [])

    // 해당 id 상품이 있을 경우에만 표시
    if (!isNaN(id) && !(shoesInfo == null || shoesInfo == undefined)) {        
        return (
            // 2초후 사라지는 문자열
            <div className={'container start ' + detailFade}>
                {
                    !hideStr ? <div className="alert alert-warning"> 2초이내 구매시 할인 </div> : null
                }

                <div className="row">
                    <div className="col-md-6">
                        <img src={"https://codingapple1.github.io/shop/shoes" + (shoesInfo.id + 1) + ".jpg"} width="100%" />
                    </div>
                    <div className="col-md-6">
                        <h3 className="pt-5">{shoesInfo.title}</h3>
                        <p>{shoesInfo.content}</p>
                        <p>{shoesInfo.price}원</p>
                        <button className="btn btn-danger" onClick={() => {
                            // 장바구니에 추가
                            // dispathch(addItem(shoesInfo));
                        }}>주문하기</button>
                    </div>
                </div>

                <Nav variant="tabs" defaultActiveKey="link0">
                    <Nav.Item>
                        <Nav.Link eventKey="link0" onClick={() => {
                            setCurTab(0);
                        }}>버튼0</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link1" onClick={() => {
                            setCurTab(1);
                        }}>버튼1</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link2" onClick={() => {
                            setCurTab(2);
                        }}>버튼2</Nav.Link>
                    </Nav.Item>
                </Nav>

                {/* 탭 내용 */}
                <TabContent curTab={curTab} shoesInfo={shoesInfo} />
            </div>
        )
    }
    else {
        return (
            <div className="container">
                <div className="row">
                    <h4>상품이 없습니다.</h4>
                </div>
            </div>
        )
    }
}

function TabContent(props) {

    let [fade, setFade] = useState('');

    // 전환 애니메이션 부착
    useEffect(() => {
        let timer = setTimeout(() => {
            setFade('end');
        }, 100)

        return () => {
            setFade('');
            clearTimeout(timer);
        }
    }, [props.curTab])

    if (props.curTab == 0) {
        return <div className={'start ' + fade}>{props.shoesInfo.title}</div>
    }
    else if (props.curTab == 1) {
        return <div className={'start ' + fade}>{props.shoesInfo.content}</div>
    }
    else if (props.curTab == 2) {
        return <div className={'start ' + fade}>{props.shoesInfo.price}</div>
    }
    else {
        return <div>-</div>
    }
}

export default Detail;
