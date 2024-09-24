import { useContext } from 'react';
import { EditModeContext } from '../contexts/EditModeContext';

export const useEditMode = () => useContext(EditModeContext);
