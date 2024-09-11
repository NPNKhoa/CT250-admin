import { useState } from 'react';
import SideBarItem from './SideBarItem';
import itemList from '../configs/sidebarElements.jsx';

const SideBarItemList = () => {
  const [isToggled, setIsToggled] = useState({});

  const handleCLickedItem = (key) => {
    key !== '' &&
      setIsToggled((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
  };

  return (
    <div className='overflow-auto h-3/4 w-full pt-2 pr-6 pl-4 no-scrollbar'>
      {itemList.map(({ icon, label, path, childItems }) => {
        const key = path.split('/')[1];

        return (
          <SideBarItem
            key={`child-${key}`}
            icon={icon}
            label={label}
            path={path}
            childItems={childItems}
            isToggled={isToggled[key] || false}
            onClick={() => {
              childItems.length !== 0 && handleCLickedItem(key);
            }}
          />
        );
      })}
    </div>
  );
};

export default SideBarItemList;
