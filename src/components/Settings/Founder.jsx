import PropTypes from 'prop-types';

const Founder = ({ founder }) => {
  return (
    <div
      key={founder._id}
      className="w-1/3 rounded-lg bg-gray-100 p-6 text-center shadow-md"
    >
      <img
        src={`http://localhost:5000/${founder?.founderAvatarPath}`}
        alt="images"
        className="mx-auto h-32 w-32 rounded-full object-cover"
      />
      <h3 className="mt-4 text-xl font-semibold">{founder?.founderName}</h3>
      <p className="text-gray-600">Co-founder</p>
    </div>
  );
};

Founder.propTypes = {
  founder: PropTypes.object,
};

export default Founder;
