import './Button.css'
import Box from '../assets/admin.svg'

function Button({text, icon, updateAdmin}) {
    return (
        <button onClick={() => updateAdmin}>
        <img src={icon} alt="" />
        {text}
        </button>

    )
}

export default Button