import { useSelector } from 'react-redux';
import Founder from './Founder';

const FounderList = () => {
  const systemConfigs = useSelector(
    (state) => state.systemConfigs.currentConfigs,
  );

  const founders = systemConfigs?.founders;

  return (
    <div className="flex items-center justify-between gap-4">
      {Array.isArray(founders) &&
        founders.map((founder) => (
          <Founder key={founder?._id} founder={founder} />
        ))}
    </div>
  );
};

export default FounderList;
