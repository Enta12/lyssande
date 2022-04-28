import Input from '../../components/input'
import InputSelect from '../../components/inputSelect'


const AddPj = () => {
    return (
        <div className="p-8 flex flex-col bg-orange/[.8] w-5/12 rounded-3xl justify-around items-center">
            <h1 className="font-bubblegum text-swamp text-3xl">- CREATIION D'UN PERSONNAGE -</h1>
            <form className='pt-8 w-full flex flex-col items-center'>
                <Input height="1" placeholder="Nom du personnage" type="text"/>
                <InputSelect height="1" placeholder={"Classe"} options={[]}/>
                <InputSelect height="1" placeholder={"Race"} options={[]}/>
                <InputSelect height="1" placeholder={"Race"} options={[]}/>
                <Input height="1" placeholder="Niveau du personnage" type="number"/>
                <Input height="1" placeholder="Nombre de PO" type="number"/>
                <Input height="1" placeholder="image" type="file"/>
            </form>
        </div>
    )
}

export default AddPj