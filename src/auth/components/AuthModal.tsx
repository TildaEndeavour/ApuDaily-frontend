import React, {useState} from "react";
import ModalCard from "../../shared/components/ModalCard.tsx";
import SignUpForm from "./SignUpForm.tsx";
import LoginForm from "./LoginForm.tsx";

const AuthModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <ModalCard isOpen={true} onClose={onClose}>
            {isSignUp ? (
                <SignUpForm onSwitchToLogin={() => setIsSignUp(false)} />
            ) : (
                <LoginForm onSwitchToSignUp={() => setIsSignUp(true)} onClose={onClose} />
            )}
        </ModalCard>
    );
};

export default AuthModal;