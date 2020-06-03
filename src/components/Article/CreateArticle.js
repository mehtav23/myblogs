import React from 'react';
import { connect } from 'react-redux';
import {createArticle, clearCreateArticleForm} from '../../actions';

class CreateArticle extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            title: '',
            description: '',
            body: '',
            tag: '',
            taglist: []
        }
    }

    componentDidMount(){
        this.props.clearCreateArticleForm();
    }
    handleChange = (event) => {
        const {name, value} = event.target;
        if(name === 'tag') {
            const values = value.split(' ');
            this.setState({taglist: values, tag: value});
        } else {
            this.setState({[name]: value});
        }
    }

    onSubmit = (event) => {
        event.preventDefault();
        console.log(this.state);
        this.props.createArticle(this.state);
        this.setState({description: '', title: '',body: '', taglist:[] , tag: ''});
    }

    checkSubmitting=()=> {
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
                            <input name= 'title' value={this.state.title} type="text" placeholder="Article Title" onChange={this.handleChange} required/>
                        </div>
                        <div className="field">
                            <input name="description" value={this.state.description}  type="text" placeholder="What's this article about?" onChange={this.handleChange} required/>
                        </div>
                        <div className="field">
                            <textarea name="body" value={this.state.body}   type="text" placeholder="Write Your Article (In Markdown)" onChange={this.handleChange} required />
                        </div>
                        <div className="field">
                            <input name="tag" value={this.state.tag}  type="text"  placeholder="Enter tags" onChange={this.handleChange}/>
                        </div>
                        <div className="field">
                            <button type="submit" className="ui right floated green button">Publish Article</button>
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