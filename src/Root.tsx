import  { useEffect, useState } from 'react';
import App from './App.tsx';
import GradientCircularProgress from './Components/Loader/Loader.tsx';

const Root = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
      setIsLoading(false);
  }, []);

  return isLoading ? <GradientCircularProgress /> : <App />;
};

export default Root;