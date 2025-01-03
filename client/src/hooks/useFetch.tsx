"use client";
import { useEffect, useState } from "react";
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';

const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [token, setToken] = useState<string | null>("")
  const { getToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const template = 'DevXPUserInfo';
        const token = await getToken({ template });
        setLoading(true);
        setToken(token)
        
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (error: any) {
        setError(error.message);
        console.error("Error fetching data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return {token, data, loading, error };
};

export default useFetch;
