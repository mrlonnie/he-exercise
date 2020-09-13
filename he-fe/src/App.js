import React, { useState } from 'react';
import {
  Container,
} from '@material-ui/core'
import SearchForm from './views/SearchForm/SearchForm'
import SearchResults from './views/SearchForm/SearchResults/SearchResults'
import RepoDetails from './views/RepoDetails/RepoDetails'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  const [results, setResults] = useState([]);

  return (
    <Router>
      <Switch>
          <Route exact path="/">
              <Container className="App">
                <SearchForm setResults={setResults}></SearchForm>
                <SearchResults results={results}></SearchResults>
              </Container>
          </Route>
          <Route path="/:owner/:repo" children={<RepoDetails />} />

        </Switch>
    </Router>
  );
}

export default App;
