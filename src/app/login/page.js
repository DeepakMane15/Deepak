"use client"
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "next/navigation";


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("user")) {
            router.push("/");
        }
    },[])

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            localStorage.setItem('user', username);
            router.push("/");
        } else {
            alert("invalid username or password");
        }
    }

    return (
        <div className="login_box">
            <div className="login-form">
                <h3 className="display-6 mb-3 text-center mb-4">Login</h3>

                <form className="mt-4">
                    <div className="mb-3">
                        <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} id="username" name="username" placeholder="Username" aria-describedby="usernameHelp" />
                    </div>

                    <div className="mb-3">
                        <input className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder="Password" type="password" />
                    </div>

                    <button type="button" onClick={handleLogin} style={{ width: '100%', backgroundColor: 'rgb(108, 173, 108)' }} className="btn btn-primary login-btn">Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login;