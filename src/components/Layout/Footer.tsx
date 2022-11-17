import React from 'react';

const Footer = () => {
	return (
		<footer
			className="
        lg:h-12
        sm:h-20
        h-28
        px-16
        bg-swamp
        flex
        lg:flex-row
        flex-col
        items-center
        justify-around
        lg:justify-between
        text-white
        font-bubblegum
        text-center
      "
		>
			Fait par Karen, Valentin, Baptiste, Yasmine.
			<span className="text-center">
				<span className="lg:inline md:hidden inline">
					Pour toutes questions, veuillez contacter
				</span>
				<span className="hidden md:inline lg:hidden">Contact : </span>
				<span className="text-sky-500 underline ml-1">lyssandecontact@gmail.com</span>
			</span>
		</footer>
	);
};

export default Footer;
