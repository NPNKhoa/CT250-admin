import { useState } from 'react';
import EditableView from '../components/Settings/EditableView';
import ReadOnlyView from '../components/Settings/ReadOnlyView';
import { Button, Divider, Switch, Typography } from '@mui/material';

const SettingsPage = () => {
  const [isEditable, setIsEditable] = useState(false);

  const handleChangeEditMode = () => {
    setIsEditable((prevState) => !prevState);
  };

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-2">
          <Typography variant="h6">Chế độ chỉnh sửa: </Typography>
          <Switch checked={isEditable} onChange={handleChangeEditMode} />
        </div>
        <Button variant="contained" size="large">
          Lưu thay đổi
        </Button>
      </div>
      <Divider />
      {isEditable ? <EditableView /> : <ReadOnlyView />}
    </div>
  );
};

export default SettingsPage;
