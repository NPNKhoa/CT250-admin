import PropTypes from 'prop-types';

import { Button, Divider, Modal, Paper, Typography } from '@mui/material';

const ActionModal = ({ title, children, open, onClose, onSave, onCancel }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        elevation={3}
        sx={{
          p: '1.5rem 2rem',
          width: '50%',
          minHeight: '50%',
          margin: 'auto',
        }}
        className="translate-y-1/3"
      >
        <div className="flex h-full flex-col items-center justify-between gap-4">
          <Typography
            variant="h4"
            className="font-bold uppercase text-primary"
            align={'center'}
            gutterBottom
          >
            {title}
          </Typography>
          <Divider />
          {children}
          <div className="flex w-full items-center justify-end gap-4">
            <Button variant="contained" onClick={onSave}>
              OK
            </Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
        </div>
      </Paper>
    </Modal>
  );
};

ActionModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ActionModal;
