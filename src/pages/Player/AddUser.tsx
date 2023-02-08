import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Input, InputSelect, PrimaryButton, Title } from 'components';
import { useApi } from 'hooks';
import { roles } from 'moockedData';

// TODO Delete this function when the back create password
const createPassword = (
	lenght: number,
	activateMAJ: boolean,
	activateMin: boolean,
	activateNumber: boolean
) => {
	let array = '';
	let password = '';
	if (activateMAJ) {
		array += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	}
	if (activateMin) {
		array += 'abcdefghijklmnopqrstuvwxyz';
	}
	if (activateNumber) {
		array += '01234567890123456789';
	}
	for (let i = 0; i < lenght; i++) {
		password += array[Math.floor(Math.random() * array.length)];
	}
	return password;
};

const AddUser = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [role, setRole] = useState(0);
	const [password, setPassword] = useState(createPassword(5, true, true, true));
	const api = useApi();
	const submit = async () => {
		try {
			navigator.clipboard.writeText(password);
			const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
			if (!email.match(pattern)) {
				toast.error('Email pas au bon format');
				return;
			}
			if (!name) {
				toast.error('Nom obligatoire');
				return;
			}
			await api.post('/auth/signup', {
				email,
				role: roles[role],
				name,
				password,
			});
			toast.success(`${name} créer avec succès`);
		} catch (error: any) {
			if (error.name === 'ValidationError') {
				toast.error('Un utilisateur avec ce mail existe déjà');
			} else toast.error("Erreur lors de la création de l'utilisateur");
		}
	};
	return (
		<div className="flex flex-col  items-center gap-4 font-bubblegum text-brown">
			<Title title="Crétion d'un utilisateur" />
			<Input
				required
				placeholder="Sank Nonk"
				type="text"
				onChange={(e) => setName(e.target.value)}
				value={name}
				label="Nom"
			/>
			<Input
				required
				placeholder="example@lyssande.fr"
				type="text"
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				label="Email"
			/>
			<InputSelect
				required
				title="Role"
				options={roles}
				values={[role]}
				onSelectValue={(value) => setRole(value[0])}
				className="w-3/4 h-20"
			/>
			<>
				Son mot de passe sera (copier dans le presse papier):
				<Input
					required
					placeholder="password"
					type="text"
					onChange={(e) => setPassword(e.target.value)}
					value={password}
					label="Mot de passe"
				/>
				<PrimaryButton text="Créer l'utilisateur" onClick={submit} />
			</>
		</div>
	);
};

export default AddUser;
