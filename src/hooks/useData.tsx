import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useApi from './useApi';

type Status = 'loading' | 'error' | 'data';

const useData = <T,>(errorMsg: string, initialValue: T, path: string) => {
	const [data, setData] = useState<T>(initialValue);
	const [status, setStatus] = useState<Status>('loading');

	const api = useApi();
	useEffect(() => {
		try {
			const fetchData = async () => {
				const res = await api.get(path);
				setData(res.data);
				setStatus('data');
			};
			fetchData();
		} catch (error) {
			setStatus('error');
			toast.error(errorMsg);
		}
	}, []);
	return { data, status };
};

export default useData;
