import React from 'react';
import { connect } from 'react-redux';
import {createArticle, clearCreateArticleForm} from '../../actions';

class CreateArticle extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: null,
            description: null,
            body: null,
            taglist: []
        }
    }

    componentDidMount(){
        this.props.clearCreateArticleForm();
    }
    handleChange = (event) => {
        const {name, value} = event.target;
        if(name === 'taglist') {
            const values = value.split(' ');
            this.setState({[name]: values});
        } else {
            this.setState({[name]: value});
        }
        
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.createArticle(this.state)
    }

    checkSubmitting() {
        if(this.props.creatingArticle){
            return (
                <p className="text-center">Submitting Form....</p>
            )
        }
        else if(this.props.createdArticle){
            return (
                <p className="text-center">Article Created...!!!</p>
            )
        }
        else if(this.props.creatingArticleFailed){
            return (
                <p className="text-center">Failed to Create Article</p>
            )
        }
    }

    render() {
        const creatingFlag = this.checkSubmitting();
        return (
            <div className="ui grid container">
                <div className="two wide column"></div>
                <div className="twelve wide column">
                    {creatingFlag}
                    <form className="ui form" onSubmit={this.onSubmit}>
                        <div className="field">
                            <input name= 'title' placeholder="Article Title" onBlur={this.handleChange}/>
                        </div>
                        <div className="field">
                            <input name="description" placeholder="What's this article about?" onBlur={this.handleChange} />
                        </div>
                        <div className="field">
                            <textarea name="body" placeholder="Write Your Article (In Markdown)" onBlur={this.handleChange} />
                        </div>
                        <div className="field">
                            <input name="taglist" placeholder="Enter tags" onBlur={this.handleChange}/>
                        </div>
                        <div className="field">
                            <button className="ui right floated green button">Publish Article</button>
                        </div>
                    </form>
                </div>
                <div className="two wide column"></div>
            </div>
        )
        
    }
}
const mapStateToProps= (state)=> {
    return {
        creatingArticle: state.articles.creatingArticle,
        createdArticle: state.articles.createdArticle,
        creatingArticleFailed: state.articles.creatingArticleFailed
    }
}


export default connect(mapStateToProps,{createArticle, clearCreateArticleForm})(CreateArticle);