import './index.css'
import '../index.css'
import { Link } from 'react-router-dom'

const ReviewItem = ({ item, show = false }) => {
    console.log(item)
    return (
        <div className="flex-column sf-bottom-border px-2 p-2">
            <div className="d-flex justify-content-between px-3">
                <div className="d-flex flex-column sf-w-100">
                    <div className='flex-row d-flex justify-content-between'>
                        <div className='d-flex flex-column justify-content-between pb-1'>
                            <Link to={`/profile/other/${item.userId}`} className="sf-underline-hover">
                                <span className='sf-accent'>{item.username}</span>
                                <span className='sf-tertiary'> @{item.handle}</span>
                            </Link>
                            <div className='sf-secondary'>{item.review}</div>
                        </div>
                        <div className='d-flex flex-column text-end'>
                            <div className='sf-secondary fw-bold fs-4'>Score: {item.score}</div>
                            {show ? <Link to={`/search/album/${item.albumId}`} className="sf-accent">{item.albumName} by {item.albumMainArtist}</Link> : ""}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewItem