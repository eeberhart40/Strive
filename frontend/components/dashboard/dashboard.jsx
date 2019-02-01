import React from 'react';
import { connect } from 'react-redux';

const msp = ({ session, entities: { athletes } }) => {

    return {
        currentUser: athletes[session.id]
    };
};

const Dashboard = ({currentUser}) => {
    //username is stored as email. fix this
    return (
        <div className="dashboard-container">
            <div className="left col">
                <div className="profile">
                    <h2>hello, {currentUser.email}</h2>
                </div>
                    
            </div>
            <div className="dashboard-feed">
                <h1>no recent activities</h1>
            </div>
            <div className="right col">
                <div className="col-div">
                    <h3>Challenges</h3>
                </div>
                <div className="col-div">
                    <h3>Clubs</h3>
                </div>
                <div className="col-div">
                    <h3>Try a Privacy Zone</h3>
                </div>
            </div>
        </div>
    )
};

export default connect(msp)(Dashboard);