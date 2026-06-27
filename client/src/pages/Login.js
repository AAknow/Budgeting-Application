import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const signIn = async () => {
        try {

            setError("");

            const response = await api.post(
                "/auth/login",
                {
                    email,
                    password
                }
            );

            console.log(response.data);

            navigate("/home");
        }
        catch(err) {

            if (err.response) {
                setError(err.response.data.message);
            } else {
                setError("Unable to connect to the server.")
            }

            //console.log(err);
        }
    };

    return (
        <div>
            
            <h1>Budgeting Application</h1>

            {error && (
                <p style={{ color: "red "}}>
                    {error}
                </p>
            )}

            <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button onClick={signIn}>Sign In</button>

            <button onClick={() => navigate("/signup")}>
                Create New Account
            </button>

        </div>
    );
}

export default Login;