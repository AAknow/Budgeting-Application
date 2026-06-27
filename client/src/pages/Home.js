import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const logout = () => {
        navigate("/");
    };

    return (
        <div className="App">

            <h1>Budgeting Application</h1>
            
            <h2>Home Page</h2>

            <p>Congratulations! Your routing is working.</p>

            <button onClick={logout}>Logout</button>

        </div>
    );
}

export default Home;