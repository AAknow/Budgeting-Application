import { useState, useEffect, useMemo } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";


import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from "chart.js";


import { Pie, Line } from "react-chartjs-2";


ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend
);


function Home() {

    const navigate = useNavigate();
    const userId = localStorage.getItem("userId");

    // ---------------- ROUTE PROTECTION ----------------

    useEffect(() => {
        if (!userId) {
            navigate("/");
        }
    }, [navigate, userId]);

    // ---------------- DATABASE DATA ----------------

    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const [goals, setGoals] = useState([]);

    // ---------------- EXPENSE FORM ----------------

    const [expense, setExpense] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");
    const [expenseDate, setExpenseDate] = useState(
        new Date().toISOString().slice(0, 16)
    );

    // ---------------- INCOME FORM ----------------

    const [income, setIncome] = useState("");
    const [incomeAmount, setIncomeAmount] = useState("");
    const [incomeDate, setIncomeDate] = useState(
        new Date().toISOString().slice(0, 16)
    );

    // ---------------- GOAL FORM ----------------

    const [goal, setGoal] = useState("");
    const [goalAmount, setGoalAmount] = useState("");
    const [goalDate, setGoalDate] = useState(
        new Date().toISOString().slice(0, 16)
    );

    // ---------------- LOAD DATA ----------------

    useEffect(() => {

        const fetchData = async () => {

            if (!userId) return;

            try {

                const [expRes, incRes, goalRes] = await Promise.all([
                    api.get(`/expense/user/${userId}`),
                    api.get(`/income/user/${userId}`),
                    api.get(`/goal/user/${userId}`)
                ]);

                setExpenses(expRes.data);
                setIncomes(incRes.data);
                setGoals(goalRes.data);

            }
            catch (err) {
                console.log(err.response?.data || err);
            }
        };

        fetchData();

    }, [userId]);

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
                date: expenseDate
            });


            setExpenses(prev => [...prev, res.data.data]);


            setExpense("");
            setExpenseAmount("");
            setExpenseDate(new Date().toISOString().slice(0,16));


        }
        catch (err) {
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
                date: incomeDate
            });

            setIncomes(prev => [...prev, res.data.data]);

            setIncome("");
            setIncomeAmount("");
            setIncomeDate(new Date().toISOString().slice(0,16));
        }
        catch (err) {
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
                date: goalDate
            });

            setGoals(prev => [...prev, res.data.data]);

            setGoal("");
            setGoalAmount("");
            setGoalDate(new Date().toISOString().slice(0,16));
        }
        catch (err) {
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

    // ---------------- TIMELINE DATA ----------------

    const {
        labels,
        incomeHistory,
        expenseHistory,
        goalHistory,
        balanceHistory
    } = useMemo(() => {

        const uniqueDates = [
            ...expenses.map(e => e.date),
            ...incomes.map(i => i.date),
            ...goals.map(g => g.date)
        ]
            .map(date => new Date(date).toLocaleDateString())
            .filter((date, index, self) => self.indexOf(date) === index)
            .sort((a, b) => new Date(a) - new Date(b));

        let runningIncome = 0;
        let runningExpense = 0;
        let runningGoal = 0;

        const incomeHistory = [];
        const expenseHistory = [];
        const goalHistory = [];
        const balanceHistory = [];

        uniqueDates.forEach(date => {

            incomes
                .filter(i =>
                    new Date(i.date).toLocaleDateString() === date
                )
                .forEach(i => {
                    runningIncome += Number(i.amount);
                });

            expenses
                .filter(e =>
                    new Date(e.date).toLocaleDateString() === date
                )
                .forEach(e => {
                    runningExpense += Number(e.amount);
                });

            goals
                .filter(g =>
                    new Date(g.date).toLocaleDateString() === date
                )
                .forEach(g => {
                    runningGoal += Number(g.amount);
                });

            incomeHistory.push(runningIncome);
            expenseHistory.push(runningExpense);
            goalHistory.push(runningGoal);
            balanceHistory.push(runningIncome - runningExpense);

        });

        return {
            labels: uniqueDates,
            incomeHistory,
            expenseHistory,
            goalHistory,
            balanceHistory
        };

    }, [expenses, incomes, goals]);

    // ---------------- PIE CHART ----------------

    const pieChartData = {
        labels: ["Income", "Expenses"],
        datasets: [
            {
                data: [totalIncome, totalExpenses],
                backgroundColor: [
                    "#4caf50",
                    "#f44336"
                ]
            }
        ]
    };

    // ---------------- LINE CHART ----------------

    const lineChartData = {
        labels,
        datasets: [
            {
                label: "Income",
                data: incomeHistory,
                borderColor: "#4caf50",
                backgroundColor: "#4caf50",
                tension: 0.3
            },
            {
                label: "Expenses",
                data: expenseHistory,
                borderColor: "#f44336",
                backgroundColor: "#f44336",
                tension: 0.3
            },
            {
                label: "Goals",
                data: goalHistory,
                borderColor: "#2196f3",
                backgroundColor: "#2196f3",
                tension: 0.3
            },
            {
                label: "Balance",
                data: balanceHistory,
                borderColor: "#9c27b0",
                backgroundColor: "#9c27b0",
                tension: 0.3
            }
        ]
    };

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
                {/* INCOME */}
                <div className="input-card">
                    <h2>Add Income</h2>

                    <input
                        value={income}
                        onChange={(e) => setIncome(e.target.value)}
                        placeholder="Income"
                    />

                    <input
                        type="number"
                        value={incomeAmount}
                        onChange={(e) => setIncomeAmount(e.target.value)}
                        placeholder="Amount"
                    />

                    <input
                        type="datetime-local"
                        value={incomeDate}
                        onChange={(e) => setIncomeDate(e.target.value)}
                    />

                    <button onClick={addIncome}>
                        Add Income
                    </button>
                </div>

                {/* EXPENSE */}
                <div className="input-card">
                    <h2>Add Expense</h2>

                    <input
                        value={expense}
                        onChange={(e) => setExpense(e.target.value)}
                        placeholder="Expense"
                    />

                    <input
                        type="number"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                        placeholder="Amount"
                    />

                    <input
                        type="datetime-local"
                        value={expenseDate}
                        onChange={(e) => setExpenseDate(e.target.value)}
                    />

                    <button onClick={addExpense}>
                        Add Expense
                    </button>
                </div>

                {/* GOAL */}
                <div className="input-card">
                    <h2>Add Goal</h2>

                    <input
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="Goal"
                    />

                    <input
                        type="number"
                        value={goalAmount}
                        onChange={(e) => setGoalAmount(e.target.value)}
                        placeholder="Amount"
                    />

                    <input
                        type="datetime-local"
                        value={goalDate}
                        onChange={(e) => setGoalDate(e.target.value)}
                    />

                    <button onClick={addGoal}>
                        Add Goal
                    </button>
                </div>
            </section>

            {/* PIE CHART */}
            <section className="charts-section">
                <h2>Financial Overview</h2>

                <div style={{ width: "400px", margin: "auto" }}>
                    <Pie data={pieChartData} />
                </div>
            </section>


            {/* LINE CHART */}
            <section className="charts-section">
                <h2>Financial Timeline</h2>

                <div
                    style={{
                        background: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                    }}
                >
                    <Line data={lineChartData} />
                </div>
            </section>
        </div>
    );
}


export default Home;
