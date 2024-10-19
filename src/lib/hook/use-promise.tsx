import { useState, useEffect, useCallback } from 'react';
import { AxiosError, AxiosResponse } from "axios";
import api from "@/server/api";

type ApiState<T> = {
  loading: boolean;
  error: Error | null;
  data: T | null;
};

type ParamValue = string | number | boolean;
type Params = Record<string, ParamValue>;

export function usePromise<T = any>(baseUrl: string, initialParams: Params = {}) {
  const [params, setParams] = useState<Params>(initialParams);
  const [state, setState] = useState<ApiState<T>>({
    loading: false,
    error: null,
    data: null,
  });

  const fetchData = useCallback(async () => {
    setState({ loading: true, error: null, data: null });

    try {
      const response: AxiosResponse<T> = await api.get('/api/'+baseUrl, {
        params: params,
      });
      setState({ loading: false, error: null, data: response.data });
    } catch (error) {
      const axiosError = error as AxiosError;
      setState({
        loading: false,
        error: new Error(axiosError.message || 'An unknown error occurred'),
        data: null
      });
    }
  }, [baseUrl, params]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const updateParams = (newParams: Partial<Params>) => {
    setParams(prevParams => {
      const updatedParams: Params = { ...prevParams };
      Object.entries(newParams).forEach(([key, value]) => {
        if (value !== undefined) {
          updatedParams[key] = value;
        }
      });
      return updatedParams;
    });
  };

  return { ...state, updateParams, refetch: fetchData };
}