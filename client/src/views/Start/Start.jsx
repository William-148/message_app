import "./Start.css";
import image from "@/assets/img/connection.png"

const Start = () => {
    return (
        <div className="start-body">
            <div className="start-container">
                <div className="start-title">
                    <h2>Find a community on</h2>
                    <h1>Message</h1>
                    <h1>Faker</h1>
                </div>
                <div className="start-img">
                    <img src={image} alt="image" />
                </div>
            </div>
        </div>
    )
}

export default Start;