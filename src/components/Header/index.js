import { RiHeadphoneFill } from 'react-icons/ri';
import { RiMusic2Fill } from 'react-icons/ri';
import './index.css'

export default function Header(props) {
    return (
        <div className="header-comp">
            <div className='header-left'>
                <RiMusic2Fill className='header-icon' style={{paddingRight:'20px',fontSize:"50px"}} />
                <span>React Music Player</span>
            </div>
            <RiHeadphoneFill className='header-icon' style={{cursor:'pointer'}} />
        </div>
    )
}