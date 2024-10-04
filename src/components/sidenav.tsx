'use client';

import Image from "next/image";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  MapIcon,
  CircleStackIcon,
  Square2StackIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const links = [
  { name: 'Home', href: '/', icon: HomeIcon },
  { name: 'Form', href: '/ui', icon: CircleStackIcon },
  { name: 'About', href: '/ui/about', icon: DocumentDuplicateIcon },
  { name: 'Help', href: '/ui/help', icon: UserGroupIcon },
  { name: 'MAP', href: '/ui/map', icon: MapIcon },
  { name: 'SPECIES', href: '/ui/specie', icon: Square2StackIcon }
];

export default function ResponsiveHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex flex-col h-full px-3 py-4 bg-white shadow-md md:px-2">
      <div className="flex items-center justify-between mb-4">
        <Image
          className="w-16 md:w-40"
          src="/Ecoj (1).png"
          alt="Logo"
          width={50}
          height={50}
        />
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
      </div>
      
      <div className={clsx(
        "flex flex-col space-y-2",
        {
          'hidden': !isMenuOpen,
          'md:flex': true
        }
      )}>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'flex h-12 items-center gap-2 rounded-md bg-gray-50 p-2 text-sm font-medium hover:bg-sky-100 hover:text-blue-600',
                {
                  'bg-sky-100 text-blue-600': pathname === link.href,
                },
              )}
              onClick={() => setIsMenuOpen(false)}
            >
              <LinkIcon className="w-6" />
              <span>{link.name}</span>
            </Link>
          );
        })}
        
        <div className="mt-auto p-4 bg-gray-50 rounded-md">
          <Link href='/ui/login/'>LOGIN</Link>
        </div>
      </div>
    </div>
  );
}