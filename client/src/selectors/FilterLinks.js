export default function filterLinks(links, filters) {
  console.log(filters);
    return links
      .filter(link => {
        switch (filters.media) {
          case "photo": {
            return link.id.startsWith("p");
          }
          case "video": {
            return link.id.startsWith("v");
          }
          default:
            return link;
        }
      })
      .filter(link => { // every filter tags must be present in link tags
        return filters.tags.length ? filters.tags.every(tag => {
          // at least one link tag includes the filter tag string
          return link.tags.some(linkTag => linkTag.includes(tag.trim()))
      }) 
        : link
    })
}
