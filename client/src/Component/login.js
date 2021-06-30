import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css'
function Login(props) {
    const [state , setState] = useState({name : ""});
    return (
        <div className="modal">
            <div className="body">
                <input name="name" required placeholder="vui lòng nhập tên" className="form-input" onChange={e => setState({[e.target.name]  : e.target.value})}/>
                 <Link to={`/chat/${state.name}`} onClick={e => state === '' ? e.preventDefault() : null}>
                    <button className="btn">Đăng nhập</button>
                 </Link>
            </div>
        </div>
    );
}

export default Login;