import { useState } from 'react';
import SideBarItem from './SideBarItem';
import itemList from '../configs/sidebarElements.jsx';

const SideBarItemList = () => {
  const [isToggled, setIsToggled] = useState({});

  const handleClickedItem = (label) => {
    label !== '' &&
      setIsToggled((prevState) => ({
        ...prevState,
        [label]: !prevState[label],
      }));
  };

  return (
    <div className='overflow-auto h-3/4 w-full pt-2 pr-6 pl-4 no-scrollbar'>
      {itemList.map(({ icon, label, path, childItems }, index) => (
        <SideBarItem
          key={`child-${index}`}
          icon={icon}
          label={label}
          path={path}
          childItems={childItems}
          isToggled={isToggled[label] || false}
          onClick={() => {
            childItems.length !== 0 && handleClickedItem(label);
          }}
        />
      ))}
    </div>
  );
};

export default SideBarItemList;
