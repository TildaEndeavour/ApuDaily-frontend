import React, {useState} from "react";
import ModalContainer from "../../shared/components/ModalContainer.tsx";
import SignUpForm from "./SignUpForm.tsx";
import LoginForm from "./LoginForm.tsx";

const AuthModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [isSignUp, setIsSignUp] = useState(false);

    return (
        <ModalContainer isOpen={true} onClose={onClose}>
            {isSignUp ? (
                <SignUpForm onSwitchToLogin={() => setIsSignUp(false)} />
            ) : (
                <LoginForm onSwitchToSignUp={() => setIsSignUp(true)} onClose={onClose} />
            )}
        </ModalContainer>
    );
};

export default AuthModal;