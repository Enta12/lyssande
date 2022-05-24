import Input from "../../components/input"
import PrimaryButton from "../../components/primary-button"

const Login = () => {
    return (
        <div className="bg-cover h-full bg-[url('pages/login/login-background.png')] flex items-center justify-center">
            <form className="pt-8 pb-28 flex flex-col bg-orange/[.8] h-3/4 w-5/12 rounded-3xl justify-around items-center">
                <Input placeholder="Identifiant" type="text" />
                <Input placeholder="Mot de passe" type="password" />
                <PrimaryButton text={"Connexion"}/>
            </form>
        </div>
    )
}

export default Login