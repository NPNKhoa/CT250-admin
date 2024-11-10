import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addBanner } from '../../redux/thunk/systemConfigThunk';

const AddBanner = ({ onCancel }) => {
  const dispatch = useDispatch();
  const allowedTypes = ['JPEG', 'PNG', 'JPG', 'WEBP'];

  const [uploadedFiles, setUploadedFiles] = useState([]);

  const onSave = () => {
    if (uploadedFiles.length > 0) {
      dispatch(addBanner(uploadedFiles));
    } else {
      toast.error('Vui lòng tải lên ít nhất một ảnh');
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <FileUploader
        multiple={true}
        handleChange={(files) => {
          const newFiles = Array.from(files);
          setUploadedFiles(newFiles);
          newFiles.forEach((file) => {
            toast.success(`Tải lên thành công: ${file?.name}`);
          });
        }}
        types={allowedTypes}
      >
        <div className="flex flex-col items-center justify-center pb-6 pt-5">
          {uploadedFiles.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {uploadedFiles.map((file, index) => {
                const imgUrl = URL.createObjectURL(file);
                return (
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`uploaded-img-${index}`}
                    className="w-48 rounded-md border-2 border-solid border-primary p-1"
                  />
                );
              })}
            </div>
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
                {allowedTypes.join(', ')}
              </p>
            </>
          )}
        </div>
      </FileUploader>

      <div className="flex h-4/5 w-full items-center justify-end gap-4">
        <Button onClick={onCancel}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => {
            onSave();
            onCancel('');
          }}
        >
          OK
        </Button>
      </div>
    </div>
  );
};

AddBanner.propTypes = {
  onCancel: PropTypes.func.isRequired,
};

export default AddBanner;
