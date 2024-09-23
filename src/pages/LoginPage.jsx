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
import { useState } from 'react';
import { isValidEmail } from '../helpers/validation';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);

    if (e.target.value.length === 0) {
      setError({ ...error, email: 'Email không được để trống' });
    } else if (!isValidEmail(e.target.value)) {
      setError({ ...error, email: 'Email không đúng định dạng' });
    } else {
      setError({ ...error, email: '' });
    }
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);

    if (e.target.value.length < 8) {
      setError({ ...error, password: 'Password phải có ít nhất 8 ký tự' });
    } else {
      setError((prevError) => ({
        ...prevError,
        password: '',
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error('Vui lòng nhập đủ các trường');
    }

    if (error.email || error.password) {
      return toast.error(error.email || error.password);
    }

    alert(`Email: ${email} - Password: ${password}`);
    toast.success('Đăng nhập thành công');
  };

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
            value={email}
            onChange={(e) => handleChangeEmail(e)}
          />
          <br />
          <FormControl variant="outlined" error={!!error.password} fullWidth>
            <InputLabel>Mật khẩu*</InputLabel>
            <OutlinedInput
              type={showPassword ? 'text' : 'password'}
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
              value={password}
              onChange={(e) => handleChangePassword(e)}
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
