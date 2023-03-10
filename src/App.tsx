import { Global } from '@emotion/react';
import { Route, Routes } from 'react-router-dom';

import Bookmark from './pages/Bookmark/Bookmark';
import Main from './pages/Main/Main';

import reset from './reset';

function App() {
  return (
    <>
      <Global styles={reset} />
      <Routes>
        <Route index element={<Main />} />
        <Route path="/bookmark/*" element={<Bookmark />} />
        <Route path="/bookmark/:repositoryId" element={<Bookmark />} />
        <Route path="*" element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
