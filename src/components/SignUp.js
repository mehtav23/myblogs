import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'

import { signUp } from '../actions'

class SignUp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            email: '',
            password: ''
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
        

    }

    onSubmit = (event)=> {
        event.preventDefault();
        this.props.signUp(this.state);
    }

    registering () {
        if(this.props.isRegistering) {
            return (
            <p className="text-center">Registering ${this.props.userName}</p>)
        }
        else {
            return (
                <p className='text-center'>
                    <Link to="/signin">Have an account?</Link>
                </p>
            );
        }
    }

    render() {
        return (
        <div className="ui grid container">
            <div className="four wide column"></div>
            <div className="eight wide column">
                <h1 className="text-center">Sign Up</h1>
                
                {this.registering()}
                
                <form className="ui form" onSubmit={this.onSubmit}>
                    <div className="field">
                        <input name="userName" placeholder="Username" onChange={this.handleChange}/>
                    </div>
                    <div className="field">
                        <input name="email" type="email" placeholder="Email" onChange={this.handleChange}/>
                    </div>
                    <div className="field">
                        <input name="password" type="password" placeholder="Password" onChange={this.handleChange}/>
                    </div>
                    <div className="field">
                        <button className="ui right floated green button">Sign Up</button>
                    </div>
                </form>
            </div>
            <div className="four wide column"></div>
            
        </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        isRegistering: state.register.isRegistering,
        userName: state.register.userName
    }
}


export default connect(mapStateToProps, {signUp})(SignUp);