import "./Waiting.css"
import image from "../../../assets/img/wolf.png"
export default function Waiting(){
    return (
        <div className="waiting-conteiner">
            <section className="waiting-body">
                <div className="waiting-logo">
                    <img src={image} alt="" />
                </div>
                <h1 className="waiting-title">Message Faker</h1>
                <p className="waiting-description">
                    You can send messages to people who are online.
                </p>
                <p className="waiting-description">
                    Select a room to start.
                </p>
            </section>
        </div>
    )
}