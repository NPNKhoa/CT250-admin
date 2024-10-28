import PropTypes from 'prop-types';
import { Modal, Box, Typography, Button } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: '8px',
};

const ModalConfirmDelete = ({ open, handleClose, handleConfirm, itemName }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-delete-title"
      aria-describedby="modal-delete-description"
    >
      <Box sx={style}>
        <Typography id="modal-delete-title" variant="h6" component="h2">
          Xác nhận xóa
        </Typography>
        <Typography id="modal-delete-description" sx={{ mt: 2 }}>
          Bạn có chắc là muốn xóa <strong>{itemName}</strong> không? Sau khi
          xóa, bạn không thể khôi phục được nữa.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button variant="outlined" onClick={handleClose}>
            Hủy
          </Button>
          <Button variant="contained" color="error" onClick={handleConfirm}>
            Xóa
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

ModalConfirmDelete.propTypes = {
  open: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func,
  itemName: PropTypes.string,
};

export default ModalConfirmDelete;
