import { Box, Button } from '@mui/material';
import * as XLSX from 'xlsx';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import { viVN } from '@mui/x-data-grid/locales';

const TableComponent = ({
  loading,
  rows,
  columns,
  paginationModel,
  checkbox = true,
  handleSelected = () => {},
}) => {

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    
    XLSX.writeFile(workbook, "data.xlsx");
  };

  const customLocaleText = {
    ...viVN.components.MuiDataGrid.defaultProps.localeText,
    // filterOperatorDoesNotContain: 'Không chứa',
    // filterOperatorDoesNotEqual: 'Không bằng',
  };

  return (
    <Box sx={{ height: 500, width: '100%', overflowX: 'auto' }}>
      {/* <Button
        variant="contained"
        color="primary"
        onClick={handleExportExcel}
        style={{ marginTop: 10 }}
      >
        Xuất Excel
      </Button> */}
      <DataGrid
        localeText={customLocaleText}
        loading={loading}
        slotProps={{
          loadingOverlay: {
            variant: 'skeleton',
            noRowsVariant: 'skeleton',
          },
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: {
              sx: {
                backgroundColor: 'white',
                borderRadius: 3,
                padding: '4px 12px',
                // border: '1px solid #d1d5db',
                // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                '& input': {
                  color: 'black',
                  padding: '8px',
                },
              },
            },
          },
        }}
        slots={{ toolbar: GridToolbar }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: { paginationModel },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={checkbox}
        rowSelectionModel={loading ? [] : undefined}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          handleSelected(newRowSelectionModel);
        }}
        sx={{
          border: 0,
          // minWidth: 600,
          '& .MuiDataGrid-cell:focus': {
            outline: 'none',
          },
          '& .MuiDataGrid-cell': {
            fontSize: '16px',
            whiteSpace: 'normal',
            lineHeight: '1.5',
            display: 'flex',
            alignItems: 'center',
          },
          '& .MuiDataGrid-columnHeaders': {
            '& .MuiDataGrid-columnHeaderTitle': {
              fontWeight: 'bold',
              fontSize: '16px',
            },
          },
          '& .even': {
            backgroundColor: '#eef2fd', // Màu nền cho dòng chẵn
          },
          '& .odd': {
            backgroundColor: '#ffffff', // Màu nền cho dòng lẻ
          },
        }}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
        disableColumnMenu
        disableDensitySelector
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
  handleSelected: PropTypes.func,
  checkbox: PropTypes.bool,
};

export default TableComponent;