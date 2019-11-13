import React, { Component } from 'react';
import './Signin.css';

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
       this.setState({ signInEmail: event.target.value }) 
    }

    onPasswordChange = (event) => {
        this.setState({ signInPassword: event.target.value }) 
     }

    onSubmitSignIn = () => {
        fetch('https://infinite-shelf-57225.herokuapp.com/signin', {
            method: 'POST',
            headers: {'Content-Type': 'Application/JSON'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
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
        const { onRouteChange } = this.props;
        return (
            <div className="sign--container">
            <article action="" className="signin--form">
                <h2>sign in</h2>
                <div className="signin--input">
                    <label htmlFor="email">email</label>
                    <input onChange={this.onEmailChange} id='email' type="email"/>
                </div>
                <div className="signin--input">
                    <label htmlFor="password">password</label>
                    <input onChange={this.onPasswordChange} id='password' type="password"/>
                </div>
                <div className="rememberme">
                    <input type="checkbox" name="rememberme" id="rememberme"/>
                    <label htmlFor="rememberme">remember me?</label>
                </div>
                <input onClick={this.onSubmitSignIn} className='signin--submit' type='submit' value='sign in' />
                <input onClick={() => onRouteChange('register')} className='signin--register' type='submit' value='register'/>
            </article>
            </div>
        );
    }   
}

export default Signin;