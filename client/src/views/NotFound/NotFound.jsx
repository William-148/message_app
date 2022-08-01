
import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound () {
    return (
        <div className="notfound">
            <div className="wrapper">
                <h1>Hmm.</h1>
                <p>It seems that you're lost in a perpetual black hole. Let us help guide you out and get you back home.</p>
                <div className="buttons">
                    <Link to="/" className="notfound-link">Home</Link>
                    <br />
                    <span>Help me out</span>
                </div>
            </div>
            <div className="space">
                <div className="blackhole"></div>
                <div className="ship"></div>
            </div>
        </div>
    )
}