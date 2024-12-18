import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Toolbar,
  TextField,
  IconButton,
  Tooltip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const DataTable = ({
  title,
  columns,
  data,
  sortable = false,
  filterable = false,
  actions = { delete: false, view: false },
  pagination = { rowsPerPageOptions: [5, 10, 25], defaultRowsPerPage: 5 },
  showIndex = false,
  onDelete,
  onView,
}) => {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('');
  const [filter, setFilter] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(pagination.defaultRowsPerPage);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = Array.isArray(data)
    ? data.filter((row) =>
        Object.values(row).some((value) =>
          String(value).toLowerCase().includes(filter.toLowerCase()),
        ),
      )
    : [];

  const sortedData = filteredData.sort((a, b) => {
    if (orderBy) {
      if (a[orderBy] < b[orderBy]) {
        return order === 'asc' ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === 'asc' ? 1 : -1;
      }
    }
    return 0;
  });

  const paginatedData = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage,
  );

  return (
    <Paper elevation={3} className="rounded-xl">
      <Toolbar className="py-1">
        <h3 id="tableTitle" className="text-xl font-bold uppercase text-black">
          {title}
        </h3>
        {filterable && (
          <TextField
            variant="outlined"
            margin="normal"
            placeholder={'Lọc...'}
            onChange={handleFilterChange}
            value={filter}
            style={{ marginLeft: 'auto' }}
            size="small"
          />
        )}
      </Toolbar>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="bg-white">
              {showIndex && (
                <TableCell align="center">
                  <span className="text-base font-semibold text-black">#</span>
                </TableCell>
              )}
              {columns.map((column) => (
                <TableCell
                  align={column.type === 'text' ? 'left' : 'center'}
                  key={column.id}
                  className="text-nowrap"
                >
                  {sortable ? (
                    <TableSortLabel
                      active={orderBy === column.id}
                      direction={orderBy === column.id ? order : 'asc'}
                      sx={{
                        color: 'white',
                      }}
                      onClick={() => handleRequestSort(column.id)}
                    >
                      <span className="text-base font-semibold text-black">
                        {column.label}
                      </span>
                    </TableSortLabel>
                  ) : (
                    <span className="text-base font-semibold text-black">
                      {column.label}
                    </span>
                  )}
                </TableCell>
              ))}
              {Object.values(actions).some((value) => value) && (
                <TableCell align="center" className="text-nowrap">
                  <span className="text-base font-semibold text-black">
                    Thao tác
                  </span>
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {showIndex && (
                    <TableCell>{page * rowsPerPage + rowIndex + 1}</TableCell>
                  )}
                  {columns.map((column) => (
                    <TableCell
                      align={column.type === 'text' ? 'left' : 'center'}
                      key={column.id}
                    >
                      {column.type === 'boolean' ? (
                        row[column.id] ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CancelIcon color="error" />
                        )
                      ) : column.type === 'image' ? (
                        <img
                          src={`${
                            import.meta.env.VITE_IMG_URL + row[column.id]
                          }`}
                          alt={column.label}
                          style={{ width: '50px' }}
                        />
                      ) : (
                        row[column.id]
                      )}
                    </TableCell>
                  ))}
                  {Object.values(actions).some((value) => value) && (
                    <TableCell align="center" className="text-nowrap">
                      {actions.view && onView && (
                        <Tooltip title={'Xem'}>
                          <IconButton onClick={() => onView(row)}>
                            <VisibilityIcon color="info" />
                          </IconButton>
                        </Tooltip>
                      )}
                      {actions.delete && onDelete && (
                        <Tooltip title={'Xóa'}>
                          <IconButton onClick={() => onDelete(row)}>
                            <DeleteIcon color="error" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={
                    columns.length +
                    (showIndex ? 1 : 0) +
                    (Object.values(actions).some((value) => value) ? 1 : 0)
                  }
                  align="center"
                >
                  <span className="text-xl font-semibold">
                    {'Không có dữ liệu'}
                  </span>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={pagination.rowsPerPageOptions}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

DataTable.propTypes = {
  title: PropTypes.string,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string,
    }),
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  sortable: PropTypes.bool,
  filterable: PropTypes.bool,
  actions: PropTypes.shape({
    delete: PropTypes.bool,
    view: PropTypes.bool,
  }),
  pagination: PropTypes.shape({
    rowsPerPageOptions: PropTypes.arrayOf(PropTypes.number),
    defaultRowsPerPage: PropTypes.number,
  }),
  showIndex: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

export default DataTable;
