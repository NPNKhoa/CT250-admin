import { Button, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const ChangeBanners = ({ onChange, onSave, onCancel }) => {
  const allowedTypes = ['JPEG', 'PNG', 'JPG'];

  const [imgReview, setImgReview] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);

  const banners = useSelector(
    (state) => state.systemConfigs.currentConfigs.bannerImgPath,
  );

  console.log(banners);

  const handleDeleteBanner = (index) => {
    console.log(`delete ${index}`);
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="no-scrollbar flex h-[50vh] w-full flex-col gap-4 overflow-y-auto">
        <Typography
          variant="h5"
          className="w-full font-semibold text-primary"
          gutterBottom
        >
          Banner hiện tại
        </Typography>

        <div className="flex flex-wrap items-center justify-evenly gap-2">
          {banners.map((banner, index) => (
            <div key={`${banner}-index`} className="relative w-1/3">
              <img
                src={`http://localhost:5000/${banner}`}
                alt={'banner' + index}
                className="w-full"
              />
              <IconButton
                onClick={() => handleDeleteBanner(index)}
                sx={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: 'red',
                  '&:hover': {
                    backgroundColor: 'darkred',
                    color: 'white',
                  },
                }}
                size="medium"
              >
                <DeleteIcon fontSize="medium" />
              </IconButton>
            </div>
          ))}
        </div>

        <Typography
          variant="h5"
          className="block w-full font-semibold text-primary"
          gutterBottom
        >
          Thêm mới banner
        </Typography>

        <FileUploader
          multiple={true}
          handleChange={(file) => {
            setUploadedFile(file);
            const tempImgUrl = URL.createObjectURL(file);
            setImgReview(tempImgUrl);
            onChange('logo', tempImgUrl);
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
                  <span className="font-semibold">Click vào để tải lên</span>{' '}
                  hoặc kéo thả ảnh vào đây
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {allowedTypes.map((type) => `${type}, `)}
                </p>
              </>
            )}
          </div>
        </FileUploader>
      </div>

      <div className="flex w-full items-center justify-end gap-4 pt-2">
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

ChangeBanners.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ChangeBanners;
