import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'
import Main from './components/Main';
import AddLink from './components/AddLink';
import EditTags from './components/EditTags';
import './App.css';

class App extends Component {

  handleAddLink() {
    console.log('add link component/form');
  }

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <header><h1>BookmarX</h1></header>          
          <Switch>
            <Route exact path='/' component={Main}/>
            <Route path='/addlink' component={AddLink} />
            <Route path='/:link_id' component={EditTags} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
