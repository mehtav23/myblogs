import React from 'react';
import { connect } from 'react-redux';
import { fetchArticleForEdit, clearFetchingForEdit, updateArticle } from  '../../actions';
import createBrowserHistory from '../../history';
class ArticleEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            slug:'',
            title: '',
            description:'',
            body:'',
            tags:'',
            tagList:''
        }
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({slug: id});
        this.props.fetchArticleForEdit(id);
        
    }

    componentWillReceiveProps(newProps){
        console.log('hiiiiii', newProps);
        if(newProps.fetchingSuccessfully){
            const {article} = newProps.fetchedArticle;
            console.log('article', article);
            this.props.clearFetchingForEdit();
            if(article){
                const {title,body,description}=article;
                const tagList = article.tagList;
                const tags =article.tagList.join(' ');
                this.setState({title, body, description, tagList, tags});
            }
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        if(name === 'tags') {
            const values = value.split(' ');
            this.setState({tagList: values, tags: value});
        } else {
            this.setState({[name]: value});
        }
        
    }

    onSubmit = (event) =>{
        event.preventDefault();
        console.log(this.state);
        this.props.updateArticle(this.state);
    }

    renderUpdateArticleStatus = ()=>{
        if(this.props.updatingArticle){
            return (
                <div className="text-center">Updating Article....</div>
            );
        } else if(this.props.updatedArticleStatus){
            const {article} = this.props.updatedArticle;
            console.log('new Article',article);
            createBrowserHistory.push(`/articles/${this.state.slug}`);
            return (
                <div className="text-center">Successfully Updated the Article....</div>
            );

        } else if(this.props.failToUpdate){
            return (
                <div className="text-center">{this.props.failureReason}</div>
            );
        }
    }

    render() {
        const updatingStatus = this.renderUpdateArticleStatus();
        return (
            <div className="ui grid container">
                <div className="two wide column">
                </div>
                <div className="twelve wide column">
                    <div className="text-center">
                    <h1>Article Update</h1>
                    </div>
                    <br/>
                    {updatingStatus}
                    <form className="ui form" onSubmit={this.onSubmit}>
                        <div className="field">
                            <input name='title' value={this.state.title} placeholder="Article Title" onChange={this.handleChange}  required/>
                        </div>
                        <div className="field">
                            <input name='description' value={this.state.description} placeholder="What's this article about?" onChange={this.handleChange} required />
                        </div>
                        <div className="field">
                            <textarea name='body' value={this.state.body} placeholder="Write Your Article (In Markdown)" onChange={this.handleChange} required/>
                        </div>
                        <div className="field">
                            <input name='tags' value={this.state.tags} placeholder="Enter tags" onChange={this.handleChange} />
                        </div>
                        <div className="field">
                            <button className="ui right floated green button">Publish Again</button>
                        </div>
                    </form>
                </div>
            </div>
        )
        
    }
}

const mapStateToProps = (state) => {
    return {
        fetchingArticle: state.articles.fetchingArticleDetailsForEdit,
        fetchingSuccessfully: state.articles.fetchingArticleDetailsForEditSuccessfully,
        fetchingFailed: state.articles.fetchingArticleDetailsForEditFailed,
        fetchedArticle: state.articles.fetchedArticleDetailsForEdit,
        updatingArticle: state.articles.updatingArticle,
        updatedArticleStatus: state.articles.updatingArticleSuccess,
        failToUpdate: state.articles.updatingArticleFailed,
        failureReason: state.articles.updatingArticleError,
        updatedArticle: state.articles.updatedArticleResult
    }
}


export default connect(mapStateToProps, {fetchArticleForEdit, updateArticle, clearFetchingForEdit})(ArticleEdit);