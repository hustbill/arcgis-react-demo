import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

/**
 * Building Your Own Hooks
 * https://reactjs.org/docs/hooks-custom.html
 * 
 * Hooks API Reference:
 * https://reactjs.org/docs/hooks-reference.html
 * 
 * Basic Hooks
    useState
    useEffect
    useContext
* Additional Hooks
    useReducer
    useCallback
    useMemo
    useRef
    useImperativeHandle
    useLayoutEffect
    useDebugValue
 */

export const useDataApi = (initialUrl, initialData) => {
  const [data, setData] = useState(initialData);
  const [url, setUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
      setIsLoading(true);
 
      try {
        const result = await axios(url);
 
        setData(result.data);
      } catch (error) {
        setIsError(true);
      }
 
      setIsLoading(false);
    };
 
    fetchData();
  }, [url]);
 
  return [{ data, isLoading, isError }, setUrl];
};