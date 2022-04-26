/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'

import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  CursorClickIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Modal from '../modals'
import UploadModal from '../modals/uploadModal'
const solutions = [
  {
    name: 'Analytics',
    description: 'Get a better understanding of where your traffic is coming from.',
    href: '#',
    icon: ChartBarIcon,
  },
  {
    name: 'Engagement',
    description: 'Speak directly to your customers in a more meaningful way.',
    href: '#',
    icon: CursorClickIcon,
  },
  { name: 'Security', description: "Your customers' data will be safe and secure.", href: '#', icon: ShieldCheckIcon },
  {
    name: 'Integrations',
    description: "Connect with third-party tools that you're already using.",
    href: '#',
    icon: ViewGridIcon,
  },
  {
    name: 'Automations',
    description: 'Build strategic funnels that will drive your customers to convert',
    href: '#',
    icon: RefreshIcon,
  },
]
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
]
const resources = [
  {
    name: 'Help Center',
    description: 'Get all of your questions answered in our forums or contact support.',
    href: '#',
    icon: SupportIcon,
  },
  {
    name: 'Guides',
    description: 'Learn how to maximize our platform to get the most out of it.',
    href: '#',
    icon: BookmarkAltIcon,
  },
  {
    name: 'Events',
    description: 'See what meet-ups and other events we might be planning near you.',
    href: '#',
    icon: CalendarIcon,
  },
  { name: 'Security', description: 'Understand how we take your privacy seriously.', href: '#', icon: ShieldCheckIcon },
]
const recentPosts = [
  { id: 1, name: 'Boost your conversion rate', href: '#' },
  { id: 2, name: 'How to use search engine optimization to drive traffic to your site', href: '#' },
  { id: 3, name: 'Improve your customer experience', href: '#' },
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const uploadClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link href="#">
              <a>
                <span className="sr-only">Nfters</span>
                <div className="h-7 w-28 relative">
                  <Image layout="fill" src="/logo.svg" alt="" />
                </div>
              </a>
            </Link>
          </div>

          <Link href={'#'}>
            <a
              className={
                'group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }>
              <span>Marketplace</span>
            </a>
          </Link>

          <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
            Resource
          </a>
          <a href="#" className="text-base font-medium text-gray-500 hover:text-gray-900">
            About
          </a>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Popover.Button
              onClick={uploadClick}
              className="whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-indigo-700">
              Upload
            </Popover.Button>
            <Modal {...{ setIsOpen, isOpen, title: 'Upload images', children: <UploadModal /> }} />
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button className="whitespace-nowrap ml-8 border-primary border-2 text-base font-medium px-4 py-2  rounded-md shadow-sm text-gray-500 hover:text-gray-900">
                    Connect Wallet
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1">
                    <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                          <a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                            <ChartBarIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">Metamask</p>
                              <p className="mt-1 text-sm text-gray-500">Metamask is wonderfull</p>
                            </div>
                          </a>
                          <a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                            <ViewGridIcon className="flex-shrink-0 h-6 w-6 text-indigo-600" aria-hidden="true" />
                            <div className="ml-4">
                              <p className="text-base font-medium text-gray-900">Polkadot</p>
                              <p className="mt-1 text-sm text-gray-500">Polkadot is wonderfull</p>
                            </div>
                          </a>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
    </Popover>
  )
}

export default Header
