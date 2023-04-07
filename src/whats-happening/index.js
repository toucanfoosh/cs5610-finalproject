import "./index.css";

const WhatsHappening = ({ currentUser }) => {
    return (
        <div className="sf-padding-20 row">
            <div className="col-1">
                <img className='rounded-circle' src={`./images/catjam.jpg`} height='50px' width='50px' />
            </div>
            <div className="ms-2 col-10">
                <textarea className="form-control" placeholder="What's happening?"></textarea>
            </div>
        </div>
    )
}

export default WhatsHappening;