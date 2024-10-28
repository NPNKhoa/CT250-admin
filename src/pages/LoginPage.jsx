import Paper from '@mui/material/Paper';
import Logo from '../components/common/Logo';
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  FormHelperText,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { isValidEmail } from '../helpers/validation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../redux/thunk/authThunk';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const [error, setError] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChange = useCallback((e) => {
    const { id, value } = e.target;
    setCredentials((prev) => ({ ...prev, [id]: value }));

    // Validation
    if (id === 'email') {
      if (value.length === 0) {
        setError((prevError) => ({
          ...prevError,
          email: 'Email không được để trống',
        }));
      } else if (!isValidEmail(value)) {
        setError((prevError) => ({
          ...prevError,
          email: 'Email không đúng định dạng',
        }));
      } else {
        setError((prevError) => ({ ...prevError, email: '' }));
      }
    } else if (id === 'password') {
      if (value.length < 8) {
        setError((prevError) => ({
          ...prevError,
          password: 'Password phải có ít nhất 8 ký tự',
        }));
      } else {
        setError((prevError) => ({ ...prevError, password: '' }));
      }
    }
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!credentials.email || !credentials.password) {
        return toast.error('Vui lòng nhập đủ các trường');
      }

      if (error.email || error.password) {
        return toast.error(error.email || error.password);
      }

      try {
        await dispatch(loginThunk(credentials)).unwrap();
        toast.success('Đăng nhập thành công');
        navigate('/'); // Điều hướng sau khi đăng nhập thành công
      } catch (err) {
        toast.error('Đăng nhập thất bại');
        console.log(err);
      }
    },
    [credentials, error, dispatch, navigate],
  );

  return (
    <Paper elevation={2} className="w-2/5 p-8">
      <Logo className="mx-auto w-1/2" />
      <h2 className="my-4 text-center text-2xl font-bold uppercase text-primary">
        Đăng nhập
      </h2>
      <form onSubmit={handleSubmit} className="mt-4 w-full">
        <Stack>
          <TextField
            className="w-full"
            error={!!error.email}
            helperText={error.email || ''}
            label="Email*"
            id="email"
            value={credentials.email}
            onChange={handleChange}
          />
          <br />
          <FormControl variant="outlined" error={!!error.password} fullWidth>
            <InputLabel>Mật khẩu*</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={credentials.password}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Mật khẩu"
            />
            <FormHelperText>{error.password || ''}</FormHelperText>
          </FormControl>
          <br />
          <Button type="submit" variant="contained" size="large">
            Đăng nhập
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default LoginPage;
