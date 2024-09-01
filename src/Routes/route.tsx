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


const routes = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
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
    ],
  },
]);

export default routes;
