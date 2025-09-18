import {UserRoundX} from "lucide-react";
import React from "react";

const UserBadge: React.FC<{onLogin: () => void}> = ({onLogin}) => {

    return (
        <section className="mb-12 flex flex-col items-center justify-center">
            <div className="p-2 rounded-full bg-gray-200">
                <button className="flex flex-col justify-center items-center"
                        onClick={onLogin}
                >
                    <UserRoundX size={36} strokeWidth={1}/>
                </button>
            </div>
            <p className="mb-2">Anonym</p>
        </section>
    );
}

export  default UserBadge;