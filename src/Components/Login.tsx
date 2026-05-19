import { useAppDispatch } from "../redux/hook"
import { login } from "../redux/features/authSlice";
import { useState } from "react";
function Login() {
    const [loginCode, setLoginCode] = useState<string>();
    const dispatch = useAppDispatch();

    return (
        <div style={{ textAlign: 'center', paddingTop: '50px' }}>
            Login Page
            <div style={{ backgroundColor: 'pink', padding:'100px'}}>
                <input type="number" placeholder="Enter code Eg : 123" value={loginCode} onChange={(e) => setLoginCode(e.target.value)} />
                <br />
                <button onClick={() => dispatch(login(Number(loginCode)))}>Login</button>
            </div>
        </div>
    )
}

export default Login
