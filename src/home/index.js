import "./index.css";

const HomeComponent = () => {
    return (
        <div>
            <div>
                <h1>SymFolio</h1>
            </div>
            <div className="list-group">
                <div className="list-group-item">
                    <div className="row">
                        <img className="col-1 rounded-circle" src="./images/catjam.jpg" width="50px" height="50px"/>
                        <span className="sf-font-bold col-3">Hello
                        <span className="sf-font-normal"> @hello</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;