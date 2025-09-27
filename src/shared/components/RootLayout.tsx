import {Outlet} from 'react-router-dom'
import Sidebar from "./Sidebar.tsx";

const RootLayout = () => {
    return (
        <div>
            <Sidebar/>
            <Outlet/>
        </div>
    );
}

export default RootLayout;