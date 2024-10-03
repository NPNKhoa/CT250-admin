import { Button, InputAdornment, TextField } from '@mui/material';

const AddPriceFilter = () => {
  return (
    <div className="flex w-full flex-col items-center justify-start gap-8">
      <TextField
        variant="outlined"
        label={'Giá từ'}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">đ</InputAdornment>,
          },
        }}
        // size="small"
        className="m-auto w-2/3"
      />

      <TextField
        variant="outlined"
        label={'Đến giá'}
        slotProps={{
          input: {
            endAdornment: <InputAdornment position="end">đ</InputAdornment>,
          },
        }}
        // size="small"
        className="m-auto w-2/3"
      />

      <div className="flex h-4/5 w-full items-center justify-end gap-4">
        <Button onClick={() => {}}>Cancel</Button>
        <Button variant="contained" onClick={() => {}}>
          OK
        </Button>
      </div>
    </div>
  );
};

export default AddPriceFilter;
