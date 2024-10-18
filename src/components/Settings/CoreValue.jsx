import PropTypes from 'prop-types';

const CoreValue = ({ title, content }) => {
  return (
    <div className="min-h-44 w-1/3 rounded-lg bg-slate-200 p-6 shadow-xl">
      <h3 className="mb-4 text-xl font-semibold">{title}</h3>
      <p className="text-justify text-gray-600">{content}</p>
    </div>
  );
};
CoreValue.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default CoreValue;
