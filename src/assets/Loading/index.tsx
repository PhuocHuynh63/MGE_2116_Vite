import { LuLoaderCircle } from "react-icons/lu";
import './index.scss'

const Loading = () => {
    return (
        <div className="loading-container">
            <LuLoaderCircle className="loader" />
        </div>
    )
}

export default Loading