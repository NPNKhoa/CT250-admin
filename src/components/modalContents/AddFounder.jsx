import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { toast } from 'react-toastify';

const AddFounder = ({ onSave, onCancel }) => {
  const allowedTypes = ['JPEG', 'PNG', 'JPG'];

  const [founderName, setFounderName] = useState('');

  const [imgReview, setImgReview] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleChangeFounderName = (e) => {
    setFounderName(e.target.value);
  };

  return (
    <div className="flex w-full flex-col items-center justify-start gap-8">
      <span className="italic text-zinc-700 opacity-70">
        &quot;Tải ảnh Founder lên bằng cách kéo thả và nhập tên họ vào khung bên
        dưới&quot;
      </span>

      <FileUploader
        multiple={false}
        handleChange={(file) => {
          setUploadedFile(file);
          const tempImgUrl = URL.createObjectURL(file);
          setImgReview(tempImgUrl);
          file && toast.success('Tải lên thành công');
        }}
        types={allowedTypes}
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          {imgReview ? (
            <img
              src={imgReview}
              className="mb-4 h-36 w-36 rounded-full border-4 border-solid border-primary p-1"
            ></img>
          ) : (
            <>
              <svg
                className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click vào để tải lên</span> hoặc
                kéo thả ảnh vào đây
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {allowedTypes.map((type) => `${type}, `)}
              </p>
            </>
          )}
        </div>
      </FileUploader>

      <TextField
        variant="outlined"
        label={'Tên Founder'}
        className="m-auto w-2/3"
        value={founderName}
        onChange={handleChangeFounderName}
      />

      <div className="flex h-4/5 w-full items-center justify-end gap-4">
        <Button onClick={() => onCancel()}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            onSave('founder', { founderName, founderAvatarPath: uploadedFile });
          }}
        >
          OK
        </Button>
      </div>
    </div>
  );
};

AddFounder.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AddFounder;
