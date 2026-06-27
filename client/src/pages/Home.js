import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    const logout = () => {
        navigate("/");
    };

    return (
        <div className="home-page">

            {/* Header */}
            <header className="home-header">
                <h1>Budget Dashboard</h1>
                <button onClick={logout}>Logout</button>
            </header>

            {/* Summary Cards */}
            <section className="summary-grid">

                <div className="card income">
                    <h3>Income</h3>
                    <p>$0</p>
                </div>

                <div className="card expenses">
                    <h3>Expenses</h3>
                    <p>$0</p>
                </div>

                <div className="card balance">
                    <h3>Balance</h3>
                    <p>$0</p>
                </div>

            </section>

            {/* Charts Section */}
            <section className="charts-section">
                <h2>Spending Overview</h2>

                <div className="chart-box">
                    <p>Chart will go here (Chart.js)</p>
                </div>
            </section>

        </div>
);
}

export default Home; 
