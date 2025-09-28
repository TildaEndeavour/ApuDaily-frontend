import {Outlet} from 'react-router-dom'
import Sidebar from "./Sidebar.tsx";

const RootLayout = () => {
    return (
        <div>
            <Sidebar/>
            <div className="ml-21">
                <Outlet/>
            </div>
        </div>
    );
}

export default RootLayout;