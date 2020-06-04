import React from 'react';
import { Router, Route, Switch} from 'react-router-dom';
import Header from './Header';
import CreateArticle from './Article/CreateArticle';
import ArticleList from './Article/ArticleList';
import ArticleEdit from './Article/ArticleEdit';
import ArticleView from './Article/ArticleView';
// import ArticleDelete from './Article/ArticleDelete';
import SignIn from './SignIn';
import SignUp from './SignUp';
import UserProfile from './UserProfile';

import './App.css';


import createBrowserHistory from '../history';



class App extends React.Component {
    render (){
        return (
            <Router history={createBrowserHistory}>
                    <div>
                    <Header />
                    <Switch>
                    <Route path="/" exact component= {ArticleList} />
                    <Route path="/articles/new/" exact component= {CreateArticle} /> 
                    <Route path="/articles/edit/:id" exact component= {ArticleEdit} /> 
                    <Route path="/articles/:id" exact component= {ArticleView} />
                    <Route path="/Signin/" exact component= {SignIn} />
                    <Route path="/Signup/" exact component= {SignUp} /> 
                    <Route path="/userprofile/" exact component= {UserProfile} /> 
                    </Switch>
                    </div>
                </Router>
        )
    }
}

export default App;