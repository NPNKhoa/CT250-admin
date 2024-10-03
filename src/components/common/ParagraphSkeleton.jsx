import { Skeleton } from '@mui/material';

const ParagraphSkeleton = () => {
  return (
    <div>
      <Skeleton animation="wave" width={'60%'} />
      <Skeleton animation="wave" width={'40%'} />
      <Skeleton animation="wave" />
      <Skeleton animation="wave" width={'80%'} />
    </div>
  );
};

export default ParagraphSkeleton;
