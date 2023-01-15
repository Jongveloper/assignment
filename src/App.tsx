import { Global } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';

import Bookmark from './pages/Bookmark';
import Main from './pages/Main';

import reset from './reset';

function App() {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route index element={<Main />} />
        <Route path="/bookmark/*" element={<Bookmark />} />
        <Route path="/bookmark/:repositoryId" element={<Bookmark />} />
      </Routes>
    </>
  );
}

export default App;
