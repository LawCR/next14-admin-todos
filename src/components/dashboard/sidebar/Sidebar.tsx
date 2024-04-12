import Image from 'next/image';
import Link from 'next/link';
import { CiBookmarkCheck, CiCoffeeCup, CiLogout } from 'react-icons/ci';
import { SidebarItem } from './SidebarItem';
import { IoBasketOutline, IoCheckboxOutline, IoListOutline, IoPerson } from 'react-icons/io5';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { LogoutButton } from './LogoutButton';

const SIDEBAR_ITEMS = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: <CiBookmarkCheck size={30} />
  },
  {
    title: 'Rest Todos',
    href: '/dashboard/rest-todos',
    icon: <IoCheckboxOutline size={30} />
  },
  {
    title: 'Server Actions',
    href: '/dashboard/server-todos',
    icon: <IoListOutline size={30} />
  },
  {
    title: 'Cookies',
    href: '/dashboard/cookies',
    icon: <CiCoffeeCup size={30} />
  },
  {
    title: 'Productos',
    href: '/dashboard/products',
    icon: <IoBasketOutline size={30} />
  },
  {
    title: 'Perfil',
    href: '/dashboard/profile',
    icon: <IoPerson size={30} />
  },
]

export const Sidebar = async() => {

  const session = await getServerSession(authOptions)

  // if (!session) {
  //   redirect('/api/auth/signin')
  // }

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
        <div>
          <div className="-mx-6 px-6 py-4">
            {/* TODO: Next/Link hacia dashboard */}
            <Link href="/dashboard" title="home">
              {/* Next/Image */}
              <Image 
                src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg" 
                className="w-32" 
                width={128}
                height={32}
                alt="tailus logo"
              />
            </Link>
          </div>

          <div className="mt-8 text-center">
            {/* Next/Image */}
            <Image 
              src={session?.user?.image || 'https://tailus.io/sources/blocks/stats-cards/preview/images/second_user.webp'}
              alt="" 
              className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
              width={40}
              height={40}
            />
              <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{session?.user?.name || 'Usuario'}</h5>
              <span className="hidden text-gray-400 lg:block capitalize">{session?.user?.roles?.join(',') ?? ['no-roles'].join(',')}</span>
          </div>

          <ul className="space-y-2 tracking-wide mt-8">
            {SIDEBAR_ITEMS.map((item, index) => (
              <SidebarItem 
                key={item.href}
                {...item}
              />
            ))}
          </ul>
        </div>
        <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
          <LogoutButton />
        </div>
      </aside>
  )
}
