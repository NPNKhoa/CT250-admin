import { createContext, useState } from 'react';

export const EditModeContext = createContext();

// eslint-disable-next-line react/prop-types
export const EditModeProvider = ({ children }) => {
  const [isEditable, setIsEditable] = useState(false);

  const toggleEditMode = () => {
    setIsEditable((prevMode) => !prevMode);
  };

  return (
    <EditModeContext.Provider value={{ isEditable, toggleEditMode }}>
      {children}
    </EditModeContext.Provider>
  );
};
