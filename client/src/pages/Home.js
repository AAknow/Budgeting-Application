import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    // ---------------- ROUTE PROTECTION ----------------
    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            navigate("/");
        }
    }, [navigate]);

    const userId = localStorage.getItem("userId");

    // ---------------- STATE (DATA) ----------------
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [goals, setGoals] = useState([]);

    // ---------------- STATE (FORMS) ----------------
    const [expense, setExpense] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");

    const [income, setIncome] = useState("");
    const [incomeAmount, setIncomeAmount] = useState("");

    const [goal, setGoal] = useState("");
    const [goalAmount, setGoalAmount] = useState("");

    // ---------------- LOGOUT ----------------
    const logout = () => {
        localStorage.removeItem("userId");
        navigate("/");
    };

    // ---------------- CREATE EXPENSE ----------------
    const addExpense = async () => {
        try {
            const res = await api.post("/expense", {
                userId,
                expense,
                amount: Number(expenseAmount),
                date: new Date()
            });

            setExpenses([...expenses, res.data.data]);

            setExpense("");
            setExpenseAmount("");
        } catch (err) {
            console.log(err.response?.data || err);
        }
    };

    // ---------------- CREATE INCOME ----------------
    const addIncome = async () => {
        try {
            const res = await api.post("/income", {
                userId,
                income,
                amount: Number(incomeAmount),
                date: new Date()
            });

            setIncomes([...incomes, res.data.data]);

            setIncome("");
            setIncomeAmount("");
        } catch (err) {
            console.log(err.response?.data || err);
        }
    };

    // ---------------- CREATE GOAL ----------------
    const addGoal = async () => {
        try {
            const res = await api.post("/goal", {
                userId,
                goal,
                amount: Number(goalAmount),
                date: new Date()
            });

            setGoals([...goals, res.data.data]);

            setGoal("");
            setGoalAmount("");
        } catch (err) {
            console.log(err.response?.data || err);
        }
    };

    // ---------------- TOTALS ----------------
    const totalIncome = incomes.reduce(
        (sum, i) => sum + Number(i.amount || 0),
        0
    );

    const totalExpenses = expenses.reduce(
        (sum, e) => sum + Number(e.amount || 0),
        0
    );

    const balance = totalIncome - totalExpenses;

    return (
        <div className="home-page">

            {/* HEADER */}
            <header className="home-header">
                <h1>Budget Dashboard</h1>
                <button onClick={logout}>Logout</button>
            </header>

            {/* SUMMARY CARDS */}
            <section className="summary-grid">

                <div className="card income">
                    <h3>Income</h3>
                    <p>${totalIncome}</p>
                </div>

                <div className="card expenses">
                    <h3>Expenses</h3>
                    <p>${totalExpenses}</p>
                </div>

                <div className="card balance">
                    <h3>Balance</h3>
                    <p>${balance}</p>
                </div>

            </section>

            {/* INPUT SECTION */}
            <section className="input-grid">

                {/* EXPENSE */}
                <div className="card">
                    <h2>Add Expense</h2>
                    <input
                        placeholder="Expense"
                        value={expense}
                        onChange={(e) => setExpense(e.target.value)}
                    />
                    <input
                        placeholder="Amount"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                    />
                    <button onClick={addExpense}>Add</button>
                </div>

                {/* INCOME */}
                <div className="card">
                    <h2>Add Income</h2>
                    <input
                        placeholder="Income"
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                    />
                    <input
                        placeholder="Amount"
                        value={incomeAmount}
                        onChange={(e) => setIncomeAmount(e.target.value)}
                    />
                    <button onClick={addIncome}>Add</button>
                </div>

                {/* GOALS */}
                <div className="card">
                    <h2>Add Goal</h2>
                    <input
                        placeholder="Goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                    />
                    <input
                        placeholder="Amount"
                        value={goalAmount}
                        onChange={(e) => setGoalAmount(e.target.value)}
                    />
                    <button onClick={addGoal}>Add</button>
                </div>

            </section>

            {/* CHART SECTION (placeholder for now) */}
            <section className="charts-section">
                <h2>Spending Overview</h2>

                <div className="chart-box">
                    <p>Chart.js will go here</p>
                </div>
            </section>

        </div>
    );
}

export default Home;
