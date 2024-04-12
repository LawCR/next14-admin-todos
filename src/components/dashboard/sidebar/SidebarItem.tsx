"use client";
import Link from 'next/link'
import { useSearchParams, usePathname } from 'next/navigation';
import React from 'react'

interface Props {
  title: string;
  href: string;
  icon: React.ReactNode;
}

export const SidebarItem = ({ title, icon, href }: Props) => {

  const pathName = usePathname();

  return (
    <li>
      <Link 
        href={href} 
        className={`px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group hover:bg-gradiant-to-r hover:bg-sky-600 hover:text-white ${pathName === href ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400': ''}`}
        >
        {icon}
        <span className="-mr-1 font-medium">{title}</span>
      </Link>
    </li>
  )
}
