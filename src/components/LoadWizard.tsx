import React from 'react';
import dataWizard from 'assets/images/data-wizard.gif';

type Props = {
	dataElements: string;
};
const LoadWizard = ({ dataElements }: Props) => {
	return (
		<div className="font-bubblegum text-brown text-3xl text-center flex flex-col gap-16 justify-center h-96 items-center">
			{`Invocation des ${dataElements} en cours...`}
			<img className="rounded-md w-52 h-52" src={dataWizard} />
		</div>
	);
};

export default LoadWizard;
