import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { App } from './App';
import { store } from './state/store';

// render the app
const container = document.getElementById('react-root');

// justification: React docs specifically say to use this null assertion:
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#updates-to-client-rendering-apis
/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
const root = createRoot(container!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
