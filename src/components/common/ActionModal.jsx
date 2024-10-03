import PropTypes from 'prop-types';

import { Modal, Paper, Typography } from '@mui/material';

const ActionModal = ({ title, children, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        elevation={3}
        sx={{
          p: '1.5rem 2rem',
          width: '35%',
          margin: 'auto',
        }}
        className="translate-y-1/3"
      >
        <div className="flex h-full w-full flex-col items-center justify-between gap-4">
          <Typography
            variant="h4"
            className="font-bold uppercase text-primary"
            align={'center'}
            gutterBottom
          >
            {title}
          </Typography>
          {children}
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
};

export default ActionModal;
