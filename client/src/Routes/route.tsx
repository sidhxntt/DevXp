import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../Layouts/RootLayout';
import Home from './Home';
import Frontend from './frontend';
import Backend from './backend';
import Devops from './devops';
import MachineLearning from './machine-learning';
import DeepLearning from './deep-learning';
import CloudComputing from './cloud-computing';
import Databases from './dbms';
import ErrorBoundary from '../Layouts/ErrorBoundary';
import Subscribe  from './subscribe';
import UserFav from './favourites';
import Data from './data';
import Coding from './coding';
import Future from './future';
import FutureRealm from './future-realm';


const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorBoundary/>,
    children: [
      {
        path: '',
        element: <Home/>,
      },
      {
        path: 'frontend',
        element: <Frontend/>,
      },
      {
        path: 'backend',
        element: <Backend/>,
      },
      {
        path: 'devops',
        element: <Devops/>,
      },
      {
        path: 'machine-learning',
        element: <MachineLearning/>,
      },
      {
        path: 'deep-learning',
        element: <DeepLearning/>,
      },
      {
        path: 'dbms',
        element: <Databases/>,
      },
      {
        path: 'cloud-computing',
        element: <CloudComputing/>,
      },
      {
        path: 'data',
        element: <Data/>,
      },
      {
        path: 'coding',
        element: <Coding/>,
      },
      {
        path: 'future',
        element: <Future/>,
      },
      {
        path: 'future-realm',
        element: <FutureRealm/>,
      },
      {
        path: 'subscription',
        element: <Subscribe/>,
      },
      {
        path: 'favourites',
        element: <UserFav/>,
      }
    ],
  },
]);

export default routes;
