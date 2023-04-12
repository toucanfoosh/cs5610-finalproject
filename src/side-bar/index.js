import './index.css';
import '../index.css';

const SideBar = () => {
    return (
        <div className='sf-top-0 sf-searchbar-container'>
            <div className="d-flex justify-content-center py-3">
                <div className='sf-searchbar'>
                    <input type="text" placeholder='Search...' className="sf-searchbar-text" />
                    <button className="sf-searchbar-button"><i class="fa fa-search"></i></button>
                </div>
            </div>
        </div>
    )
};

export default SideBar;