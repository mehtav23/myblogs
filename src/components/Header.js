import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import {signOut, getCurrentUser} from '../actions';
class Header extends React.Component {

    signOut = () =>{
        this.props.signOut();
        window.location.reload();
    }
    componentDidMount(){
        this.props.getCurrentUser();
    }
    isSignedIn () {
        if(this.props.isSignedIn){
            console.log(this.props.userName);
            return (
                <React.Fragment>
                    <Link to='/articles/new' className="item"><i className="edit outline icon"></i>New Article</Link>
                    <Link to='' className="item"><i className="user icon"></i>{this.props.userName.user.username}</Link>
                    <Link to='' className="item" onClick={this.signOut}>Sign Out</Link>
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Link to='/signIn' className="item">SignIn</Link>
                    <Link to='/signUp' className="item">SignUp</Link>
                </React.Fragment>
            );
        }
    }
    render(){
        return (
            <div className="ui container">
                <div className="ui secondary pointing menu">
                    <div className="left menu">
                    <Link to='/' className="item">Blogs</Link>
                    </div>
                    <div className="right menu">
                    <Link to='/' className="item">Home</Link>
                    {this.isSignedIn()}
                    </div>
                </div>
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.auth.isSignedIn,
        userName: state.auth.user
    }
}
export default connect(mapStateToProps, {signOut, getCurrentUser})(Header);