'use client'
import { UserButton } from '@clerk/nextjs'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import { navLinks } from '@/lib/constans'
const LeftSideBar = () => {
  const pathname = usePathname()
  return (
    <div className="h-screen left-0 top-0 sticky p-10 flex flex-col gap-16 bg-blue-2 shadow-xl max-lg:hidden">
      <Image
        src="/logo.png"
        alt="logo"
        width="150"
        height="70"
      />
      <div className="flex flex-col gap-12 text-body-medium">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium 
            ${pathname === link.url ? 'text-blue-1' : 'text-grey-1'}`}
          >
            {link.icon}
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex  gap-4 items-center">
        <UserButton />
        <p>Edit Profile</p>
      </div>
    </div>
  )
}

export default LeftSideBar
