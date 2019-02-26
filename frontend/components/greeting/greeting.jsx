import React from 'react';
import { Link, withRouter } from 'react-router-dom';


const Greeting = ({ currentUser, logout, openModal }) => {

    const sessionLinks = () => (
        <nav className="login-signup">
            <button className="login-button btn" onClick={() => openModal('login')}>Login</button>
            &nbsp;or&nbsp;
      <button className="login-button btn" onClick={() => openModal('signup')}>Signup</button>
        </nav>

    );

    const dashBoardHeader = () => (
        <hgroup className="header-group">
            {/* <title>Strive</title> */}
            <ul className="global-nav nav-group">
                <li className="drop-down-menu feature dash">Dashboard v
                    <ul className="options feats">
                        <li className="list-option">
                            <Link to="/routes">My Routes</Link>
                        </li>
                        {/* <div className="gray-menu">
                            STRIVE
                        </div> */}
                    </ul>
                </li>
                <li className="drop-down-menu feature">Training v
                    <ul className="options feats">
                        <li className="list-option">
                            <Link to="/activities">My Activites</Link> 
                        </li>
                        {/* <div className="gray-menu">
                            STRIVE
                        </div> */}
                    </ul>
                </li>
                {/* <li className="drop-down-menu">Explore v
                    <ul className="options">
                        <li className="list-option">Cool Stuff</li>
                        <div className="gray-menu"></div>
                    </ul>
                </li>
                <li>Challenges</li> */}
            </ul>
            <ul className="user-nav nav-group">
                <li className="personal-site">
                    <button className="hire-btn">
                        <a href="https://eeberhart40.github.io">Eric Eberhart</a>
                    </button>
                </li>
                <li className="drop-down-menu nav">
                    <div className="avatar-wrapper"><div className="avatar-img nav-av"></div></div>
                    {/* <div className="drop-chev av">v</div> */}
                    <ul className="options prof-nav">
                        <li className="list-option">
                            <Link to='/dashboard'>My Profile</Link>
                        </li>
                        <li className="list-option" onClick={logout}>Log Out</li>
                    </ul>
                </li>
                {/* <li className="upload-menu">upload</li> */}
            </ul>
        </hgroup>
    );

    return currentUser ? dashBoardHeader() : sessionLinks();
};


export default withRouter(Greeting);

