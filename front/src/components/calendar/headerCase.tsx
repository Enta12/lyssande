const HeaderCase = ({firstLine, secondLine} : {firstLine: string, secondLine?: string}) => {
    return(
    <th className="w-40 flex-col justify-center items-center">
        {firstLine}
        {
            secondLine && <><br/>{secondLine}</>
        }
    </th>
    )
}

export default HeaderCase