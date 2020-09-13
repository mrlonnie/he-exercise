import React from 'react';
import {
  MenuItem,
  Select
} from '@material-ui/core'
import PropTypes from 'prop-types';

const LanguageFilter = ({
  languages,
  selectedLanguage
}) => {

  return (
    <Select
      labelId="Language Filter"
      id="language-filter"
      value={selectedLanguage}
      onChange={handleLanguageChange}
    >
      
    </Select>
  );
}

LanguageFilter.propTypes = {
  selectedLanguage: PropTypes.string,
  languages: PropTypes.array,
  handleLanguageChange: PropTypes.func.isRequired,
};

export default ResultsTableHead;