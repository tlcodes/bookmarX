import React from 'react';
import { connect } from 'react-redux';
import { setMediaFilter, setTagsFilter } from '../actions/PageActions';


const LinksFilters = (props) => {
    return (   
        <div className="links-filters">
            <div className="media-filter">
                <label htmlFor="all">
                    <input type="radio" name="media" id="all" onChange={(e) => props.setMediaFilter(e.target.id)} checked={props.filters.media === "all"}/>
                    All
                </label>
                <label htmlFor="photo">
                    <input type="radio" name="media" id="photo" onChange={(e) => props.setMediaFilter(e.target.id)} checked={props.filters.media === "photo"}/>
                    Photo
                </label>                
                <label htmlFor="video">
                    <input type="radio" name="media" id="video" onChange={(e) => props.setMediaFilter(e.target.id)} checked={props.filters.media === "video"}/>
                    Video
                </label>                
            </div>
            <div className="tags-filter">
                <label htmlFor="tagsFilter">Filter links by keywords:</label>
                <input type="text" onChange={(e) => props.setTagsFilter(e.target.value.split(','))} id="tagsFilter" placeholder="enter tags here" />
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        filters: state.appReducer.filters
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setMediaFilter: (mediaFilter) => dispatch(setMediaFilter(mediaFilter)),
        setTagsFilter: (tagsFilter) => dispatch(setTagsFilter(tagsFilter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LinksFilters);