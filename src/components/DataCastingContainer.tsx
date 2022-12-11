import React from 'react';
import { Navigate } from 'react-router-dom';
import LoadWizard from './LoadWizard';

type Props = React.PropsWithChildren<{
	status: 'loading' | 'error' | 'data';
	dataElements: string;
}>;

const DataCastingContainer = ({ status, dataElements, children }: Props) => {
	return (
		<>
			{status === 'loading' && <LoadWizard dataElements={dataElements} />}
			{status === 'data' && <>{children}</>}
			{status === 'error' && <Navigate to="/404" />}
		</>
	);
};

export default DataCastingContainer;
