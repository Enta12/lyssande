/* eslint-disable sonarjs/cognitive-complexity */

import { MouseEvent, useState, useRef, useEffect } from 'react';
import { landsMoocked, speedMoocked } from 'moockedData';
import { GroupData, PcType, UserInfo } from 'types';
import MapButton from './MapButton';
import { ShortSelect } from 'components';
import React from 'react';
import Token from './Tokens/Token';
import ContextMenu from './ContextMenu';
import PrimaryButton from '../Primary-button';
import { useAuth } from 'hooks';

type Props = {
	players: UserInfo[];
	pcs: PcType[];
	img: string;
	mapName: string;
	scale: number;
	onSend: (
		value: (
			| {
					map: string;
					group: number;
					x: number;
					y: number;
			  }
			| undefined
		)[]
	) => void;
};

type ContextMenuProps = {
	y: string;
	x: string;
	pcIndex?: number;
};

const formatPcToTokenData = (pc: PcType) => {
	if (!pc.positions) return undefined;
	return {
		...pc.positions.coordinates,
		map: pc.positions.map,
		showMouvement: 0,
		group: pc.positions.group,
	};
};

const Map = ({ img, pcs, players, mapName, scale, onSend: handleSend }: Props) => {
	const mapRef = useRef<HTMLImageElement>(null);
	const auth = useAuth();

	const [initEnd, setInitEnd] = useState(false);
	const [entityDrag, setEntityDrag] = useState({ entityId: -1, group: false });
	const [contexMenu, setContextMenu] = useState<ContextMenuProps | null>(null);
	const [groupsData, setGroupsData] = useState<(GroupData | undefined)[]>([]);
	const [tokenData, setTokenData] = useState<
		(
			| {
					map: string;
					showMouvement: number;
					group: number;
					x: number;
					y: number;
			  }
			| undefined
		)[]
	>([]);
	const [playersSorted, setPlayersSorted] = useState<string[]>([]);
	const [height, setHeight] = useState(mapRef?.current?.height || 0);
	const [contextValue, setContextValue] = useState({ speed: 0, land: 0, duration: 0 });

	useEffect(() => {
		setTokenData([...pcs.map((pc) => formatPcToTokenData(pc))]);
	}, [setTokenData, pcs]);

	useEffect(() => {
		const defineGroups = (pc: PcType, index: number, groupsDataTemp: (GroupData | undefined)[]) => {
			if (pc.positions) {
				if (pc.positions.group || pc.positions.group === 0) {
					const group = groupsDataTemp[pc.positions.group];
					if (group) {
						group.members.push(index);
					} else {
						groupsDataTemp[pc.positions.group] = {
							members: [index],
							position: {
								...pc.positions.coordinates,
								map: pc.positions.map,
							},
						};
					}
				}
			}
		};
		if (!initEnd && pcs.length) {
			const groupsDataTemps = groupsData;
			pcs.forEach((pc, index) => defineGroups(pc, index, groupsDataTemps));
			setGroupsData([...groupsDataTemps]);
			setInitEnd(true);
		}
	}, [pcs, groupsData, setGroupsData, initEnd, setInitEnd]);
	const tokens: React.ReactNode[] = [];
	const groups: React.ReactNode[] = [];
	const contextMenu = {
		speed: {
			options: speedMoocked.map((speed) => speed.name),
			value: contextValue.speed,
		},
		land: {
			options: landsMoocked.map((land) => land.name),
			value: contextValue.land,
		},
		duration: {
			options: new Array(10).fill('').map((duration, index) => {
				if ((index + 1) % 2 === 0)
					return `${(index + 1) / 2} jour${(index + 1) / 2 > 1 ? 's' : ''}`;
				if (!index) return '1 demi journée';
				return `${Math.round((index + 1) / 2)} jour${
					(index + 1) / 2 > 1 ? 's' : ''
				} et 1 demi journée`;
			}),
			value: contextValue.duration,
		},
	};
	let isGrouping = false;

	const handleContextMenuChange = (action: string, index: number) => {
		if (action === 'speed' || action === 'land' || action === 'duration') {
			const contextValueTemp = { ...contextValue };
			contextValueTemp[action] = index;
			setContextValue(contextValueTemp);
			setContextMenu(null);
			return;
		}
		const tokenDataTemp = tokenData;
		switch (action) {
			case 'deleteToken':
				tokenDataTemp[index] = undefined;
				setTokenData(tokenDataTemp);
				break;
			case 'showMouvement':
				tokenDataTemp[index] = {
					map: tokenDataTemp[index]?.map || '',
					x: tokenDataTemp[index]?.x || 0,
					y: tokenDataTemp[index]?.y || 0,
					showMouvement: tokenDataTemp[index]?.showMouvement === 1 ? 0 : 1,
					group: tokenDataTemp[index]?.group || -1,
				};
				setTokenData(tokenDataTemp);
				break;
			case 'resetToken':
				tokenDataTemp[index] = formatPcToTokenData(pcs[index]);
				setTokenData(tokenDataTemp);
		}
		setContextMenu(null);
	};
	const openContextMenu = (
		e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
		pcIndex?: number
	) => {
		e.preventDefault();
		const xPos = e.pageX + 'px';
		const yPos = e.pageY + 'px';
		setContextMenu({
			x: xPos,
			y: yPos,
			pcIndex: pcIndex,
		});
	};
	const handleChange = (option: number) => {
		if (playersSorted.some((selectedPlayer) => selectedPlayer === players[option].name)) {
			setPlayersSorted(
				playersSorted.filter((selectedPlayer) => {
					return selectedPlayer !== players[option].name;
				})
			);
		} else {
			setPlayersSorted([...playersSorted, players[option].name]);
		}
	};
	const placeEntity = (event: MouseEvent<HTMLDivElement>) => {
		if (entityDrag.entityId > -1 && mapRef.current) {
			if (
				event.pageX > mapRef.current.offsetLeft &&
				event.pageX < mapRef.current.offsetLeft + mapRef.current.scrollWidth &&
				event.pageY > mapRef.current.offsetTop &&
				event.pageY < mapRef.current.offsetTop + mapRef.current.scrollHeight
			) {
				const tokenDataTemp = tokenData;
				const x = (event.pageX - mapRef.current.offsetLeft) / mapRef.current.clientWidth;
				const y = (event.pageY - mapRef.current.offsetTop) / mapRef.current.clientHeight;
				if (entityDrag.group && groupsData[entityDrag.entityId]) {
					const groups = [...groupsData];
					groups[entityDrag.entityId]?.members.forEach((member) => {
						tokenDataTemp[member] = {
							x,
							y,
							map: mapName,
							showMouvement: tokenDataTemp[entityDrag.entityId]?.showMouvement || 0,
							group: entityDrag.entityId,
						};
					});
					groups[entityDrag.entityId] = {
						position: {
							x,
							y,
							map: mapName,
						},
						members: groups[entityDrag.entityId]?.members || [],
					};
					setGroupsData(groups);
				} else if (!isGrouping) {
					if (tokenDataTemp[entityDrag.entityId]?.group !== -1) {
						ungroupToken(entityDrag.entityId);
					}
					tokenDataTemp[entityDrag.entityId] = {
						x,
						y,
						map: mapName,
						showMouvement: tokenDataTemp[entityDrag.entityId]?.showMouvement || 0,
						group: -1,
					};
				}
				setTokenData([...tokenDataTemp]);
			}
		}
	};
	const ungroupToken = (characterId: number) => {
		const tokenDataTemp = tokenData;
		const groupsDataTemp = groupsData;
		const character = tokenDataTemp[characterId];
		if (character) {
			const group = groupsDataTemp[character.group];
			if (group) {
				const characterIndex = group.members.indexOf(characterId);
				if (characterIndex !== -1) {
					group.members.splice(characterIndex, 1);
				}
			}
			if (groupsDataTemp[character.group]?.members.length === 1) {
				const lastCharacterIndex = groupsDataTemp[character.group]?.members[0];
				if (lastCharacterIndex !== undefined) {
					const lastCharacter = tokenDataTemp[lastCharacterIndex];
					if (lastCharacter) lastCharacter.group = -1;
				}
				groupsData[character.group] = undefined;
			}
			character.group = -1;
		}
		setTokenData(tokenDataTemp);
		setGroupsData(groupsDataTemp);
	};
	const groupTokens = (entityId: number, group?: boolean) => {
		const tokenDataTemp = tokenData;
		const groupsDataTemp = groupsData;
		const characterB = tokenDataTemp[entityId];
		const groupB = groupsDataTemp[entityId];
		if (
			(group && entityDrag.group !== group) ||
			(entityId !== entityDrag.entityId &&
				((entityDrag.group &&
					!groupsData[entityDrag.entityId]?.members.some((member) => entityId === member)) ||
					!entityDrag.group))
		) {
			if (entityDrag.group) {
				const groupA = groupsData[entityDrag.entityId];
				if (groupA) {
					if (group && groupB) {
						groupB.members.push(...groupA.members);
						groupsData[entityDrag.entityId] = undefined;
						groupA.members.forEach((memberId) => {
							const member = tokenData[memberId];
							if (member) {
								member.group = entityId;
								member.x = groupB.position.x;
								member.y = groupB.position.y;
							}
						});
					} else if (characterB) {
						groupA.members.push(entityId);
						groupA.position.x = characterB.x;
						groupA.position.y = characterB.y;
						characterB.group = entityDrag.entityId;
						groupA.members.forEach((memberId) => {
							const member = tokenData[memberId];
							if (member) {
								member.x = characterB.x;
								member.y = characterB.y;
							}
						});
					}
				}
			} else {
				if (!tokenDataTemp[entityDrag.entityId]) {
					tokenDataTemp[entityDrag.entityId] = {
						x: group ? groupB?.position.x || -1 : characterB?.x || -1,
						y: group ? groupB?.position.y || -1 : characterB?.y || -1,
						map: mapName,
						showMouvement: 0,
						group: group ? entityId : -1,
					};
				}
				const characterA = tokenDataTemp[entityDrag.entityId];
				if (characterA) {
					if (group && groupB) {
						groupB.members.push(entityDrag.entityId);
						characterA.group = entityId;
						characterA.x = groupB.position.x;
						characterA.y = groupB.position.y;
					} else if (characterB) {
						for (let i = 0; true; i++) {
							if (!groupsData[i]) {
								characterB.group = i;
								characterA.group = i;
								characterA.x = characterB.x;
								characterA.y = characterB.y;
								groupsDataTemp[i] = {
									members: [entityDrag.entityId, entityId],
									position: {
										x: characterB.x,
										y: characterB.y,
										map: mapName,
									},
								};
								break;
							}
						}
					}
				}
			}
			setGroupsData([...groupsDataTemp]);
			setTokenData([...tokenDataTemp]);
			createTokens();
		}
	};
	const createTokens = () => {
		if (mapRef?.current) {
			pcs.forEach((pc, index) => {
				if (tokenData[index] && tokenData[index]?.group === -1) {
					if (tokenData[index]?.map === mapName) {
						const player = players[players.findIndex((player) => pc.player === player.id)];
						tokens[index] = (
							<Token
								onGroup={() => (isGrouping = true)}
								placeEntity={placeEntity}
								groupTokens={groupTokens}
								index={index}
								onEntityDrag={setEntityDrag}
								showMouvement={tokenData[index]?.showMouvement === 1}
								mouvement={
									(speedMoocked[contextValue.speed].speedMod *
										landsMoocked[contextValue.land].speedMod *
										(contextValue.duration + 1)) /
									(scale * 30)
								}
								onContextMenu={(e) => openContextMenu(e, index)}
								hidden={
									!(
										playersSorted.length === 0 ||
										playersSorted.some((playersSorted) => playersSorted === player.name)
									)
								}
								pc={pcs[index]}
								key={pc.name}
								pos={tokenData[index] || { x: 0, y: 0 }}
							/>
						);
					}
				}
			});
			groupsData.forEach((group, index) => {
				if (groupsData[index] && groupsData[index]?.position.map === mapName) {
					groups[index] = (
						<Token
							onGroup={() => (isGrouping = true)}
							placeEntity={placeEntity}
							charactersData={pcs}
							groupData={groupsData[index]}
							groupTokens={groupTokens}
							index={index}
							onEntityDrag={setEntityDrag}
							showMouvement={tokenData[index]?.showMouvement === 1}
							mouvement={
								(speedMoocked[contextValue.speed].speedMod *
									landsMoocked[contextValue.land].speedMod *
									(contextValue.duration + 1)) /
								(scale * 30)
							}
							onContextMenu={(e) => openContextMenu(e, index)}
							hidden={
								!(
									playersSorted.length === 0 ||
									playersSorted.some((currentPlayer) =>
										groupsData[index]?.members.some(
											(currentMember) => pcs[currentMember].player === currentPlayer
										)
									)
								)
							}
							key={index}
							pos={groupsData[index]?.position || { x: 0, y: 0 }}
						/>
					);
				}
			});
		}
	};
	useEffect(() => {
		if (height > 0) {
			createTokens();
			setContextValue({ ...contextValue });
		} else {
			setTimeout(function () {
				setHeight(mapRef?.current?.clientHeight || height - 1);
			}, 500);
		}
	}, [height]);

	createTokens();
	return (
		<>
			<div className="relative overflow-hidden" ref={mapRef}>
				<img
					draggable={false}
					onDrag={(e) => e.preventDefault()}
					onDragEnter={(e) => e.preventDefault()}
					onDragOver={(e) => e.preventDefault()}
					onDrop={(e) => {
						e.preventDefault();
						placeEntity(e);
					}}
					onContextMenu={(e) => openContextMenu(e)}
					className="self-start max-h-[800px]"
					src={img}
					alt={mapName}
				/>
				{tokens}
				{groups}
			</div>
			<div className="flex gap-16 mt-4 w-full">
				<ShortSelect
					textEmpty="Filtrer par joueur"
					options={players.map((player) => player.name)}
					value={playersSorted.map((el) => players.findIndex((player) => player.name === el))}
					onChange={handleChange}
				/>
			</div>
			<div className="flex gap-16 mt-4 w-full pb-5 pl-5 min-h-[100px]">
				{pcs.map((pc, index) => {
					const player = players[players.findIndex((player) => pc.player === player.id)];
					return player ? (
						<MapButton
							onPcDrag={() => setEntityDrag({ entityId: index, group: false })}
							hidden={
								!(
									playersSorted.length === 0 ||
									playersSorted.some((selectedPc) => selectedPc === player.name)
								) ||
								(!!tokenData[index] && tokenData[index]?.map === mapName)
							}
							key={index}
							name={pc.name}
							picture={pc.img}
						/>
					) : (
						<></>
					);
				})}
			</div>
			{(auth?.user.info?.role === 'admin' || auth?.user.info?.role === 'gm') && (
				<PrimaryButton
					className="mt-4"
					text="Mettre à jour les placements"
					onClick={() => handleSend(tokenData)}
				/>
			)}
			{contexMenu !== null && (
				<ContextMenu
					data={contextMenu}
					onChange={handleContextMenuChange}
					pcIndex={contexMenu.pcIndex}
					y={contexMenu.y}
					x={contexMenu.x}
					onClose={() => setContextMenu(null)}
				/>
			)}
		</>
	);
};

export default Map;
