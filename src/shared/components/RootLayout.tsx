import {Outlet} from 'react-router-dom'
import Sidebar from "./Sidebar.tsx";

const RootLayout = () => {
    return (
        <div>
            <Sidebar/>
            <div className="flex justify-center h-screen">
                <Outlet/>
            </div>
        </div>
    );
}

export default RootLayout;