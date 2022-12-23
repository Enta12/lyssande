import React from 'react';
import cn from 'classnames';
import { FightPhaseData, Protagonist } from 'types';

import { locals } from 'moockedData';
import { getLocal, getOpponents, getStatValue } from '../helper';
import Result from './Result';
import LineForm from './LineForm';

type Props = {
	firstLine: boolean;
	index: number;
	protagonistList: Protagonist[];
	data: FightPhaseData;
	onChangeOpposing: (oposing: number, protagonistB: boolean) => void;
	onChangeLocal: (newLocal: number, firstLocal: boolean) => void;
	onDelete: (indexToDelete: number) => void;
};

const FightLine = ({
	protagonistList,
	data,
	firstLine,
	onChangeLocal: handleLocalChange,
	onChangeOpposing: handleOpposingChange,
}: Props) => {
	const activeProtagonist = protagonistList[data.protagonistA];
	//TODO use key instead of index
	const firstLocal = getLocal(locals[data.local]);
	const secondLocal = getLocal(locals[data.secondLocal]);
	const opennents = getOpponents(protagonistList, data);
	const stat = getStatValue(data, protagonistList, firstLocal, secondLocal);

	return (
		<>
			<div className="text-xl flex text-brown relative items-center">
				<div
					className={`
                        flex
                        h-20
                        ${activeProtagonist.npc ? 'bg-bladeBrown' : 'bg-brown'}
                        w-[177px]
                        rounded-l-2xl
                        p-3
                        items-center
                        justify-around`}
				>
					<div className="w-[157px] h-[50px] bg-white rounded-2xl flex items-center justify-center">
						{activeProtagonist.name || 'Nom indéfinie'}
					</div>
				</div>
				<div className="flex flex-col gap-[13px]">
					<div className="flex gap-2">
						<LineForm
							oponnents={opennents}
							oponnent={{
								onChange: (protagonist) => handleOpposingChange(protagonist[0], false),
								value: data.protagonistB,
							}}
							local={{
								onChange: (local) => handleLocalChange(local[0], true),
								value: data.local,
							}}
							isNpc={activeProtagonist.npc}
							position={stat.activeCharacter.at2 ? 'top' : 'center'}
						/>
						{firstLine && (
							<Result
								local={firstLocal.name}
								at={stat.activeCharacter.at}
								prd={stat.opponents.prdOfCharacterB}
							/>
						)}
					</div>
					{stat.activeCharacter.at2 && (
						<div className="flex gap-2">
							<LineForm
								oponnents={opennents}
								oponnent={{
									onChange: (protagonist) => handleOpposingChange(protagonist[0], true),
									value: data.protagonistC,
								}}
								local={{
									onChange: (local) => handleLocalChange(local[0], false),
									value: data.secondLocal,
								}}
								isNpc={activeProtagonist.npc}
								position="bottom"
							/>
							{firstLine && (
								<Result
									local={secondLocal.name}
									at={stat.activeCharacter.at2}
									prd={stat.opponents.prdOfCharacterC}
								/>
							)}
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default FightLine;
