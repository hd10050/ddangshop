import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';


function MyPage() {
    let [formEmail, setEmail] = useState("");
    let [formPsw, setPassword] = useState("");
    let rs = useSelector(state => state.user);

    return (
        <div className="container">
            <div className="mb-3 row">
                <label className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10 col-form-label">
                    <label>{rs.userEmail}</label>
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
            
            <Button variant="light" onClick={() => { }}>수정</Button>
        </div>
    )
}

export default MyPage;