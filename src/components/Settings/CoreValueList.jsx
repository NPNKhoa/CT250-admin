import PropTypes from 'prop-types';
import CoreValue from './CoreValue';
import { v4 as uuidv4 } from 'uuid';

const CoreValueList = ({ coreValueList }) => {

  return (
    <div className="flex w-full items-center justify-between gap-4 p-8">
      {Array.isArray(coreValueList) &&
        coreValueList.map((item) => (
          <CoreValue
            title={item.title}
            content={item.content}
            key={`${uuidv4()}-core-value`}
          />
        ))}
    </div>
  );
};

CoreValueList.propTypes = {
  coreValueList: PropTypes.array,
};

export default CoreValueList;
