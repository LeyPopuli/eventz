import Link from "next/link"
import Image from "next/image"
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button"
import NavItems from "./navItems"
import MobileNav from "./mobileNav"

export const header = () => {
  return (
    <header className="w-full border-b">
        <div className="wrapper flex items-center justify-between">
            <Link href={"/"} className="w-36">
            <Image src={"/assets/images/logo_title.png"} width={800} height={100} alt="logo"></Image>
            </Link>

            <SignedIn>
              <nav className="md:flex-between hidden w-full max-w-xs">
                <NavItems/>
              </nav>
            </SignedIn>

            <div className="flex w-32 justify-end gap-3">
              <SignedIn>
                <UserButton />
                <MobileNav />
              </SignedIn>
              <SignedOut>
                <Button asChild className="rounded-full" size="lg">
                  <Link href="/sign-in">
                    Login
                  </Link>
                </Button>
              </SignedOut>
            </div>
        </div>
    </header>
  )
}

export default header