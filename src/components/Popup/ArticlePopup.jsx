import { useState, useEffect, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box, Chip } from '@mui/material';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { createArticle, updateArticle } from '../../redux/thunk/articleThunk';
import JoditEditor from 'jodit-react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import productsService from '../../services/products.service';

const ArticlePopup = ({ isOpen, onClose, data }) => {
  const dispatch = useDispatch();
  const initialArticle = useMemo(
    () => ({
      _id: data?.[0]?._id || '',
      title: data?.[0]?.title || '',
      thumbnail: data?.[0]?.thumbnail || '',
      type: data?.[0]?.type || '',
      content: data?.[0]?.content || '',
    }),
    [data],
  );

  const editor = useRef(null);

  const [article, setArticle] = useState(initialArticle);
  const [newFiles, setNewFiles] = useState([]);

  useEffect(() => {
    setArticle(initialArticle);
  }, [initialArticle]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    setArticle((prevArticle) => ({
      ...prevArticle,
      thumbnail: URL.createObjectURL(file),
    }));

    setNewFiles([file]);
    e.target.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updatedArticle = article;

    if (newFiles && newFiles.length > 0) {
      const uploadedImageUrls = await productsService.uploadImage(newFiles);

      updatedArticle = {
        ...article,
        thumbnail: uploadedImageUrls[0],
      };
    }

    try {
      if (data && data.length > 0) {
        await dispatch(updateArticle(updatedArticle)).unwrap();
        toast.success('Cập nhật thành công!');
      } else {
        await dispatch(createArticle(updatedArticle)).unwrap();
        toast.success('Thêm thành công!');
      }
    } catch (err) {
      if (err === 'Article is already exist!') {
        toast.error('Bài viết đã tồn tại!');
      } else {
        toast.error('Có lỗi xảy ra!');
      }
    }

    setNewFiles([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={onClose}
      ></div>
      <Box
        className="z-10 w-[70%] overflow-auto rounded-lg bg-white p-4 shadow-lg"
        sx={{ maxHeight: '95vh' }}
      >
        <h1 className="mb-2 text-center text-2xl font-bold">
          {data && data.length > 0 ? 'Cập nhật bài viết' : 'Thêm bài viết mới'}
        </h1>
        <form onSubmit={handleSubmit}>
          <Box className="flex space-x-4">
            <Box className="flex space-x-4">
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                className='h-10'
              >
                Thêm thumbnail
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
              </Button>
              <Box className="mt-3 flex flex-wrap">
                {article.thumbnail && (
                  <Box className="mb-2 mr-2">
                    <img
                      src={
                        article.thumbnail.startsWith('http') ||
                        article.thumbnail.startsWith('blob:')
                          ? article.thumbnail
                          : `http://localhost:5000/${article.thumbnail.replace(/\\/g, '/')}`
                      }
                      alt={'Article Image'}
                      className="mb-1 h-20 w-20 object-cover"
                    />
                    <Chip
                      onDelete={() => {
                        setArticle((prevArticle) => ({
                          ...prevArticle,
                          thumbnail: '',
                        }));
                      }}
                    />
                  </Box>
                )}
              </Box>
            </Box>
            <Box className="flex flex-1 flex-col space-y-4">
              <TextField
                label="Tiêu đề bài viết"
                name="title"
                value={article.title}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                required
              />
            </Box>
          </Box>

          <Box>
            <div>
              <JoditEditor
                ref={editor}
                className='mt-4'
                value={
                  typeof article.content === 'string' ? article.content : ''
                }
                tabIndex={1}
                onChange={(newContent) => {
                  handleInputChange({
                    target: { name: 'content', value: newContent },
                  });
                }}
              />
            </div>
          </Box>

          <Box className="mt-4 flex justify-end space-x-2">
            <Button onClick={onClose}>Hủy</Button>
            <Button variant="contained" color="primary" type="submit">
              {data && data.length > 0 ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

ArticlePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.array,
};

export default ArticlePopup;
