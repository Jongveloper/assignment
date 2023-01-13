import { Global } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';

import reset from './reset';

function App() {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route index element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
