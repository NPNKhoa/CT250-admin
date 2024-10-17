import EditableView from '../components/Settings/EditableView';
import ReadOnlyView from '../components/Settings/ReadOnlyView';
import { Button, Switch, Typography } from '@mui/material';
import { useEditMode } from '../hooks/useEditMode';
import { EditModeProvider } from '../contexts/EditModeContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBeforeUnload, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getCurrentSystemConfig } from '../redux/thunk/systemConfigThunk';

const SettingsPage = () => {
  const dispatch = useDispatch();

  const error = useSelector((state) => state.systemConfigs.error);

  const { isEditable, toggleEditMode } = useEditMode();
  const [shouldAlert, setShouldAlert] = useState(false);

  const navigate = useNavigate();
  const originalPushStateRef = useRef(null);

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

  const handleBlockedNavigation = useCallback(
    (path) => {
      if (shouldAlert) {
        const confirmWindow = window.confirm('Chắc chưa bạn êiii');
        console.log(confirmWindow);
        if (confirmWindow) {
          setShouldAlert(false);
          window.history.pushState = originalPushStateRef.current;
          navigate(path);
          return true;
        }
        return false;
      }
      return true;
    },
    [navigate, shouldAlert],
  );

  // Fetching data
  useEffect(() => {
    dispatch(getCurrentSystemConfig());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (error) {
      toast.error('Lỗi khi tải cấu hình');
    }
  }, [error]);

  useEffect(() => {
    if (shouldAlert) {
      originalPushStateRef.current = window.history.pushState;

      window.history.pushState = function () {
        if (handleBlockedNavigation(arguments[2])) {
          originalPushStateRef.current.apply(this, arguments);
        }
      };

      window.addEventListener('popstate', handleBlockedNavigation);
    }

    return () => {
      if (shouldAlert) {
        window.history.pushState = originalPushStateRef.current;
        window.removeEventListener('popstate', handleBlockedNavigation);
      }
    };
  }, [shouldAlert, handleBlockedNavigation, navigate]);

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
        <Button variant="contained" color="error">
          Phục hồi dữ liệu
        </Button>
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
