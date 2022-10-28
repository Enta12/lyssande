import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useApi from './useApi';

type Status = 'loading' | 'error' | 'data';

const useData = <T, V = {}>(
	errorMsg: string,
	initialValue: T,
	path: string,
	formatFunction?: (value: V) => T extends Array<infer U> ? U : T
) => {
	const [data, setData] = useState<T>(initialValue);
	const [status, setStatus] = useState<Status>('loading');

	const api = useApi();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api.get(path);
				setData(formatFunction ? res.data.map((el: V) => formatFunction(el)) : res.data);
				setStatus('data');
			} catch (error) {
				setStatus('error');
				toast.error(errorMsg);
			}
		};
		fetchData();
	}, []);
	return { data, status, setData };
};

export const getStatus = (...status: Status[]) => {
	if (status.some((elt) => elt === 'error')) return 'error';
	if (status.some((elt) => elt === 'loading')) return 'loading';
	return 'data';
};

export default useData;
