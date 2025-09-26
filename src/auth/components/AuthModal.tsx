import React, {useState} from "react";
import ModalCard from "../../shared/components/ModalCard.tsx";
import SignUpForm from "./SignUpForm.tsx";
import LoginForm from "./LoginForm.tsx";

const AuthModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <ModalCard isOpen={true} onClose={onClose}>
            <div className="flex items-center">
                {isSignUp ? (
                    <SignUpForm onSwitchToLogin={() => setIsSignUp(false)} />
                ) : (
                    <LoginForm onSwitchToSignUp={() => setIsSignUp(true)} onClose={onClose} />
                )}
            </div>
        </ModalCard>
    );
};

export default AuthModal;