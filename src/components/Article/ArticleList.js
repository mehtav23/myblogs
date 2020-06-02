import React from 'react';
import { connect } from 'react-redux';
import { fetchArticles, fetchMyArticles } from '../../actions';
import { Link } from 'react-router-dom';
import {Pagination} from 'semantic-ui-react';


class ArticleList extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            myFeed: false,
            globalFeed: true,
            activePage:1
        }
    }
    componentDidMount() {
        this.props.fetchArticles(0);
    }
    formatDate =(date)=>{
        if(date){
            return new Date(date).toLocaleDateString();
        }
    }
    displayFeedsSection= ()=>{
        if(this.props.isSignedIn){
            const classes = this.state.myFeed?"item active":"item";
            return (
                <Link to="" className={classes} onClick={this.fetchMyFeed}>My Feed</Link>
            );
        }
    }
    handleImage=({author})=>{
        if(author && author.image) {
            return (
                <img className="ui floated left avatar image" src={author.image} alt="na"/>
            );
        }
    }

    fetchGlobalFeed=()=>{
        this.setState({activePage:1, globalFeed:true, myFeed:false});
        this.props.fetchArticles();
    }

    fetchMyFeed =()=>{
       
        this.props.fetchMyArticles();
        this.setState({activePage:1, globalFeed:false, myFeed:true});
        //this.forceUpdate()
    }

    handleBlankSection = (articles) => {
        if(articles.length === 0 && ! this.props.errorMessage && !this.props.isLoading){
            return (
                <div>No articles are here... yet.</div>
            )
        }
    }
    handlePageChange = (event, data) => {
        console.log(event, data);
        const offset = (data.activePage-1)*10;
        if(this.state.globalFeed) {
            this.props.fetchArticles(offset);
        }else {
            this.props.fetchMyArticles(offset);
        }
    }

    render() {
        const articles = this.state.globalFeed ? this.props.feedArticles: this.props.myArticles;
        const blankSection = this.handleBlankSection(articles);
        const rows = articles.map(article =>{
        const image = this.handleImage(article);
        const articleDate = this.formatDate(article.createdAt);
            return (
                <div className="card" key={article.slug} >
                    <div className="content">
                        {image}
                        <div className="header">
                            <Link to="">{article.author.username}</Link><br/>
                        </div>
                        <div className="meta">
                            {articleDate}
                        </div>
                        <div className="description text-break">
                            <h3>{article.title}</h3>
                        </div>
                        <div className="description text-break">
                            {article.body}
                        </div>
                    </div>
                    <div className="extra content">
                        <Link to={`/articles/${article.slug}`}>Read more...</Link>
                    </div>
                            
                </div>
    
            );
        });
        const displayFeeds = this.displayFeedsSection();
        return (
            <div className="ui grid container">
                <div className="twelve wide column">
                    <div className="ui secondary pointing menu">
                        {displayFeeds}
                        <Link to="" className={this.state.globalFeed?"item active":"item"} onClick={this.fetchGlobalFeed}>Global Feed</Link>                
                    </div>
                        {blankSection}
                    <div className="ui one cards">
                        { rows }
                    </div>
                    <div className="text-center pagination">
                    <Pagination activePage={this.state.activePage} totalPages={50}  onPageChange={this.handlePageChange}/>
                    </div>
                </div>
                <div className="four wide column">
                    <div className="ui secondary pointing menu">
                        <Link to="" className="item">Tags</Link>                
                    </div>
                </div>

                
            
            </div>
            
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        feedArticles: state.articles.feedArticles,
        myArticles: state.articles.myArticles,
        errorMessage: state.articles.errorMessage,
        isSignedIn: state.auth.isSignedIn,
        isLoading: state.articles.fetchingArticles || state.articles.fetchingMyArticles,
        
    }
}

export default connect(mapStateToProps, {fetchArticles, fetchMyArticles})(ArticleList);