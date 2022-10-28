import React from 'react';
import { ReactComponent as OpenIcon } from 'assets/icon/openInputSelect.svg';
import { useOutsideClicker } from 'hooks';

type Props = React.PropsWithChildren<{
	disable?: boolean;
	header: React.ReactNode;
	isOpen: boolean;
	onOpen: (value: boolean) => void;
}>;

const UnfoldingCard = ({
	disable = false,
	header,
	onOpen: handleOpen,
	isOpen,
	children,
}: Props) => {
	const selectRef = useOutsideClicker(() => handleOpen(false));
	const onCardClick = () => {
		handleOpen(!isOpen);
	};

	return (
		<div
			ref={selectRef}
			onClick={() => !disable && onCardClick()}
			className={`
        ${!disable && isOpen ? 'bg-darkBrown' : 'bg-brown'}
        ${disable && !isOpen && 'bg-bladeBrown cursor-not-allowed'}
        p-2
        w-full
        rounded-lg
        flex
        flex-col
        gap-4
      `}
		>
			<div
				className="
          flex
          justify-between
          w-full
          font-bubblegum
          text-white
          text-lg
          items-center
          gap-4
          cursor-pointer
          px-2"
				onClick={() => !disable && handleOpen(!isOpen)}
			>
				{header}
				<OpenIcon className={isOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
			</div>
			<div className={`${!isOpen && 'hidden'}`}>{children}</div>
		</div>
	);
};

export default UnfoldingCard;
