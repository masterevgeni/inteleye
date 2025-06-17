import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSongsList } from './../../hooks/useSongs';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  artist: string,
  title: number,
  playCount: number,
) {
  return { artist, title, playCount};
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0),
  createData('Ice cream sandwich', 237, 9.0),
  // createData('Eclair', 262, 16.0, 24, 6.0),
];
console.log('rows: ', rows);

export default function CustomizedTables() {

   const { data, isLoading, isError, error } = useSongsList();
    console.log('data: ', data);
    console.log('isLoading: ', isLoading);
    console.log('isError: ', isError);
    console.log('error: ', error);
  return (
    <TableContainer component={Paper as React.ElementType}>
      <Table  aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Band</StyledTableCell>
            <StyledTableCell align="right">Title</StyledTableCell>
            <StyledTableCell align="right">Play&nbsp;count</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((row:any) => {
            console.log('row: ', row);
            
            return (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.artist}
              </StyledTableCell>
              <StyledTableCell align="right">{row.title}</StyledTableCell>
              <StyledTableCell align="right">{row.playCount}</StyledTableCell>
            </StyledTableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
