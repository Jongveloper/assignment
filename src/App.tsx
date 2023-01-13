import { Global } from '@emotion/react';
import reset from './reset';

function App() {
  return (
    <div>
      <Global styles={reset} />
      <p>GitHub Issue</p>
    </div>
  );
}

export default App;
