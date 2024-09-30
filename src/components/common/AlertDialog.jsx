import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ open, onClose, title, actions }) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="alert-dialog-title">
      <DialogTitle id="alert-dialog-title">
        <div className="text-base font-semibold">{title}</div>
      </DialogTitle>
      <DialogActions>{actions}</DialogActions>
    </Dialog>
  );
}

AlertDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  actions: PropTypes.node.isRequired,
};
