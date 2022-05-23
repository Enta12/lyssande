import Input from '../../components/input'
import InputSelect from '../../components/inputSelect'
import Title from '../../components/title'


const AddPj = () => {
    return (
        <div className="p-8 flex flex-col bg-orange/[.8] w-5/12 rounded-3xl justify-around items-center">
            <Title title="CREATIION D'UN PERSONNAGE"/>
            <form className='pt-8 w-full flex flex-col items-center gap-5'>
                <Input height="24" placeholder="Nom du personnage" type="text"/>
                <InputSelect height="24" placeholder={"Classe"} options={[]}/>
                <InputSelect height="24" placeholder={"Race"} options={[]}/>
                <InputSelect height="24" placeholder={"Alignement"} options={[]}/>
                <Input height="24" placeholder="Niveau du personnage" type="number"/>
                <Input height="24" placeholder="Nombre de PO" type="number"/>
                <Input height="24" type="file"/>
            </form>
        </div>
    )
}

export default AddPj