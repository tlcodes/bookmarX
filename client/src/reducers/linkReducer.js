const initLinkState = {
    status: ''
}

const linkReducer = (state = initLinkState, action) => {
    switch (action.type) {              
        case 'CHANGE_STATUS': {
            let newStatus = action.status;
            return {
                ...state,
                status: newStatus
            }
        }        
        case 'REQUEST_START': {
            let newStatus = 'Getting link infos...';
            return {
                ...state,
                status: newStatus
            }
        }        
        case 'REQUEST_SUCCESS': {
            let newStatus = 'SUCCESS!';
            return {
                ...state,
                status: newStatus,
            }
        }        
        case 'REQUEST_ERROR': {
            let newStatus = action.error;
            return {
                ...state,
                status: newStatus
            }
        }        
        default: return state;
    }
}

export default linkReducer;