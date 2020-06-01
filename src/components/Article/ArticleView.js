import React from 'react';
import { connect } from 'react-redux';
import { fetchArticleBySlug } from '../../actions';

class ArticleView extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        // this.setState({slug: id});
        this.props.fetchArticleBySlug(id);
        
    }
    getHeaderSection() {
        if(this.props.article && ! this.props.isloading && !this.props.failedMessgae) {
            const {article} = this.props.article;
            const header= article.title,
                userName= article.author.username,
                date= new Date(article.createdAt).toLocaleDateString(),
                body= article.body,
                tags= article.tagList,
                imgSrc = article.author.image

            return (
                <React.Fragment>
                    <div className="banner">    
                        <div className="content">
                            <h1>{header}</h1>
                        </div>
                        
                        <div className="content">
                            <img src={imgSrc} alt="not available" className="ui floated left avatar image"/>
                            <div>
                            {userName}<br/>
                                {date}
                            </div>
                            <div>
                            <ul className="ui floated left article-taglist-ul">
                                
                                <li className="article-taglist-li">
                                    <i className="plus icon"></i>Follow {userName}
                                </li>
                                &nbsp;
                                <li className="article-taglist-li">
                                    <i className="heart icon"></i>&nbsp; Favourite
                                </li>
                                &nbsp;
                                <li className="article-taglist-li">
                                    <i className="edit icon"></i>&nbsp; Edit Article
                                </li>
                                &nbsp;
                                <li className="article-taglist-li" >
                                    <i className="trash icon"></i>&nbsp; Delete Article
                                </li>
                            </ul>
                            </div>
                        </div>
                        
                        <br/>
                    </div>
                    <div className="ui container grid">
                        <div className="one wide column"></div>
                        <div className="fifteen wide column">
                            <br/>
                            <div>
                                <h3>{body}</h3>
                            </div>
                            <br/>
                            <ul className="article-taglist-ul">
                                {tags?tags.map(tag=><li className="article-taglist-li">{tag}</li>):''}
                            </ul>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
        else if(this.props.isloading){
            return (
                <React.Fragment>Fetching....!!</React.Fragment>
            )
        }
        else if(this.props.failedMessgae) {
            return(
                <React.Fragment>this.props.failedMessgae</React.Fragment>
            )
        }
    }

    render() {
        const headerSection = this.getHeaderSection();
        return (
            <React.Fragment>
                    {headerSection} 
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
        article: state.articles.fetchedDetailedArticle,
        isloading: state.articles.fetchingDetailedArticle,
        failedMessgae: state.articles.fetchedDetailedArticleFailed,
    }
}


export default connect(mapStateToProps,{fetchArticleBySlug})(ArticleView);