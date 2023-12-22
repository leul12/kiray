'use client';
import { useCallback, useState } from "react";
import Avatar from "../Avatar";
import MenuItem from "./menuItem";
import { AiOutlineMenu } from 'react-icons/ai';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
interface UserMenuProps {
    currentUser?: User | null
}
const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const registermodal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsOpen((value) => !value);
    }, []);

    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-3">
                <div
                    className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
                >
                    Bet kiray feligewal
                </div>
                <div
                    onClick={toggleMenu}
                    className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
                >
                    <AiOutlineMenu />
                    <div className="hidden md:block">
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                        {currentUser ? (
                        <>
                        <MenuItem
                            onClick = {()=>{}}
                            label="My Trips"
                        />
                        <MenuItem
                            onClick={()=>{}}
                            label="My Favorites"
                        />
                        <MenuItem
                            onClick={()=>{}}
                            label="My Reservations"
                        />
                        <MenuItem
                            onClick={()=>{}}
                            label="My Properties"
                        />
                        <MenuItem
                            onClick={()=>{}}
                            label="Kiray my home"
                        />
                        <hr />
                        <MenuItem
                            onClick={()=>signOut()}
                            label="Logout"
                        />
                    </>
                        ): (
                        <>
                            <MenuItem
                                onClick = {loginModal.onOpen}
                                label="login"
                            />
                            <MenuItem
                                onClick={registermodal.onOpen}
                                label="signup"
                            />
                        </>
                        )}
                </div>
                </div>
    )}
        </div >
    );
}

export default UserMenu;
