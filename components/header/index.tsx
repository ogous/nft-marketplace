import { Fragment, useState, useEffect } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'

import { ChartBarIcon, ViewGridIcon } from '@heroicons/react/outline'
import Modal from '../modals'
import UploadModal from '../modals/uploadModal'
import { ethers } from 'ethers'
import Button, { ButtonSize, ButtonVariant } from '../../theme/button'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const uploadClick = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    async function get() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)

        const response = await provider.send('eth_requestAccounts', [])
        console.log('request ETH', response)
        const signer = provider.getSigner()
        console.log('SIGNER', signer)
        console.log('Account:', await signer.getAddress())
      } catch (e) {
        if (e instanceof Error) console.log(e.message)
      }
    }
    get()
  }, [])

  async function connectEtherium() {
    console.log('try to connect etherium')
    // try {
    //   const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
    //   console.log(accounts)
    // } catch (err) {
    //   if (err instanceof Error) console.log(err.message)
    // }
  }

  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start items-center lg:w-0 lg:flex-1">
            <Link href="#">
              <a>
                <span className="sr-only">Nfters</span>
                <div className="h-7 w-28 relative">
                  <Image layout="fill" src="/logo.svg" alt="" />
                </div>
              </a>
            </Link>
            <Link href={'#'}>
              <a className="ml-6 text-base font-medium text-gray-500 hover:text-gray-900">Marketplace</a>
            </Link>

            <Link href={'#'}>
              <a className="ml-6 text-base font-medium text-gray-500 hover:text-gray-900">Resource</a>
            </Link>
            <Link href={'#'}>
              <a className="ml-6 text-base font-medium text-gray-500 hover:text-gray-900">About</a>
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-end lg:w-0">
            <form>
              <div className="relative w-52">
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-4 pl-4 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                  placeholder="Search NFTs..."
                  required={true}
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-2.5 bg-gray-200 hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2 ">
                  <svg
                    className="w-5 h-5 text-gray-500 hover:text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </div>
            </form>

            <Popover.Button onClick={uploadClick} className="ml-6">
              <Button disabled title="Upload" size={ButtonSize.Medium} variant={ButtonVariant.Primary} />
            </Popover.Button>
            <Modal {...{ setIsOpen, isOpen, title: 'Create Asset', children: <UploadModal /> }} />
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button className="ml-6">
                    <Button
                      disabled
                      title="Connect Wallet"
                      size={ButtonSize.Medium}
                      variant={ButtonVariant.Secondary}
                    />
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
                          <a
                            onClick={connectEtherium}
                            className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
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
