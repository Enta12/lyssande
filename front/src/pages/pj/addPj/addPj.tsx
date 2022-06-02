import FileInput from '../../../components/fileInput'
import Input from '../../../components/input'
import InputSelect from '../../../components/inputSelect'
import TextInput from '../../../components/textInput'
import Title from '../../../components/title'
import { racesMocked, jobsMocked } from '../../../moockedData'
import AlignmentInput from './AlignmentInput'


const AddPj = () => {
    return (
        <div className="p-8 flex flex-col bg-orange/[.8] w-full rounded-3xl justify-around items-center">
            <Title title="CREATIION D'UN PERSONNAGE"/>
            <form className='pt-8 w-full flex flex-col items-center gap-5'>
                <Input height="24" placeholder="Nom du personnage" type="text"/>
                <InputSelect height="24" title={"Classe"} options={racesMocked}/>
                <InputSelect height="24" title={"Race"} options={jobsMocked}/>
                <AlignmentInput />
                <Input height="24" placeholder="Niveau du personnage" type="number"/>
                <Input height="24"  placeholder="Nombre de PO" type="number"/>
                <FileInput text="PHOTO" height="24" />
                <TextInput placeholder="HISTOIRE" />
            </form>
        </div>
    )
}

export default AddPj