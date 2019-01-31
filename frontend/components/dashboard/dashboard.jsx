import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="athlete-profile"></div>
            <Link to={"/routes"}>Routes</Link>
            <Link to={"/routes/new"}>Create Route</Link>
        </div>
    )
};

export default Dashboard;