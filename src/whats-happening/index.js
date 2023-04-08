import "./index.css";

const WhatsHappening = () => {
    return (
        <div className="sf-padding-20 row">
            <div className="col-2 col-md-1">
                <img className='rounded-circle' src={`./images/catjam.jpg`} height='50px' width='50px' />
            </div>
            <div className="ms-2 col-9 col-md-10">
                <textarea className="sf-text-area-no-resize form-control" placeholder="What's happening?"></textarea>
            </div>
            <div className="sf-center sf-frame">
                <button className="mt-2 sf-custom-btn sf-btn-1">
                    <span>Post</span>
                </button>
            </div>
        </div>
    )
}

export default WhatsHappening;