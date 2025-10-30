import {Outlet} from 'react-router-dom'
import Sidebar from "./Sidebar.tsx";

const RootLayout = () => {
    return (
        <div>
            <Sidebar/>
            <section className="flex justify-center">
                <Outlet/>
            </section>
        </div>
    );
}

export default RootLayout;