import PropTypes from 'prop-types';

import { Modal, Paper, Typography } from '@mui/material';

const ActionModal = ({ title, children, open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Paper
        elevation={3}
        sx={{
          p: '1.5rem 2rem',
          minWidth: '35%',
          maxWidth: '80%',
          minHeight: '30%',
          maxHeight: '80%',
          margin: 'auto',
        }}
        className="translate-y-[15%]"
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
