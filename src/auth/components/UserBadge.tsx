import {UserRoundCheck, UserRoundX} from "lucide-react";
import React from "react";
import type User from "../model/User.ts";

const UserBadge: React.FC<{onLogin: () => void, data: User | undefined}> = ({onLogin, data}) => {

    return (
        <section className="mb-12 flex flex-col items-center justify-center">
            <div className="p-2 rounded-full bg-gray-200">
                <button className="flex flex-col justify-center items-center"
                        onClick={onLogin}
                >
                    {data
                        ?<UserRoundCheck size={36} strokeWidth={1}/>
                        :<UserRoundX size={36} strokeWidth={1}/>
                    }
                </button>
            </div>
            <p className="mb-2">{data ? data.username : "Anonym"}</p>
        </section>
    );
}

export  default UserBadge;