import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeLink } from '../actions/LinkActions';

class LinkItem extends Component {
    render() {
        const { link, removeLink } = this.props;  
        const duration = link.duration ? (
            <li><strong>video:</strong> {link.duration}</li>
        ) : (
            <li><strong>photo</strong></li>
        )        
        return (            
            <div className="link-item">
                <h3>{link.title}</h3>
                <p><strong>url:</strong> {link.url}</p>
                <ul>
                    <li><strong>author name:</strong> {link.author}</li>
                    <li><strong>added date:</strong> {link.date}</li>
                    <li><strong>width:</strong> {link.width}</li>
                    <li><strong>height:</strong> {link.height}</li>
                    {duration}
                </ul>
                <p>keywords: {link.tags.length ? link.tags.join(', ') : 'no tags yet!'}</p>
                <button onClick={() => removeLink(link.id)} className="remove-link">remove</button>
                <button onClick={() => this.props.history.push('/' + link.id)} className="edit-button">edit tags</button>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.id;
    return {
        link: state.appReducer.links.find(link => link.id === id)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeLink: (id) => dispatch(removeLink(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LinkItem));