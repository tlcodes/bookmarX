export const removeLink = id => {
  return {
    type: "REMOVE_LINK",
    id
  };
};

export const addLink = link => {
  return {
    type: "ADD_LINK",
    link
  };
};

export const changeStatus = status => {
  return {
    type: "CHANGE_STATUS",
    status
  };
};

export const requestStart = () => {
  return {
    type: "REQUEST_START"
  };
};

export const requestError = error => {
  return {
    type: "REQUEST_ERROR",
    error
  };
};

export const requestSuccess = () => {
  return {
    type: "REQUEST_SUCCESS",
  };
};
export const addTags = (id, tags) => {
  return {
    type: "ADD_TAGS",
    id,
    tags
  };
};
export const removeTag = (id, tag) => {
  return {
    type: "REMOVE_TAG",
    id,
    tag
  };
};

export function fetchPhotoInfos(photoId) {
  return (dispatch) => {
    async function fetchFlickr() {
      dispatch(requestStart());
      try {
        const photoInfos = await fetch(`/api/photo/${photoId}`)
        const link = await photoInfos.json();
        dispatch(requestSuccess());
        dispatch(addLink(link));
      } catch (error) {
        console.log(error);
        dispatch(requestError(error));
      }
    }
    fetchFlickr();
  }
}

export function fetchVideoInfos(videoId) {
  return (dispatch) => {
    async function fetchVimeo() {
      dispatch(requestStart());
      try {
        const videoInfos = await fetch(`/api/video/${videoId}`)
        const link = await videoInfos.json();
        dispatch(requestSuccess());
        dispatch(addLink(link));
      } catch (error) {
        console.log(error);
        dispatch(requestError(error));
      }
    }
    fetchVimeo();
  }
}