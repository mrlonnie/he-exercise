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
        }
        );
        setResults(result.data.items);
      }
      getRepositories()
   
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm, setResults]);


  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value)
  }


  const validateInputs = (e) => {
    setHasErrors(false);
    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validateInputs()) {
      return;
    }
    console.log('submitting');
    axios.get(API.searchRepositories,
      {
        params: {
          q: searchTerm
        }
      }
    ).then(resp => {
      console.log(resp)
      setResults(resp.data.items)
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
        errorMessages.map((error) => {
          return (
            <Box color="error.main" key={error}>{error}</Box>
          )
        })
      }
    </div>
    
  )
}

SearchForm.propTypes = {
  setResults: PropTypes.func.isRequired
}
export default SearchForm;