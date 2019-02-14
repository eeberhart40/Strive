import React from 'react';
import { connect } from 'react-redux';

const msp = ({ session, entities: { athletes } }) => {

    return {
        currentUser: athletes[session.id]
    };
};

const Dashboard = ({currentUser}) => {
    return (
        <div className="dash-bg">
            <div className="dashboard-container">
                <div className="left col">
                    <div className="profile">
                        <div className="card-body">
                            <h3 id="username">{currentUser.username}</h3>
                            <div className="avatar-img">
                            </div>
                        </div>
                        <div className="card-footer"></div>
                    </div>
                        
                </div>
                <div className="dashboard-feed">
                    <h3>your activities v</h3>
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
        </div>
    )
};

export default connect(msp)(Dashboard);