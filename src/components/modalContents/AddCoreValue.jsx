import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';

const AddCoreValue = ({ onSave, onCancel }) => {
  const [coreValue, setCoreValue] = useState({
    title: '',
    content: '',
  });

  const handleChangeCoreValue = (e) => {
    const { name, value } = e.target;

    setCoreValue((prevPrice) => ({
      ...prevPrice,
      [name]: value,
    }));
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-8">
      <span className="italic text-zinc-700 opacity-70">
        &quot;Nhập vào tiêu đề là giá trị cốt lõi của cửa hàng và mô tả cho
        chính giá trị cốt lỗi ấy ngay bên dưới&quot;
      </span>
      <TextField
        variant="outlined"
        label={'Tiêu đề'}
        className="m-auto w-2/3"
        name="title"
        value={coreValue.title}
        onChange={handleChangeCoreValue}
      />

      <TextField
        variant="outlined"
        label={'Mô tả'}
        className="m-auto w-2/3"
        name="content"
        value={coreValue.content}
        onChange={handleChangeCoreValue}
      />

      <div className="flex h-4/5 w-full items-center justify-end gap-4">
        <Button onClick={() => onCancel()}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            onSave('coreValue', coreValue);
          }}
        >
          OK
        </Button>
      </div>
    </div>
  );
};

AddCoreValue.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddCoreValue;
