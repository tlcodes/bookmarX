import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import LinkItem from './LinkItem';
import LinksFilter from './LinksFilters';
import { startFrom } from '../actions/PageActions';
import filterLinks from '../selectors/FilterLinks';
// import { filterMedia, filterTags } from '../selectors/FilterLinks'


class Main extends Component {

  componentDidUpdate() {
    if (this.props.links.length === this.props.startLink && this.props.links.length) {
      this.props.startFrom(this.props.startLink - this.props.linksPerPage)
    }
  }

  handleNext(current, total) {
    current === total 
      ? this.props.startFrom(0) 
      : this.props.startFrom(this.props.startLink + this.props.linksPerPage)
  }
  handlePrev(total) {
    this.props.startLink === 0
      ? this.props.startFrom(--total * this.props.linksPerPage)
      : this.props.startFrom(this.props.startLink - this.props.linksPerPage)
  }
  render() {
    const { links, linksPerPage, startLink } = this.props;
    // set constants to display links and pagination properly
    const endLink = startLink + linksPerPage;
    const totalPages = links.length ? Math.ceil(links.length / linksPerPage) : 1;
    const currentPage = endLink / linksPerPage;    
    // display links only if they exist
    const linkList = links.length ? (
      links.slice(startLink, startLink+linksPerPage).map(link => {
        return (
          <LinkItem key={link.id} id={link.id}/>
        )
      })
    ) : (      
      <div>No link yet. Click the + button to add your links!</div>      
    )
    const paginate = links.length ? (
      (
        <div className="paginate">
          <button onClick={() => this.handlePrev(totalPages)}>&lt;</button> {currentPage}  / {totalPages} <button onClick={() => this.handleNext(currentPage, totalPages)}>&gt;</button>
        </div>      
      )
    ) : (
      <p></p>
    )
    return (
      <div className="App">
        <Link to={'/addlink'}>Add Link</Link>
        <LinksFilter />
        {linkList}
        {paginate}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    links: filterLinks(state.appReducer.links, state.appReducer.filters),
    linksPerPage: state.appReducer.linksPerPage,
    startLink: state.appReducer.startLink
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    startFrom: page => dispatch(startFrom(page)),    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);
