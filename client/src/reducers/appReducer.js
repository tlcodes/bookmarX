const initialState = {
    links: [
        {id: 'v1', title: 'example 1', url: 'http://www.example1.com', author: 'You', date:'Mar 12 2015', width: 640, height: 480, duration: '00:00:15', tags: ['hola']},
        {id: 'p2', title: 'example 2', url: 'http://www.example2.com', author: 'Me', date:'Aug 06 2017', width: 1200, height: 750, tags: ['hey']},        
        {id: 'p3', title: 'example 3', url: 'http://www.example3.com', author: 'Someone Else', date:'Sep 05 2012', width: 2048, height: 1024, tags: ['hi']},
    ],
    linksPerPage: 2,
    startLink: 0,
    filters: {media: 'all', tags: []}
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {        
        case 'REMOVE_LINK': {
            let newLinks = state.links.filter(link => {
                return link.id !== action.id;
            });
            return {
                ...state,
                links: newLinks
            }
        }
        case 'ADD_LINK': {            
            let newLinks = [action.link, ...state.links];
            return {
                ...state,
                links: newLinks
            }
        }
        case 'ADD_TAGS': {
            let newLinks = state.links.map(link => {
                if (link.id === action.id) {
                    return {
                        ...link,
                        tags: [...link.tags, ...action.tags]
                    }                    
                } else {
                    return link;
                }
            })
            return {
                ...state,
                links: newLinks
            }
        }
        case 'REMOVE_TAG': {
            let newLinks = state.links.map(link => {
                if (link.id === action.id) {
                    return {
                        ...link,
                        tags: link.tags.filter(tag => {
                            return tag !== action.tag;
                        })
                    }
                } else {
                    return link;
                }
            })
            return {
                ...state,
                links: newLinks
            }
        }
        case 'START_FROM': {
            let newStart = action.startLink;
            return {
                ...state,
                startLink: newStart
            }
        }
        case 'SET_MEDIA_FILTER': {
            let newFilters = {media: action.mediaFilter, tags: state.filters.tags};
            return {
                ...state,
                filters: newFilters                
            }
        }
        case 'SET_TAGS_FILTER': {
            let newFilters = {media: state.filters.media, tags: action.tagsFilter[0] === "" ? [] : action.tagsFilter};
            return {
                ...state,
                filters: newFilters                
            }
        }
        default: return state;
    }
}

export default appReducer;