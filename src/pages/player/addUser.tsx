import React, {useState} from 'react';
import {toast} from 'react-toastify';
import {Input, InputSelect, PrimaryButton, Title} from '../../components';
import useApi from '../../hook/useApi';
import {roles} from '../../moockedData';

// TODO Supress this function when the back create password
const createPassword = (
    lenght: number,
    activateMAJ: boolean,
    activateMin: boolean,
    activateNumber: boolean,
) => {
  let array = ''; let password = '';
  if (activateMAJ) {
    array += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  }
  if (activateMin) {
    array += 'abcdefghijklmnopqrstuvwxyz';
  }
  if (activateNumber) {
    array += '01234567890123456789';
    // On répète 2 fois les chiffres sinon ils sortent rarement
  }
  for (let i=0; i<lenght; i++) {
    password += array[Math.floor(Math.random()*array.length)];
  }
  navigator.clipboard.writeText(password);
  return password;
};

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(0);
  const [password, setPassword] = useState('');
  const api = useApi();
  const submit = async () => {
    try {
      const pattern =
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (!email.match(pattern)) {
        toast.error('Email pas au bon format');
        return;
      }
      await api.post('/auth/signup', {
        email,
        role: roles[role],
        name,
        password,
      });
      toast.success(`${name} créer avec succés`);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div
      className='flex flex-col  items-center gap-4 font-bubblegum text-brown'
    >
      <Title title="Crétion d'un utilisateur" />
      <Input
        type="text"
        setValueString={setName}
        value={name}
        placeholder="Name"
      />
      <Input
        type="text"
        setValueString={setEmail}
        value={email}
        placeholder="Email"
      />
      <InputSelect
        options={roles}
        value={role}
        handleChange={(value) => value && setRole(value)}
      />
      {
        password ?
        <>
          Son mot de passe sera (copier dans le presse papier):
          <span
            className='
              border-4
              rounded-xl
              border-gray-200
              bg-white
              p-2
              flex
              w-max
              justify-center'
          >
            {password}
          </span>
          <PrimaryButton
            text="Créer l'utilisateur"
            onClick={submit}
          />
        </> :
        <PrimaryButton
          text='généré un mot de passe'
          onClick={() => setPassword(createPassword(5, true, true, true))}
        />
      }
    </div>
  );
};

export default AddUser;
