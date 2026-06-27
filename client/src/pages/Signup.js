import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const signUp = async () => {
        try {

            setError("");

            const response = await api.post(
                "/auth/signup",
                {
                    name,
                    email,
                    password
                }
            );

            console.log(response.data);

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
            
            <h1>Create Account</h1>

            {error && (
                <p style={{ color: "red "}}>
                    {error}
                </p>
            )}

            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

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

            <button onClick={signUp}>
                Sign Up
            </button>

        </div>
    );
}

export default Signup;