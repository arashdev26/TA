'use client'

import { UserButton } from '@clerk/nextjs'
import { Menu } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

import { navLinks } from '@/lib/constans'
const TopBar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false)
  const pathname = usePathname()
  return (
    <div className="sticky top-0 z-20 w-full flex justify-between items-center px-8 py-4 b-blue-2 shadow-xl lg:hidden">
      <Image
        src="/logo.png"
        alt="logo"
        width="150"
        height="70"
      />
      <div className="flex gap-8 max-md:hidden">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium 
            ${pathname === link.url ? 'text-blue-1' : 'text-grey-1'}`}
          >
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <div className="flex  gap-4 text-body-medium items-center relative">
        <Menu
          className="cursor-pointer md:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />
        {dropdownMenu && (
          <div className="flex flex-col gap-8 p-5 bg-white shadow-xl rounded-lg absolute top-10 right-6">
            {navLinks.map((link) => (
              <Link
                href={link.url}
                key={link.label}
                className="flex gap-4 text-body-medium"
              >
                {link.icon}
                <p>{link.label}</p>
              </Link>
            ))}
          </div>
        )}
        <UserButton />
      </div>
    </div>
  )
}

export default TopBar
