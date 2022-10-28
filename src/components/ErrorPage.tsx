import React from 'react';
import Title from './Title';
import noDataImg from 'assets/images/no-data.png';

type Props = {
	img?: {
		src: string;
		alt: string;
		maxSize: string;
	};
	text: {
		pageTitle?: string;
		title?: string;
		firstLine: string;
		secondLine?: string;
	};
};

const ErrorPage = ({
	img = {
		src: noDataImg,
		alt: 'Sorcier triste',
		maxSize: 'max-w-[331px]',
	},
	text,
}: Props) => {
	return (
		<div className="sm:justify-between justify-center flex w-full flex-1">
			<div className="flex flex-col pt-12 gap-2 font-bubblegum text-brown text-2xl">
				{text.title && (
					<h1 className="sm:text-start text-center font-bold text-3xl">{text.title}</h1>
				)}
				{text.pageTitle && <Title title={text.pageTitle} className="sm:text-start text-center" />}
				<p className="sm:text-start text-center my-4">Nous sommes désolé.</p>
				<p className="sm:text-start text-center">{text.firstLine}</p>
				<p className="sm:text-start text-center">{text.secondLine}</p>
			</div>
			<img
				className={`contain self-end hidden lg:block relative top-6 ${img.maxSize}`}
				src={img.src}
				alt={img.alt}
			/>
		</div>
	);
};

export default ErrorPage;
