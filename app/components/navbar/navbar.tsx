'use client';
import Container from "../Container";
import Logo from "./logo";
import Search from "./Search";
import UserMenu from "./UserMenu"
const Navbar = () => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm"> 
        <div className="py-4 border-b-[1px]">
        <Container>
                <div className="flex flex-row justify-between items-center gap-3 md:gap-0" >
                    <Logo />
                    <Search />
                    <UserMenu/>
                </div>
            </Container>
        </div>
        </div>
    );
}

export default Navbar;