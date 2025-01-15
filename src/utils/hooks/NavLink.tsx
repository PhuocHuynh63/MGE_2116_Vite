import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }: IMETADATA.NAVLINK) {
    const pathname = usePathname();

    const isActive = pathname === href;

    return (
        <Link href={href} className={isActive ? 'active' : ''}>
            {children}
        </Link >
    )
}