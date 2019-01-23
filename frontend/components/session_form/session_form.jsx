import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
    constructor(props){
        super(props);
        this.state = { email: "", username: "", password: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const athlete = Object.assign({}, this.state);
        this.props.processForm(athlete).then(this.props.closeModal);
        
    }

    update(field){
        return e => this.setState({
            [field]: e.target.value
        })
    }

    render() {
        const errors = this.props.errors.map((error, i) => {
            return(
                <ul>
                    <li key={`error-${i}`}>{error}</li>
                </ul>
            )
        });
    
        return(
            <div className="login-form-container">
                <form className="login-form-box" onSubmit={this.handleSubmit}>
                    <button id="login-button">{this.props.navLink}</button>
                    <div onClick={this.props.closeModal} className="close-X">X</div>
                    {errors}
                    <div className="login-form">
                        <br/>
                        <label>
                            Email:
                            <input type="text" 
                            value={this.state.email} 
                            onChange={this.update('email')}
                            className="login-input"
                            />
                        </label>
                        <label>
                            Username:
                            <input type="text"
                            value={this.state.username}
                            onChange={this.update('username')}
                            className="login-input"
                              />
                        </label>
                        <label>
                            Password:
                            <input type="password"
                            value={this.state.password}
                            onChange={this.update('password')}
                            className="login-input"
                            />
                        </label>
                        <input type="submit" value={this.props.formType} className="session-submit" />
                    </div>
                </form>
            </div>
        )
  
    }
}

export default withRouter(SessionForm);