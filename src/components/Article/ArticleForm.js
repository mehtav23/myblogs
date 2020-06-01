import React from 'react';


class ArticleForm extends React.Component {

    render() {
        return (
            <form className="ui form">
                <div className="field">
                    <input placeholder="Article Title" />
                </div>
                <div className="field">
                    <input placeholder="What's this article about?" />
                </div>
                <div className="field">
                    <textarea placeholder="Write Your Article (In Markdown)"/>
                </div>
                <div className="field">
                    <input placeholder="Enter tags" />
                </div>
                <div className="field">
                    <button className="ui right floated green button">Publish Article</button>
                </div>
            </form>
        )
        
    }
}

export default ArticleForm;