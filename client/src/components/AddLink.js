import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLink, changeStatus, fetchPhotoInfos, fetchVideoInfos } from '../actions/LinkActions'

class AddLink extends Component {

    constructor(props) {
        super(props);        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateLink = this.validateLink.bind(this);
        this.goHome = this.goHome.bind(this);
    }

    validateLink(url) {
        // check if link already exists, is from flickr or vimeo
        if (this.props.links.find(link => {
            return link.url === url
        })) {
            this.props.changeStatus('Link already exists!');
            return 'exist';
        } 
        if (url.includes('https://www.flickr.com/') && /\d{7,}/g.test(url)) {
            this.props.changeStatus('Looks valid!');
            return 'photo';
        } else if (url.includes('https://vimeo.com/') && /\d{7,}/g.test(url)) {
            this.props.changeStatus('Looks valid!');
            return 'video';
        } else {            
            return false;
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let url = e.target.url.value.trim();
        e.target.url.value = '';
        this.props.changeStatus('Validating link...');
        if (this.validateLink(url) === 'exist') {
            return;
        }
        // if link is valid, fetch infos
        else if (this.validateLink(url) === 'photo') {
            this.props.fetchPhotoInfos(url.match(/\d{7,}/g)[url.match(/\d{7,}/g).length-1])
        } else if (this.validateLink(url) === 'video') {
            this.props.fetchVideoInfos(url.match(/\d{7,}/g)[url.match(/\d{7,}/g).length-1])
        } else {
            this.props.changeStatus('Invalid or incomplete link... or I screwed up somewhere.');
            setTimeout(() => this.goHome(), 2000);
            return;
        }        
    }

    componentDidUpdate() {
        if (this.props.status === 'SUCCESS!') {
            setTimeout(() => this.goHome(), 1000);            
        }
    }

    goHome() {
        this.props.changeStatus('');
        this.props.history.push('/');
    }
    render() {        
        return (
            <div className="add-link">
                <h2>Add a Link</h2>
                <form onSubmit={this.handleSubmit}>                    
                    <label htmlFor="media-link">Paste your Flickr or Vimeo link here.</label>
                    <input type="text" id="media-link" name="url" placeholder="paste your link here" className="field"/><input type="submit" value='Add!' />
                    <p><strong>{this.props.status}</strong></p>
                    <p>flickr example: <span>https://www.flickr.com/photos/cubagallery/8991328288/</span></p>
                    <p>vimeo example: <span>https://vimeo.com/225953281</span></p>
                </form>
                <button onClick={this.goHome} className="cancel">Cancel</button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {    
        status: state.linkReducer.status,
        links: state.appReducer.links
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addLink: (link) => dispatch(addLink(link)),
        changeStatus: (status) => dispatch(changeStatus(status)),
        fetchPhotoInfos: (mediaId) => dispatch(fetchPhotoInfos(mediaId)),
        fetchVideoInfos: (mediaId) => dispatch(fetchVideoInfos(mediaId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddLink);