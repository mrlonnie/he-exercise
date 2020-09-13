import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core'
import PropTypes from 'prop-types';

const ResultsTableHead = ({
  order,
  orderByProperty,
  handleTableHeadSort
}) => {

  const tableHeaderCells = [
    { id: 'id', label: 'ID' },
    { id: 'name', label: 'Repo Name' },
    { id: 'stargazers_count', label: 'Stars' },
    { id: 'score',  label: 'Score' },
    { id: 'language',  label: 'Language' },
    { id: 'full_name',  label: 'Link' },
  ];

  const createSortHandler = (property) => (e) => {
    handleTableHeadSort(e, property);
  };

  return (
    <TableHead>
        <TableRow>
          { tableHeaderCells.map((headerCell) => {
            return (
          <TableCell
            key={headerCell.id}
            sortDirection={orderByProperty === headerCell.id ? order : false}
          >
            <TableSortLabel
              active={orderByProperty === headerCell.id}
              direction={orderByProperty === headerCell.id ? order : 'asc'}
              onClick={createSortHandler(headerCell.id)}
            >
              {headerCell.label}
            </TableSortLabel>
          </TableCell>
            )
          })}
        </TableRow>
      </TableHead>
  );
}

ResultsTableHead.propTypes = {
  handleTableHeadSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderByProperty: PropTypes.string.isRequired,
};

export default ResultsTableHead;