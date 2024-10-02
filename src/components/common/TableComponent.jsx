import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';

const TableComponent = ({
  loading,
  rows,
  columns,
  paginationModel,
  handleSelected,
}) => {
  return (
    <Box sx={{ height: 450, width: '100%', overflowX: 'auto' }}>
      <DataGrid
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: 'linear-progress',
            noRowsVariant: 'linear-progress',
          },
        }}
        slots={{ toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        rowSelectionModel={loading ? [] : undefined}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          handleSelected(newRowSelectionModel);
        }}
        sx={{
          border: 0,
          minWidth: 600,
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-cell': {
            fontSize: '16px',
            whiteSpace: 'normal',
            lineHeight: '1.5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          '& .MuiDataGrid-columnHeaders': {
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
              fontSize: '16px',
            },
          },
        }}
        disableColumnMenu
        disableDensitySelector
        autoHeight
        getRowHeight={() => 'auto'}
      />
    </Box>
  );
};

TableComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  paginationModel: PropTypes.object.isRequired,
  handleSelected: PropTypes.func.isRequired,
};

export default TableComponent;
