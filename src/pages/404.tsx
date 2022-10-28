import React from 'react';
import illustration from 'assets/images/404-picture.png';
import { ErrorPage } from 'components';

const NotFound = () => {
	return (
		<ErrorPage
			text={{
				pageTitle: 'PAGE INEXISTANTE',
				firstLine: "Cette page n'existe pas ou a été suprimée",
			}}
			img={{
				src: illustration,
				alt: 'gandalf avec une prise',
				maxSize: 'max-w-[331px]',
			}}
		/>
	);
};

export default NotFound;
