import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { email: "", username: "", password: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const athlete = Object.assign({}, this.state);
        this.props.processForm(athlete).then(this.props.closeModal).then(this.props.history.push('/dashboard'));
    }

    update(field){
        return e => this.setState({
            [field]: e.target.value
        })
    }

    handleClick(e){
        e.preventDefault();
        this.props.login({ email: "demo", username: "demoUser", password: "starwars" }).then(
            this.props.closeModal).then(this.props.history.push('/dashboard'));
    }

    render() {
        const errors = this.props.errors.map((error, i) => {
            return(
                 <li key={`error-${i}`}>{error}</li>
            )
        });
    
        return(
            <div className="login-form-container">
                <form className="login-form-box" onSubmit={this.handleSubmit}>
                    <div onClick={this.props.closeModal} className="close-X">X</div>
                    <h1>{this.props.formType}</h1>
                    <ul className="errors">
                        {errors}
                    </ul>
                    <div className="login-form">
                        <br/>
                        <label>
                            <input type="text" 
                            value={this.state.email} 
                            placeholder="Your Email"
                            onChange={this.update('email')}
                            className="login-input"
                            />
                        </label>
                        <label>
                            <input type="text"
                            value={this.state.username}
                            placeholder="Username"
                            onChange={this.update('username')}
                            className="login-input"
                              />
                        </label>
                        <label>
                            <input type="password"
                            value={this.state.password}
                            placeholder="Password"
                            onChange={this.update('password')}
                            className="login-input"
                            />
                        </label>
                        <input type="submit" value={this.props.formType} className="session-submit" />
                        <button id="demo-login" onClick={this.handleClick}>Demo User</button>
                    </div>
                </form>
            </div>
        )
  
    }
}

export default withRouter(SessionForm);