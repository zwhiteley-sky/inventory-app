import information from '../assets/information.svg'
import pineapple from '../assets/pineapple.png'
import './Card.css'

function Card() {
    return(
        <div className="card">
            <span className="card-header">
                <h2 className="card-title">Pineapple</h2>
                <h3 className="card-price">£0.65</h3>
            </span>
            <img className="card-image" src={pineapple} alt="" />
            <div className="card-footer">
                <img className="card-info" src={information} alt="" />
                <h4 className="card-quantity">732x</h4>
            </div>
        </div>
    )
}

export default Card;