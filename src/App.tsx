import { Global } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';
import Search from './pages/Search';

import reset from './reset';

function App() {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route index element={<Search />} />
      </Routes>
    </>
  );
}

export default App;
