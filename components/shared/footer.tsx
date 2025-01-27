import Link from "next/link";
import Image from 'next/image';

export const Footer = () => {
    return (
        <footer className="border-t">
            <div className="flex-center wrapper flex-between flex flex-col gap-4 p-5 text-center sm:flex-row">
                <Link href={"/"}>
                <Image src={"/assets/images/logo_title.png"} width={150} height={100} alt="logo"></Image>
                </Link>
                <p>
                    2025 ArcanEvents. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}

export default Footer;