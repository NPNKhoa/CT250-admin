import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { toast } from 'react-toastify';

const ChangeLogo = ({ onChange, onSave, onCancel }) => {
  const allowedTypes = ['JPEG', 'PNG', 'JPG'];

  const [imgReview, setImgReview] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <FileUploader
        multiple={false}
        handleChange={(file) => {
          setUploadedFile(file);
          const tempImgUrl = URL.createObjectURL(file);
          setImgReview(tempImgUrl);
          onChange('shopLogoImgPath', tempImgUrl);
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
      <div className="flex h-4/5 w-full items-center justify-end gap-4">
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => onSave('shopLogoImgPath', uploadedFile)}
        >
          OK
        </Button>
      </div>
    </div>
  );
};

ChangeLogo.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ChangeLogo;
