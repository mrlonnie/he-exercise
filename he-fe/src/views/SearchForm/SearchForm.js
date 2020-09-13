import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
  Breadcrumbs,
  Button,
  Box,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import API from '../../data/api';

const useStyles = makeStyles((theme) => ({
  formItem: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

const SearchForm = ({
  setResults
}) => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState('tetris');
  const [errorMessages, setErrorMessages] = useState('');
  const [hasErrors, setHasErrors] = useState(false);


  useEffect(() => {
    try {
      async function getRepositories() {
        const result = await axios.get(API.searchRepositories,
        {
          params: {
            q: searchTerm
          }
        });
        setResults(result.data.items);
      }
      getRepositories()
   
    } catch (error) {
      setHasErrors(true)
      setErrorMessages('There was an error')
    }
  }, [setResults]);


  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(API.searchRepositories,
      {
        params: {
          q: searchTerm
        }
      }
    ).then(resp => {
      setResults(resp.data.items)
    }).catch(error => {
      setHasErrors(true)
      setErrorMessages(['Search criteria must be alphanumeric'])
    }); 
  }

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="textPrimary">Search Form</Typography>
      </Breadcrumbs>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          required
          className={classes.formItem}
          id="search-term"
          label="Search Term"
          value={searchTerm}
          onChange={handleSearchTermChange}/>
          <Button className={classes.formItem} type="submit" variant="contained" color="primary">Submit</Button>
      </form>
      { hasErrors && 
        <Box color="error.main" >{errorMessages}</Box>
      }
    </div>
    
  )
}

SearchForm.propTypes = {
  setResults: PropTypes.func.isRequired
}
export default SearchForm;