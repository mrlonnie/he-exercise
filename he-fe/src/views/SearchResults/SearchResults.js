import React, {useState} from 'react';
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Link
} from '@material-ui/core'
import PropTypes from 'prop-types';
import ResultsTableHead from './ResultsTableHead'
const SearchResults = ({
  results

}) => {
  const [orderByProperty, setOrderByProperty] = useState('id');
  const [order, setOrder] = useState('asc');
  const [filterLanguage, setFilterLanguage] = useState('');
  const [languages, setLanguages] = useState('');

/**
  * handleSort
  @param e event
  @param property table header property
 */
  const handleTableHeadSort = (e, property) => {
    const isAsc = orderByProperty === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderByProperty(property);
  };
  
/**
  * sortThings
  @param results [Items to be sorted]
  @param comparator Function to determine which direction to sort
 */
  const sortThings = (results, comparator) => {
    const items = results.map((e, index) => [e, index]);
    items.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return items.map((el) => el[0]);
  }

/**
  * getComparions
  * @param order direction to sort ['asc', 'desc']
  * @param orderByProperty property to sort by
 */
  const getComparisons = (order, orderByProperty) => {
    return order === "desc"
      ? (a, b) => compareThings(a, b, orderByProperty)
      : (a, b) => -compareThings(a, b, orderByProperty);
  }

/**
  * compareThings
  @param a item to compare
  @param b item to compare
  @param orderByProperty property to sort by
 */
  const compareThings = (a, b, orderByProperty) => {
    // Normalize Strings to lowercase so it doesnt separate capitalized and non-capitalized 
    let itemA = typeof a[orderByProperty] == 'string'
      ? a[orderByProperty].toLowerCase() : a[orderByProperty];
    let itemB = typeof b[orderByProperty] == 'string'
      ? b[orderByProperty].toLowerCase() : b[orderByProperty];

    if (itemB < itemA) {
      return -1;
    }
    if (itemB > itemA) {
      return 1;
    }
    return 0;
  }


  return (
    <div>
      { !!results.length &&
      <div>
        filter here
      </div>  
      }  
      <Table>
      <ResultsTableHead
        order={order}
        orderByProperty={orderByProperty}
        handleTableHeadSort={handleTableHeadSort}
      />
      <TableBody>   
        { !!results.length ?
          sortThings(results, getComparisons(order, orderByProperty))
          .map((row, index) => {
            return (
            <TableRow key={`${row.id}`}>
              <TableCell>{row.id} </TableCell>
              <TableCell>{row.name} </TableCell>
              <TableCell>{row.stargazers_count} </TableCell>
              <TableCell>{row.score}</TableCell>
              <TableCell>{row.language} </TableCell>
              <TableCell><Link>{`http://www.github.com/${row.full_name}`}</Link> </TableCell>
            </TableRow>
            )
          }) 
          : <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>No Results</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
        }
      </TableBody>
    </Table>
    </div>
  )
}

SearchResults.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string
    }),
    language: PropTypes.string,
    full_name: PropTypes.string
  })).isRequired,
}
export default SearchResults;