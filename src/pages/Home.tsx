import ApuLogo from "../assets/images/logo.png"
import ModeButton from "../components/ModeButton.tsx";

const HomePage = () => {
    return(
        <div className="w-screen h-screen flex flex-col items-center">

            <img className="w-46 h-28 mt-10 mb-24" src={ApuLogo} alt="ApuDaily logo"/>

            <section className="font-semibold text-8xl lg:flex flex-col hidden mb-16">
                <span>Hey, fren.</span>
                <span>Write something!</span>
                <span className="italic font-light ml-32">or just explore...</span>
            </section>

            <ModeButton/>
        </div>
    );
}

export default HomePage;