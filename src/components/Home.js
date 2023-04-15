import PropTypes from 'prop-types'
import SignOut from './SignOut'


const Home = ({color, text, onClick}) => {
    
    return (
        <div>
            <a href='/example'>Example</a>
            <SignOut />
        </div>
        
    )
}

export default Home