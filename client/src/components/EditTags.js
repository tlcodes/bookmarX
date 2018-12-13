import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTags, removeTag } from '../actions/LinkActions';

class EditTags extends Component {
    
    handleRemoveTag = (tag) => {
        tag.trim();
        this.props.removeTag(this.props.link.id, tag);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (e.target.keywords.value === '') {
            return
        } else {
            // allow comma separated values, discard tags entered twice and exisiting  ones
            let newTags = e.target.keywords.value.split(',').filter((tag, idx, newTagsArr) => {
                return newTagsArr.indexOf(tag) === idx;
            }).filter(tag => {
                return this.props.link.tags.indexOf(tag) === -1;
            })
            this.props.addTags(this.props.link.id, newTags);
            e.target.keywords.value = '';
        }
    }
    render() {
        const { link } = this.props;
        const tagsList = link.tags.length ? (
            link.tags.map(tag => {
                return (
                    <li key={tag}>{tag} <button onClick={() => this.handleRemoveTag(tag)} className="remove-tag">&times;</button></li>
                )
            })
        ) : (
            <p>no tags yet</p>
        )
        return (
            <div>
                <h2>Edit Tags for {link.title} by {link.author}</h2>
                
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="tags">Enter your comma separated keywords:</label>
                    <input type="text" id="tags" name="keywords" placeholder="enter your tags here" className="field"/>
                    <input type="submit" value="Add"/>
                </form>
                <h3>Current tags:</h3>
                <ul>
                    {tagsList}
                </ul>
                   
                <button onClick={this.props.history.goBack} className="done-button">Done!</button>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.match.params.link_id;
    return {        
        link: state.appReducer.links.find(link => link.id === id)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTags: (id, tags) => dispatch(addTags(id, tags)),
        removeTag: (id, tag) => dispatch(removeTag(id, tag))
    }
}

// export default EditTags;
export default connect(mapStateToProps, mapDispatchToProps)(EditTags);