'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  MapIcon,
  CircleStackIcon,
  Square2StackIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Form', href: '/ui', icon: CircleStackIcon },
  {
    name: 'About',
    href: '/ui/about',
    icon: DocumentDuplicateIcon,
  },
  { name: 'Help', href: '/ui/help', icon: UserGroupIcon },
  { name: 'MAP', href: '/ui/map', icon: MapIcon },
  { name: 'SPECIES', href: '/ui/specie', icon: Square2StackIcon }
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3',
              {
                'bg-sky-100 text-blue-600': pathname === link.href,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
