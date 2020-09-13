import React, { useState } from 'react';
import {
  Container,
} from '@material-ui/core'
import SearchForm from './views/SearchForm'
import SearchResults from './views/SearchResults/SearchResults'

function App() {
  const [results, setResults] = useState([]);

  return (
    <Container className="App">
      <SearchForm setResults={setResults}></SearchForm>
      <SearchResults results={results}></SearchResults>
    </Container>
  );
}

export default App;
