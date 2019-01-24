import React from 'react';


const Greeting = ({ currentUser, logout, openModal }) => {

    const sessionLinks = () => (
        <nav className="login-signup">
            <button className="login-button btn" onClick={() => openModal('login')}>Login</button>
            &nbsp;or&nbsp;
      <button className="login-button btn" onClick={() => openModal('signup')}>Signup</button>
        </nav>

    );
    const personalGreeting = () => (
        <hgroup className="header-group">
            <h2 className="header-name">Hi, {currentUser.username}!</h2>
            <button className="header-button" onClick={logout}>Log Out</button>
        </hgroup>
    );

    return currentUser ? personalGreeting() : sessionLinks();
};


export default Greeting;

