import { Trash2, FilePenLine, CopyPlus, TicketPercent } from 'lucide-react';
import PropTypes from 'prop-types';

const ActionHeader = ({ title, onApply, onAdd, onUpdate, onDelete, selectedRows }) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>    
      <div className="ml-auto flex flex-col space-y-2 md:flex-row md:space-x-2 md:space-y-0">
      {onApply && (
          <button
            className="flex items-center rounded bg-orange-600 px-2 py-1 text-xs text-white md:px-4 md:py-2 md:text-base"
            onClick={onApply}
          >
            <TicketPercent strokeWidth={1} className="mr-2" />
            <span>Áp dụng</span>
          </button>
        )}
        {onAdd && (
          <button
            className="flex items-center rounded bg-green-600 px-2 py-1 text-xs text-white md:px-4 md:py-2 md:text-base"
            onClick={onAdd}
          >
            <CopyPlus strokeWidth={1} className="mr-2" />
            <span>Thêm</span>
          </button>
        )}
        {onUpdate && (
          <button
            className="flex items-center rounded bg-blue-600 px-2 py-1 text-xs text-white md:px-4 md:py-2 md:text-base"
            onClick={onUpdate}
          >
            <FilePenLine strokeWidth={1} className="mr-2" />
            <span>Cập nhật</span>
          </button>
        )}
        {onDelete && (
          <button
            className="flex items-center rounded bg-red-600 px-2 py-1 text-xs text-white md:px-4 md:py-2 md:text-base"
            onClick={() => onDelete(selectedRows)}
          >
            <Trash2 strokeWidth={1} className="mr-2" />
            <span>Xóa</span>
          </button>
        )}
      </div>
    </div>
  );
};

ActionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  onApply: PropTypes.func,
  onAdd: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  selectedRows: PropTypes.arrayOf(PropTypes.object),
};

export default ActionHeader;
