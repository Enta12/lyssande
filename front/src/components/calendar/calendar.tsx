import HeaderCase from "./headerCase";
import Checkbox from "./checkbox";

type Availability = "no" | "yes" | "maybe"
type PossibleDate = {
    date: Date,
    moment: "soirée" | "journée"
}

const mounths = ["jan.", "fev.", "mars", "avr.", "mai", "juin", "juil.", "aout", "sept.", "oct.", "nov." ];
const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

type Props = {
    isEditable? : boolean
};

const Calendar = ({dates, availability} : {dates: PossibleDate[], availability: Availability[]}) => {
    return (
        <table>
            <thead>
                <tr className='flex p-4'>
                    {<HeaderCase firstLine="DATES" />}
                    {dates.map(currentDate => {
                        return(
                            <>
                                <HeaderCase firstLine={`${days[currentDate.date.getDay()]} ${currentDate.date.getDate()} ${mounths[currentDate.date.getMonth()]}` } secondLine={`en ${currentDate.moment}`} />
                            </>
                        )
                    })}
                </tr>
            </thead>
            <tbody>
                <tr className='mb-4 flex p-4 bg-brown'>
                    <td className="w-40 flex flex-col justify-center items-center" > MES DISPO :</td>
                    {availability.map( (dayAvailability) => {
                        return(
                            <>
                                <Checkbox isEditable={true} checkboxState={dayAvailability} />
                            </>
                        )
                    })}
                </tr>
            </tbody>
            
                
        </table>

    )
}



export default Calendar