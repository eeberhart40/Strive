import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h1>This is the user dashboard</h1>
            <Link to={"/routes"}>Routes</Link>
            <Link to={"/routes/new"}>Create Route</Link>
        </div>
    )
};

export default Dashboard;