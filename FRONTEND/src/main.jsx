import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { routeTree } from './routing/routeTree.js'
import store from './store/store.js';
import { Provider } from 'react-redux';
// The above two helps to use useSelector and useDispatch.

// Create a QueryClient instance
const queryClient = new QueryClient();

const router = createRouter({ 
  routeTree,
  context:{
    queryClient,
    store
  }
})
//Provider store this tells the useSelector to get auth from the store...
// Mount the app with QueryClientProvider
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
  </Provider>
);
 