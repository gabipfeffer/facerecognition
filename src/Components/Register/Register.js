import React, { Component } from 'react';
import './Register.css';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fname: '',
            lname: ''
        }
    }

    onEmailChange = (e) => {
        this.setState({ email: e.target.value})
    }

    onPasswordChange = (e) => {
        this.setState({ password: e.target.value})
    }

    onFnameChange = (e) => {
        this.setState({ fname: e.target.value})
    }

    onLnameChange = (e) => {
        this.setState({ lname: e.target.value})
    }

    onSubmitRegister = () => {
        fetch('https://infinite-shelf-57225.herokuapp.com/register', {
            method: 'POST',
            headers: {'Content-Type': 'Application/JSON'},
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                fname: this.state.fname,
                lname: this.state.lname,
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) {
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

render() {
        return (
            <div className="sign--container">
            <article action="" className="register--form">
                <h2>register</h2>
                <div className="register--input">
                    <label htmlFor="fname">first name</label>
                    <input onChange={this.onFnameChange} id='fname' type="text"/>
                </div>
                <div className="register--input">
                    <label htmlFor="lname">last name</label>
                    <input onChange={this.onLnameChange} id='lname' type="text"/>
                </div>
                <div className="register--input">
                    <label htmlFor="email">email</label>
                    <input onChange={this.onEmailChange} id='email' type="email"/>
                </div>
                <div className="register--input">
                    <label htmlFor="password">password</label>
                    <input onChange={this.onPasswordChange} id='password' type="password"/>
                </div>
                <input onClick={this.onSubmitRegister} className='register--submit' type='submit' value='register' />
            </article>
            </div>
        );
    }
}

export default Register;