import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signIn } from '../actions';


class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        this.props.signIn(this.state);
    }


    render() {
        return (
            <div className="ui grid container">
                <div className="four wide column"></div>
                <div className="eight wide column">
                    <h1 className="text-center">Sign In</h1>
                    <p className="text-center">
                        <Link to='/signup'>Need an account?</Link>
                    </p>
                    <form className="ui form" onSubmit={this.onSubmit}>
                        <div className="field">
                            <input name="email" type="email" placeholder="Email" onChange={this.handleChange} />
                        </div>
                        <div className="field">
                            <input name="password" type="password" placeholder="Password"  onChange={this.handleChange} />
                        </div>
                        <div className="field">
                            <button className="ui right floated green button">Sign In</button>
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

    }
}

export default connect(mapStateToProps, {signIn})(SignIn);