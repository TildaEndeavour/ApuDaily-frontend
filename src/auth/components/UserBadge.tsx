import {LogIn, LogOut, UserRoundCheck, UserRoundX} from "lucide-react";
import React, {useState} from "react";
import UserProfileModal from "../../user/components/UserProfileModal.tsx";
import type {User} from "../model/User.ts";

const UserBadge: React.FC<{
    onLogin: () => void,
    onLogOut: () => void,
    data: User | undefined,
    isCollapsed: boolean
}> = ({onLogin, onLogOut, data, isCollapsed}) => {

    const [isProfileOpen, setIsProfileOpen] = useState(false);

    return (
        <section className="mb-12 flex flex-col items-center justify-center">
            <span
                className="flex flex-col items-center"
                onClick={data ? () => setIsProfileOpen(true) : () => {}}
            >
                <div className="p-2 rounded-full bg-gray-200">
                    <div className="flex flex-col justify-center items-center"

                    >
                        {data
                            ?<UserRoundCheck size={36} strokeWidth={1}/>
                            :<UserRoundX size={36} strokeWidth={1}/>
                        }
                    </div>
                </div>
                <p className="mb-4 mt-2">
                    {!isCollapsed ? data?.username ?? "Anonym" : "…"}
                </p>
            </span>
            {data
                ? <>
                    <button className="p-2 rounded-3xl hover:bg-gray-200" onClick={onLogOut}><LogOut size={24} strokeWidth={1} style={{ transform: "scaleX(-1)" }}/></button>
                    <p>Log out</p>
                  </>
                : <>
                    <button className="p-2 rounded-3xl hover:bg-green-200" onClick={onLogin}><LogIn size={24} strokeWidth={1}/></button>
                    <p>Sign in</p>
                  </>
            }
            {isProfileOpen && <UserProfileModal user={data} onClose={() => setIsProfileOpen(false)}/>}
        </section>
    );
}

export  default UserBadge;