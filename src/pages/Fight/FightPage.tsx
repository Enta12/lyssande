import React, { useEffect, useState } from 'react';
import { PrimaryButton, Title } from 'components';
import { locals } from 'moockedData';
import { FightPhaseData, Protagonist } from 'types';
import FightLine from './Line/FightLine';
import ProtagonistListForm from './ProtagonistListForm';
import { ReactComponent as BlowUpButtonRight } from 'assets/icon/blowUpBoutonRight.svg';
import { ReactComponent as BlowUpButtonLeft } from 'assets/icon/blowUpBoutonLeft.svg';

const OTHERS_ELEMENT_HEIGHT_PX = 220;

const getLineIndexOnNextTurn = (currentTurn: number, protagnists: number) =>
	currentTurn + 1 === protagnists ? 0 : currentTurn + 1;

const FightPage = () => {
	const [protagonistList, setProtagonistList] = useState<Protagonist[]>([]);
	const [haveStart, setHaveStart] = useState(false);
	const [fightElementData, setFightElementData] = useState<FightPhaseData[]>([]);
	const [turnSelected, setTurnSelected] = useState(0);
	const [protagonistsLenght, setProtagonistsLenght] = useState(0);
	const [screenHeight, setScreenHeight] = useState(window.screen.height);

	useEffect(() => {
		const getHeight = () =>
			window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
		setScreenHeight(getHeight());
		window.addEventListener('resize', () => setScreenHeight(getHeight()));
		return () => {
			window.removeEventListener('resize', () => setScreenHeight(getHeight()));
		};
	}, [setScreenHeight, haveStart]);

	let heightLeftLines = screenHeight - OTHERS_ELEMENT_HEIGHT_PX;

	useEffect(() => {
		const onPress = (e: KeyboardEvent) => {
			if (e.key === 'Enter') {
				if (haveStart) {
					setTurnSelected(getLineIndexOnNextTurn(turnSelected, protagonistList.length));
				} else if (
					protagonistList.some((elt) => !elt.npc) &&
					protagonistList.some((elt) => elt.npc)
				) {
					setHaveStart(true);
				}
			}
		};
		window.addEventListener('keydown', (e) => onPress(e));
		return window.removeEventListener('keydown', (e) => onPress(e));
	});

	const handleDelete = (indexToDelete: number) => {
		const fightElementDataTemp = fightElementData.filter((el, index) => {
			return index !== indexToDelete;
		});
		setFightElementData(fightElementDataTemp);
	};
	const updateOposing = (index: number, newOposing: number, protagonistB: boolean) => {
		const fightElementDataTemp = [...fightElementData];
		fightElementDataTemp[index][protagonistB ? 'protagonistB' : 'protagonistC'] = newOposing;
		setFightElementData(fightElementDataTemp);
	};
	const updateLocal = (index: number, newLocal: number, firstLine: boolean) => {
		const fightElementDataTemp = [...fightElementData];
		fightElementDataTemp[index][firstLine ? 'local' : 'secondLocal'] = newLocal;
		setFightElementData(fightElementDataTemp);
	};
	const getOrderIndex = (index: number, lenght: number) =>
		turnSelected + index < lenght ? turnSelected + index : turnSelected + index - lenght;

	const deleteElement = (
		protagonistsTemp: Protagonist[],
		fightElementDataTemp: FightPhaseData[],
		index: number
	) => {
		protagonistsTemp.splice(index, 1);
		fightElementDataTemp.splice(index, 1);
		fightElementDataTemp.forEach((data) => {
			if (data.protagonistB === index) {
				data.protagonistB = data.protagonistA;
			}
			if (data.protagonistA > index) data.protagonistA--;
			if (data.protagonistB > index) data.protagonistB--;
		});
		if (!protagonistsTemp.some((elt) => !elt.npc) || !protagonistsTemp.some((elt) => elt.npc)) {
			setTurnSelected(0);
			setHaveStart(false);
		}
	};

	const addTurnIntoCorrectPlace = (
		protagonist: Protagonist,
		protagonistsTemp: Protagonist[],
		fightElementDataTemp: FightPhaseData[]
	) => {
		let isAdd = false;
		let newIndex: number;
		for (let i = 0; i < fightElementDataTemp.length; i++) {
			const currentIndex = getOrderIndex(i, fightElementData.length);
			if (protagonist.cou > protagonistList[currentIndex].cou) {
				newIndex = !i && haveStart ? currentIndex + 1 : currentIndex;
				protagonistsTemp.splice(newIndex, 0, protagonist);
				fightElementDataTemp.splice(newIndex, 0, {
					protagonistA: newIndex,
					protagonistB: 0,
					protagonistC: 0,
					local: locals.length - 1,
					secondLocal: locals.length - 1,
				});
				isAdd = true;
				break;
			}
		}
		if (!isAdd) {
			protagonistsTemp.push(protagonist);
			fightElementDataTemp.push({
				protagonistA: protagonistsTemp.length - 1,
				protagonistB: 0,
				protagonistC: 0,
				local: locals.length - 1,
				secondLocal: locals.length - 1,
			});
		}
		fightElementDataTemp.forEach((elt, index) => {
			if (elt.protagonistA >= newIndex && index !== newIndex) {
				elt.protagonistA++;
			}
			if (elt.protagonistB === -1) {
				elt.protagonistB = newIndex || protagonistList.length - 1;
			}
		});
	};
	const updateProtagonists = (
		action: 'add' | 'update' | 'delete',
		protagonist?: Protagonist,
		index?: number,
		cou?: boolean
	) => {
		const protagonistsTemp = [...protagonistList];
		const fightElementDataTemp = [...fightElementData];
		if (action === 'add' && protagonist) {
			addTurnIntoCorrectPlace(protagonist, protagonistsTemp, fightElementDataTemp);
		} else if (action === 'update' && protagonist && index !== undefined) {
			if (cou) {
				fightElementDataTemp.forEach((elt) => {
					if (elt.protagonistB === index) elt.protagonistB = -1;
				});
				deleteElement(protagonistsTemp, fightElementDataTemp, index);
				addTurnIntoCorrectPlace(protagonist, protagonistsTemp, fightElementDataTemp);
			} else {
				protagonistsTemp[index] = protagonist;
			}
		} else if (action === 'delete' && index !== undefined) {
			deleteElement(protagonistsTemp, fightElementDataTemp, index);
		}
		setFightElementData(fightElementDataTemp);
		setProtagonistList(protagonistsTemp);
	};

	return (
		<div
			className={`
                    ${haveStart ? 'absolute top-[112px]' : 'relative'}
                    py-7
                    flex
                    w-screen
                    left-0`}
		>
			<div className="flex-col ml-7 flex min-w-[952px] gap-4">
				<Title title={'Combat'} />
				{!haveStart &&
					protagonistList.some((elt) => !elt.npc) &&
					protagonistList.some((elt) => elt.npc) && (
						<div className="mx-auto relative mb-6">
							<BlowUpButtonLeft
								className="
                                    absolute
                                    top-[-26px]
                                    left-[-70px]
                                    h-[141px]
                                    w-[175px]
                                "
							/>
							<PrimaryButton
								className="relative z-10"
								text="Commencer le combat"
								onClick={() => setHaveStart(true)}
							/>
							<BlowUpButtonRight
								className="
                                    absolute
                                    top-[-26px]
                                    right-[-70px]
                                    h-[141px]
                                    w-[175px]
                                "
							/>
						</div>
					)}
				{fightElementData.map((data, index) => {
					const indexInOrder = getOrderIndex(index, fightElementData.length);
					const canAddLine = () => {
						if (!haveStart) return true;
						if (index === 0) {
							heightLeftLines -= protagonistList[indexInOrder].secondAt ? 339 : 248;
						} else {
							heightLeftLines -= protagonistList[indexInOrder].secondAt ? 190 : 110;
						}
						return heightLeftLines > 0;
					};
					return (
						canAddLine() && (
							<React.Fragment key={index}>
								<FightLine
									firstLine={!index && haveStart}
									protagonistList={protagonistList}
									data={fightElementData[indexInOrder]}
									onChangeOpposing={(newOposing, protagonistB) =>
										updateOposing(indexInOrder, newOposing, protagonistB)
									}
									onChangeLocal={(newLocal, firstLine) =>
										updateLocal(indexInOrder, newLocal, firstLine)
									}
									onDelete={handleDelete}
									index={indexInOrder}
								/>
								{!index && haveStart && (
									<PrimaryButton
										className="ml-60"
										onClick={() =>
											setTurnSelected(getLineIndexOnNextTurn(turnSelected, protagonistList.length))
										}
										text="Tour suivant"
									/>
								)}
							</React.Fragment>
						)
					);
				})}
				{haveStart && (
					<span
						className="
                            mx-auto
                            text-[80px]
                            text-orange
                            h-3"
					>
						. . .
					</span>
				)}
			</div>
			<ProtagonistListForm
				height={haveStart ? screenHeight - OTHERS_ELEMENT_HEIGHT_PX : undefined}
				protagonistsLenght={protagonistsLenght}
				protagonists={protagonistList}
				onAddProtagonist={(protagonist: Protagonist) => {
					updateProtagonists('add', protagonist);
					setProtagonistsLenght(protagonistsLenght + 1);
				}}
				onDeleteProtagonist={(index) => updateProtagonists('delete', undefined, index)}
				onProtagonistChange={(protagonist, index, cou) =>
					updateProtagonists('update', protagonist, index, cou)
				}
			/>
		</div>
	);
};

export default FightPage;
