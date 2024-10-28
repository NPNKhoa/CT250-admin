import PropTypes from 'prop-types';
import Founder from './Founder';

const FounderList = ({ founders }) => {
  return (
    <div className="flex items-center justify-between gap-4">
      {Array.isArray(founders) &&
        founders.map((founder) => (
          <Founder key={founder?._id} founder={founder} />
        ))}
    </div>
  );
};

FounderList.propTypes = {
  founders: PropTypes.array,
};

export default FounderList;
