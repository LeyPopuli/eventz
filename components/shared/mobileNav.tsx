import { Separator } from "../ui/separator";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import Image from "next/image"
import NavItems from "./navItems";

export const MobileNav = () => {
    return (
        <nav className="md:hidden">
            <Sheet>
                <SheetTrigger className="align-middle">
                    <Image src={"/assets/icons/menu.svg"} width={24} height={24} alt="menu" className="cursor-pointer mt-0.5" />
                </SheetTrigger>
                <SheetTitle>
                    <SheetContent className="flex flex-col gap-3 bg-white md:hidden">
                        <SheetDescription className="hidden">
                        </SheetDescription>
                        <Image src={"/assets/images/logo_title.png"} width={100} height={100} alt="logo"></Image>
                        <Separator className="border border-gray-50" />
                        <NavItems />
                    </SheetContent>
                </SheetTitle>
            </Sheet>
        </nav>
    )
}

export default MobileNav;