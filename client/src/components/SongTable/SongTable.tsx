import { styled } from '@mui/material/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, CircularProgress, Alert} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import { useSongsList } from './../../hooks/useSongs';
import {SongRowProps as SongRow} from './../../types/index';

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
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const ScrollableTableContainer = styled(TableContainer)({
  maxHeight: 400,
  overflowY: 'auto',
});


export default function MusicTable() {
  const { data, isLoading, isError, error } = useSongsList();

   if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box p={3}>
        <Alert severity="error">
          Failed to load dashboard data: {error.message}
        </Alert>
      </Box>
    );
  }

  return (
    <ScrollableTableContainer>
      <Paper>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Band</StyledTableCell>
              <StyledTableCell align="right">Title</StyledTableCell>
              <StyledTableCell align="right">Play&nbsp;count</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data && data.map((row:SongRow) => {
              return (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row">
                    {row.artist}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.title}</StyledTableCell>
                  <StyledTableCell align="right">{row.playCount}</StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
    </ScrollableTableContainer>
  );
}
