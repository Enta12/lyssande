import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from 'components/Input/Input';
import PrimaryButton from 'components/Primary-button';
import { useApi, useAuth } from 'hooks';
import background from 'assets/images/login-background.png';

const Login = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const api = useApi();
	const auth = useAuth();
	const navigate = useNavigate();

	const isEmail = () => {
		const pattern = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		return email.match(pattern);
	};

	const handleClick = async () => {
		if (!isEmail()) {
			toast.error(email ? "L'email n'est pas au bon format" : "L'email est obligatoire");
			return;
		}
		if (!password) {
			toast.error('Mot de passe obligatoire');
			return;
		}
		try {
			const res = await api.post('/auth/login', {
				email,
				password,
			});
			auth?.dispatch({ type: 'login', payload: { jwt: res.data.token } });
			navigate('/');
		} catch (error) {
			toast.error('Login ou mot de passe incorrect');
		}
	};
	return (
		<div
			className="
      min-h-screen
      bg-cover
      h-full
      flex
      items-center
      justify-center
      relative
      overflow-hidden
    "
		>
			<img src={background} alt="Session" className="absolute min-h-screen bottom-0 object-cover" />
			<form
				className="
        flex
        flex-col
        bg-orange/[.8]
        w-full md:w-6/12
        h-screen md:h-3/4
        md:rounded-3xl
        gap-4
        pt-24 md:pt-12 md:pb-24
        items-center
        relative
        max-w-4-md
        z-10
      "
			>
				<Input
					required
					value={email}
					label="Email"
					placeholder="example@lyssande.fr"
					type="email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<Input
					label="Mot de passe"
					value={password}
					required
					onChange={(e) => setPassword(e.target.value)}
					type="password"
				/>
				<PrimaryButton onClick={handleClick} text={'Connexion'} />
			</form>
		</div>
	);
};

export default Login;
