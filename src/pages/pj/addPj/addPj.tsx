import Input from '../../../components/input';
import InputSelect from '../../../components/inputSelect';
import Title from '../../../components/title';
import React, {useEffect, useState} from 'react';
import AlignmentInput from './AlignmentInput';
import TextInput from '../../../components/textInput';
import {
  culteMoocked,
  jobsMoocked,
  lawsMoocked,
  moralsMoocked,
  racesMoocked,
} from '../../../moockedData';
import FileInput from '../../../components/fileInput';
import {PrimaryButton} from '../../../components';
import axios from '../../../api/axios';
import {useNavigate, useParams} from 'react-router-dom';

const AddPj = () => {
  const [culte, setCulte] = useState<number | undefined>();
  const [job, setJob] = useState<number | undefined>();
  const [race, setRace] = useState(0);
  const [name, setName] = useState('');
  const [level, setLevel] = useState(1);
  const [gold, setGold] = useState(0);
  const [moral, setMoral] = useState(0);
  const [law, setLaw] = useState(0);
  const [story, setStory] = useState('');

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/characters/${params.id}`);
      if (res.data.id) {
        if (res.data.culte) setCulte(culteMoocked.indexOf(res.data.culte));
        if (res.data.job) setJob(jobsMoocked.indexOf(res.data.job));
        setRace(racesMoocked.indexOf(res.data.race));
        setName(res.data.name);
        setLevel(res.data.level);
        setGold(res.data.gold);
        setMoral(moralsMoocked.indexOf(res.data.alignment.moral));
        setLaw(lawsMoocked.indexOf(res.data.alignment.law));
        setStory(res.data.story);
      }
    };
    if (params.id) {
      fetchData();
    }
  }, [params]);

  // eslint-disable-next-line no-unused-vars
  const saveCharacter = () => {
    if (
      name &&
      racesMoocked[race] &&
      level > 0 &&
      level < 30 &&
      gold >= 0 &&
      moral >= 0 &&
      moral < 3 &&
      law >= 0 &&
      law < 3
    ) {
      const body = {
        player: 1,
        name,
        culte: culte ? culteMoocked[culte] : undefined,
        job: job ? jobsMoocked[job] : undefined,
        race: racesMoocked[race],
        level,
        gold,
        alignment: {
          moral: moralsMoocked[moral],
          law: lawsMoocked[law],
        },
        story,
      };
      console.log('params.id', !!params.id, params.id);
      if (params.id) {
        axios.put(
            '/characters',
            [{...body, id: params.id}],
        );
      } else {
        axios.post(
            '/characters',
            body,
        );
      }
      navigate('/');
    }
  };

  return (
    <div className="
      p-8
      flex
      flex-col
      bg-orange/[.8]
      w-full
      rounded-3xl
      justify-around
      items-center
    ">
      <Title title="CREATIION D'UN PERSONNAGE"/>
      <div className='pt-8 w-full flex justify-between mb-6'>
        <div className='
          flex
          flex-col
          gap-3
          justify-between
          items-center
          flex-1
        '>
          <Input
            placeholder="Nom du personnage"
            type="text"
            value={name}
            setValueString={setName}
          />
          <InputSelect
            title={'Metier'}
            height='16'
            options={jobsMoocked}
            handleChange={(newValue) => setJob(newValue)}
            value={job}
          />
          <InputSelect
            title={'Race'}
            height='16'
            options={racesMoocked}
            handleChange={(newValue) => setRace(newValue)}
            value={race}
          />
          <Input
            placeholder="Niveau du personnage"
            type="number"
            value={level}
            setValueNumber={(newValue) => setLevel(parseInt(newValue))}
          />
          <Input
            placeholder="Nombre de PO"
            type="number"
            value={gold}
            setValueNumber={(newValue) => setGold(parseInt(newValue))}
          />
          <FileInput text="PHOTO" />
        </div>
        <div className='
          flex
          flex-col
          gap-4
          justify-around
          flex-1
          h-full
        '>
          <AlignmentInput
            moral={moral}
            law={law}
            setMoral={setMoral}
            setLaw={setLaw}
          />
          <InputSelect
            title={'Culte'}
            height='16'
            options={culteMoocked}
            handleChange={(newValue) => setCulte(newValue)}
            value={culte}
          />
          <TextInput
            value={story}
            setValue={setStory}
            placeholder="Histoire du personnage"
          />
        </div>
      </div>
      <PrimaryButton
        text="Envoyrer"
        onClick={() => saveCharacter()}
      />
    </div>
  );
};

export default AddPj;
