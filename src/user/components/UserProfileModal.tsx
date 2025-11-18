import React from "react";
import ModalContainer from "../../shared/components/ModalContainer.tsx";
import type {User} from "../../auth/model/User.ts";
import {CircleUserRound, Pencil} from "lucide-react";

const UserProfileModal: React.FC<{ user: User, onClose: () => void }> = ({user, onClose}) => {

    console.log(user);
    return (
        <ModalContainer isOpen={true} onClose={onClose}>
            <div className="w-160 h-90 flex flex-row border-1 bg-white">
                <section className="flex flex-col justify-center border-r-1 px-16">
                    <CircleUserRound size={120} strokeWidth={1}/>
                </section>
                <section className="p-4 w-full">
                    <div className="flex flex-row justify-between items-center w-full border-b-1">
                        <h1>{user.username}</h1>
                        <Pencil size={32} strokeWidth={1}/>
                    </div>
                </section>
            </div>
        </ModalContainer>
    );
}

export default UserProfileModal;