import { useState } from 'react';
import SideBarItem from './SideBarItem';
import useRoutes from '../../configs/sidebarElements.jsx';

const SideBarItemList = () => {
  const [isToggled, setIsToggled] = useState({});

  const handleCLickedItem = (key) => {
    key !== '' &&
      setIsToggled((prevState) => ({
        ...prevState,
        [key]: !prevState[key],
      }));
  };
  const itemList = useRoutes();

  return (
    <div className="no-scrollbar h-3/4 w-full overflow-auto py-2 pl-4 pr-6">
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
