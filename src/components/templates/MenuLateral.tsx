import useAuth from "../../data/hook/useAuth";
import { IconeAjustes, IconeHome, IconeSair, IconeSino } from "../icons/index";
import { Logo } from "./Logo";
import MenuItem from "./MenuItem";


export default function MenuLateral() {

    const {logout} = useAuth()

    return (
        <aside className={`
        flex flex-col 
        bg-gray-200 text-gray-700
        dark:bg-gray-900 
        `}>
            <div className={`
                flex flex-col items-center justify-center 
                bg-gradient-to-r from-indigo-500 to-purple-800
                h-20 w-20 
            `}>
                <Logo />
            </div>
            <ul className="flex-grow">
                <MenuItem url ="/"  texto="Home" icone = {IconeHome}/>
                <MenuItem url ="/adjust"  texto="Adjust" icone = {IconeAjustes}/>
                <MenuItem url ="/notifications"  texto="News" icone = {IconeSino}/>
                
            </ul>
            <ul>

                <MenuItem  
                    texto="Exit" icone = {IconeSair}
                    onClinck = {logout }
                    className = {`
                        text-red-600  dark:text-red-400
                        hover:bg-red-400 hover:text-white
                        dark:hover:text-white
                    `}    
                />
            </ul>
        </aside>
    )

}