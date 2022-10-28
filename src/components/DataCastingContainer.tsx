import React from 'react';
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
		</>
	);
};

export default DataCastingContainer;
