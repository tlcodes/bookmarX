export const startFrom = startLink => {
    return {
      type: "START_FROM",
      startLink
    };
  };

export const setMediaFilter = (mediaFilter) => {
  return {
    type: 'SET_MEDIA_FILTER',
    mediaFilter,
  }
}
export const setTagsFilter = (tagsFilter) => {
  return {
    type: 'SET_TAGS_FILTER',
    tagsFilter
  }
}