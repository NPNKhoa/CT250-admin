import EditableView from '../components/Settings/EditableView';
import ReadOnlyView from '../components/Settings/ReadOnlyView';
import { Switch, Typography } from '@mui/material';
import { useEditMode } from '../hooks/useEditMode';
import { EditModeProvider } from '../contexts/EditModeContext';
import { useState } from 'react';
import { useBeforeUnload } from 'react-router-dom';

const SettingsPage = () => {
  const { isEditable, toggleEditMode } = useEditMode();
  const [shouldAlert, setShouldAlert] = useState(false);

  const handleChangeEditMode = () => {
    if (isEditable && shouldAlert) {
      alert(
        'Bạn đang rời khỏi chế độ chỉnh sửa. Vui lòng lưu lại các thay đổi, nếu không, các thay đổi sẽ không được áp dụng',
      );

      setShouldAlert(false);
      return;
    }

    toggleEditMode((prevState) => !prevState);
    setShouldAlert(true);
  };

  useBeforeUnload((e) => {
    if (shouldAlert) {
      e.preventDefault();
      e.returnValue = 'Chắc chưa bạn êiii...';
    }
  });

  return (
    <div>
      {isEditable ? <EditableView /> : <ReadOnlyView />}
      <div
        className="sticky bottom-0 -mx-4 flex items-center justify-between bg-[#EEEEEE] p-4"
        style={{ boxShadow: '0 -4px 16px 1px rgba(0, 0, 0, 0.15)' }}
      >
        <div className="flex items-center gap-2">
          <Typography variant="h6">Chế độ chỉnh sửa: </Typography>
          <Switch checked={isEditable} onChange={handleChangeEditMode} />
        </div>
      </div>
    </div>
  );
};

const SettingPageWrapper = () => {
  return (
    <EditModeProvider>
      <SettingsPage />
    </EditModeProvider>
  );
};

export default SettingPageWrapper;
