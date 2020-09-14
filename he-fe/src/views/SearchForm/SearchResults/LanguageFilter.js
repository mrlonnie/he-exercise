import React from 'react';
import {
  Button,
  Card,
  MenuItem,
  Select,
  makeStyles,
} from '@material-ui/core'
import PropTypes from 'prop-types';


const LanguageFilter = ({
  results,
  filterByLanguage,
  handleFilterLanguage,
  handleClearFilter
}) => {
  
  const classes = useStyles();

  //Create new Set of available languages
  const languages = [...new Set(results.map(row => row.language))]

  const handleLanguageChange = (language) => (e) => {
    handleFilterLanguage(e, language);
  };

  return (
    <Card className={classes.card}>
      <span>Language Filter: </span>
      <Select
        labelId="Language Filter"
        id="language-filter"
        value={filterByLanguage}
        onChange={handleLanguageChange}
      >
        {!!languages.length && languages.map((language) => {
              return (
              <MenuItem
                key={language}
                value={language}
                onClick={handleLanguageChange(language)}
              >
                {language}
              </MenuItem>
              )
            })}
        
      </Select>
      {
        !!filterByLanguage &&
        <Button
          className={classes.clear}
          variant="contained"
          color="secondary"
          onClick={handleClearFilter}
        >
          Clear Filter
        </Button>
      }
    </Card>
  );
}

LanguageFilter.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    language: PropTypes.string.isRequired,
  })),
  filterByLanguage: PropTypes.string,
  handleFilterLanguage: PropTypes.func.isRequired,
  handleClearFilter: PropTypes.func.isRequired,
};

const useStyles = makeStyles({
  card: {
    padding: '1rem',
  },
  clear: {
    margin: '0 0 0 1rem'
  }
});


export default LanguageFilter;