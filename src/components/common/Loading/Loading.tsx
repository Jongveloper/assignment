import CircularProgress from '@mui/material/CircularProgress';

import CenterLayout from '../CenterLayout/CenterLayout';

const Loading = () => (
  <CenterLayout>
    <CircularProgress data-testid="CircularProgress" />
  </CenterLayout>
);

export default Loading;
