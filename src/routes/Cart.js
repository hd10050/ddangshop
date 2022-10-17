import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { changeCount, deleteItem } from './../store';

function Cart() {
    
    // let rs = useSelector(state => state);
    // let dispatch = useDispatch();

    let [fade, setfade] = useState('');

    useEffect(() => {
        // 전환 애니메이션 부착
        let timer = setTimeout(() => {
            setfade('end');
        }, 100)

        return () => {
            clearTimeout(timer);
            setfade('');
        }
    }, [])

    return (
        <div className={'container mt-5 start ' + fade}>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* {
                        rs.cartItm.map((data, i) =>
                            <tr key={i}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.count}</td>
                                <td><button onClick={()=>{
                                    dispatch(changeCount(data.id));
                                }}>+</button></td>
                                <td><button onClick={()=>{
                                    dispatch(deleteItem(data.id));
                                }}>삭제</button></td>
                            </tr>
                        )
                    } */}
                </tbody>
            </Table>
        </div>
    )
}

export default Cart;
