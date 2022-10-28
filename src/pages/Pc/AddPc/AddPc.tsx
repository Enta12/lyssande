/* eslint-disable sonarjs/cognitive-complexity */
import { DataCastingContainer, Input, InputSelect, TextInput } from 'components';
import Title from 'components/Title';
import React, { useEffect, useState } from 'react';
import AlignmentInput from './AlignmentInput';
import { culteMoocked, jobsMoocked, lawsMoocked, moralsMoocked, racesMoocked } from 'moockedData';
// import FileInput from 'components/fileInput';
import { PrimaryButton } from 'components';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useApi from 'hooks/useApi';

const textExternCreate =
	"Si vous n'avez pas de personnage vous pouvez en créer un grâce à l'outil disponible ";

const AddPc = () => {
	const [culte, setCulte] = useState<number | undefined>();
	const [job, setJob] = useState<number | undefined>();
	const [race, setRace] = useState(0);
	const [name, setName] = useState('');
	const [level, setLevel] = useState<number | undefined>();
	const [gold, setGold] = useState<number | undefined>();
	const [moral, setMoral] = useState(1);
	const [law, setLaw] = useState(1);
	const [story, setStory] = useState('');
	const [img, setImg] = useState('');
	const [loading, setLoading] = useState(true);

	const api = useApi();
	const params = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await api.get(`/characters/${params.id}`);
				if (res.data.id) {
					if (res.data.culte) setCulte(culteMoocked.indexOf(res.data.culte));
					if (res.data.job) setJob(jobsMoocked.indexOf(res.data.job));
					setRace(racesMoocked.indexOf(res.data.race));
					setName(res.data.name);
					setLevel(res.data.level);
					setGold(res.data.gold);
					setImg(res.data.img);
					setMoral(moralsMoocked.indexOf(res.data.alignment.moral));
					setLaw(lawsMoocked.indexOf(res.data.alignment.law));
					setStory(res.data.story);
					setLoading(false);
				}
			} catch {
				toast.error('Impossible de charger les informations du personnage');
			}
		};
		if (params.id) {
			fetchData();
		}
	}, [params]);

	const saveCharacter = async () => {
		if (!name) {
			toast.error('Le personnage doit avoir un nom');
			return;
		}
		if (!level) {
			toast.error('Veuillez saisir un nombre pour le niveau');
			return;
		}
		if (!gold) {
			toast.error("Veuillez entrer le nombre de pièce d'or");
			return;
		}
		if (level && !(level > 0)) {
			toast.error('Le niveau doit être supérieur à 0');
			return;
		}
		if (level && !(level < 31)) {
			toast.error('Le niveau doit être inférieur à 31');
			return;
		}
		if (gold && gold < 0) {
			toast.error("L'or ne peut être négatif");
			return;
		}
		const body = {
			name,
			culte: culte ? culteMoocked[culte] : [],
			job: job ? jobsMoocked[job] : [],
			race: racesMoocked[race],
			level,
			gold,
			img,
			alignment: {
				moral: moralsMoocked[moral],
				law: lawsMoocked[law],
			},
			story,
		};
		try {
			await (params.id
				? api.put('/characters', [{ ...body, id: params.id }])
				: api.post('/characters', body));
			toast.success(params.id ? `${name} mis à jour avec succès` : `${name} créé avec succès`);
			navigate('/');
		} catch (error) {
			toast.error(`Erreur lors de la ${params.id ? 'mise à jour' : 'création'}`);
		}
	};

	return (
		<DataCastingContainer
			status={loading ? 'loading' : 'data'}
			dataElements="informations du personnages"
		>
			<div
				className="
                    p-8
                    flex
                    flex-col
                    bg-orange/[.8]
                    w-full
                    rounded-3xl
                    justify-around
                    items-center
                "
			>
				<Title title={`${params.id ? 'MISE A JOUR' : 'CREATION'} D'UN PERSONNAGE`} />
				<div className="pt-8 w-full flex justify-between mb-6">
					<div
						className="
                            flex
                            flex-col
                            gap-3
                            justify-between
                            items-center
                            flex-1
                        "
					>
						<Input
							required
							placeholder="Sank Nonk"
							label="Nom"
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<InputSelect
							title={'Metier'}
							options={jobsMoocked}
							onSelectValue={(newValue) => {
								setJob(newValue[0]);
							}}
							values={[job]}
							placeholder="Aucun"
							className="w-3/4 h-20"
						/>
						<InputSelect
							required
							title={'Race'}
							options={racesMoocked}
							values={[race]}
							onSelectValue={(newValue) => setRace(newValue[0])}
							className="w-3/4 h-20"
						/>
						<Input
							required
							placeholder="1"
							label="Niveau"
							type="number"
							value={level}
							onChange={(e) => setLevel(parseInt(e.target.value))}
						/>
						<Input
							label="Or (en PO)"
							placeholder="0"
							required
							type="number"
							value={gold}
							onChange={(e) => setGold(parseInt(e.target.value))}
						/>
						<Input
							placeholder="https://example.com"
							label="Lien de l'image"
							type="text"
							value={img}
							onChange={(e) => setImg(e.target.value)}
						/>
						{/*
                            TODO update to file input
                            <FileInput text="PHOTO" />
                        */}
					</div>
					<div
						className="
                            flex
                            flex-col
                            gap-4
                            justify-around
                            flex-1
                            h-full
                        "
					>
						<AlignmentInput moral={moral} law={law} setMoral={setMoral} setLaw={setLaw} />
						<InputSelect
							title={'Culte'}
							options={culteMoocked}
							onSelectValue={(newValue) => setCulte(newValue[0])}
							values={[culte]}
							placeholder="Aucun"
							className="w-3/4 h-20"
						/>
						<TextInput
							value={story}
							onChange={(e) => setStory(e.target.value)}
							placeholder="Il était une fois.."
							label="Histoire du personnage"
						/>
					</div>
				</div>
				{!params.id && (
					<p className="mb-4 text-lg text-bubblegum text-swamp font-semibold">
						{textExternCreate}
						<a
							className="
                font-bold
                hover:underline
                "
							href="http://naheulbeuk-db.byethost9.com/charactersheet/charactersheet"
						>
							ici
						</a>
					</p>
				)}
				<PrimaryButton text="Enregistrer" onClick={() => saveCharacter()} />
			</div>
		</DataCastingContainer>
	);
};

export default AddPc;
