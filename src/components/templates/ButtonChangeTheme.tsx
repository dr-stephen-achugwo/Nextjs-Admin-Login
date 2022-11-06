import { IconeMoon, IconeSun } from "../icons/index"

interface ButtonChangeThemeProps{
    tema: string
    alternarTema: () => void
}

export default function ButtonChangeTheme(props: ButtonChangeThemeProps){

    return props.tema === 'dark' ? (
        <div onClick={props.alternarTema} className={`
            hidden sm:flex item-center cursor-pointer
            bg-gradient-to-r from-yellow-300 to-yellow-600
            w-14    lg:w-24 h-8 p-1  rounded-full
        `}>
            <div className={` 
                flex items-center justify-center
                bg-white text-yellow-600 
                w-6 h-6 rounded-full
            `}>
                {IconeSun(4)}
            </div> 
            <div className={` 
                hidden lg:flex items-center ml-4
                text-white
            `}>
                <span className="text-sm">Light</span>
            </div>

        </div>
    ) : (
        <div onClick={props.alternarTema} className={`
            hidden sm:flex item-center justify-end cursor-pointer
            bg-gradient-to-r from-gray-500  to-gray-900
            w-14    lg:w-24 h-8 p-1  rounded-full
        `}>
        <div className={` 
            hidden lg:flex items-center mr-2
            text-yellow-200
        `}>
            <span className="text-sm">Dark</span>
        </div>
        <div className={` 
            flex items-center justify-center
            bg-black text-yellow-300 
            w-6 h-6 rounded-full
        `}>
            {IconeMoon(4)}
        </div> 


    </div>
    )
}