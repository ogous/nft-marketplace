import { Fragment, useState, useEffect, Dispatch } from 'react'
import { Popover, Transition } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import Modal, { UploadModal } from '../modals'
import { ethers } from 'ethers'
import Button, { ButtonSize, ButtonVariant } from '../../theme/button'
import type { IUser } from '../../types/user'
import { ClipboardCopyIcon, UserIcon } from '@heroicons/react/outline'
import { ApiPromise, WsProvider } from '@polkadot/api'

function Header() {
  const [polkadot, setPolkadot] = useState<typeof import('@polkadot/extension-dapp')>()
  const [user, setUser] = useState<IUser | undefined>()
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showETHNetworkAlert, setShowETHNetworkAlert] = useState(false)

  useEffect(() => {
    const storedUser = window.localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  useEffect(() => {
    window.ethereum.on('accountsChanged', () => window.location.reload())
    window.ethereum.on('networkChanged', () => window.location.reload())
  }, [])

  const uploadClick = () => {
    setIsOpen(!isOpen)
  }

  function saveUser(user: IUser) {
    setUser(user)
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  async function handleDisconnect() {
    setUser(undefined)
    window.localStorage.removeItem('user')
    setShowETHNetworkAlert(false)
  }

  useEffect(() => {
    // @polkadot/extension-dapp has an issue on Next.js:
    // https://github.com/polkadot-js/extension/issues/571
    // https://github.com/polkadot-js/extension/issues/1050
    async function initPolkadot() {
      const polkadot = await import('@polkadot/extension-dapp')
      setPolkadot(polkadot)
    }
    initPolkadot()
  }, [])

  async function connectEthereum() {
    setLoading(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const response = await provider.send('eth_requestAccounts', [])
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      const balance = await signer.getBalance().then((balance) => {
        const balanceInEth = ethers.utils.formatEther(balance)

        return balanceInEth + ' ETH'
      })
      const image = await provider.getAvatar(address)

      // Alert if network not ETH Mainnet
      if (provider.network.chainId !== 1) {
        setShowETHNetworkAlert(true)
      }
      const user: IUser = {
        address,
        balance,
        provider: 'Metamask',
        image,
      }

      saveUser(user)
    } catch (e) {
      if (e instanceof Error) window.alert(e.message)
    } finally {
      setLoading(false)
    }
  }

  async function connectPolkadot() {
    if (!polkadot) return
    setLoading(true)
    try {
      const allInjected = await polkadot.web3Enable('NFT Marketplace for Capsule Labs')
      const allAccounts = await polkadot.web3Accounts()

      const wsProvider = new WsProvider('wss://rpc.polkadot.io')
      const api = await ApiPromise.create({ provider: wsProvider })

      const res = await api.query.system.account(allAccounts[0].address)

      const balance: any = res.toHuman()
      const freeBalance: any = balance.data.free

      const user: IUser = {
        address: allAccounts[0].address,
        balance: freeBalance + ' DOT',
        provider: 'Polkadot',
        image: '',
      }
      saveUser(user)
    } catch (e) {
      if (e instanceof Error) {
        e.message
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex w-full md:w-auto justify-between md:justify-start md:items-center lg:w-0 lg:flex-1">
            <Link href="#">
              <a>
                <span className="sr-only">Nfters</span>
                <div className="h-7 w-28 relative">
                  <Image layout="fill" src="/logo.svg" alt="" />
                </div>
              </a>
            </Link>
            <a
              onClick={() => {
                //open Modal
              }}
              className="cursor-pointer rounded-full bg-gray-200 md:hidden">
              <UserIcon className="text-gray-700 w-8 h-8 p-1.5" />
            </a>
            <div className="hidden md:block">
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
          </div>

          <div className="hidden md:flex items-center justify-end lg:w-0">
            <form className="hidden md:flex">
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
            <Modal {...{ setIsOpen, isOpen, title: 'Create an asset', children: <UploadModal /> }} />
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button className="ml-6">
                    {user ? (
                      <div className="px-2 flex items-center max-w-[280px] h-12 border-2 border-primary rounded-full cursor-pointer">
                        <span className="whitespace-nowrap">{user.balance}</span>
                        <span className="ml-2 mr-2 py-1 px-2 rounded-full bg-gray-100 truncate overflow-hidden">
                          {user.address}
                        </span>

                        {user.image ? (
                          <Image className="rounded-full" src={user.image} width={40} height={40} alt={user.address} />
                        ) : (
                          <div className="rounded-full bg-gray-200">
                            <UserIcon className="text-gray-700 w-8 h-8 p-1.5" />
                          </div>
                        )}
                      </div>
                    ) : (
                      <Button
                        disabled
                        loading={loading}
                        title="Connect Wallet"
                        size={ButtonSize.Medium}
                        variant={ButtonVariant.Secondary}
                      />
                    )}
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1">
                    <Popover.Panel className="absolute z-10 mt-3 transform px-2 right-0 -ml-12">
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                        {user ? (
                          <div className="p-6 bg-white max-w-[280px]">
                            <a
                              onClick={handleDisconnect}
                              className="cursor-pointer rounded-full border border-primary py-1 p-2 text-xs">
                              Disconnect
                            </a>
                            <p className="mt-2 text-xs text-gray-300 whitespace-nowrap">
                              Connected with {user.provider}
                            </p>
                            <div className="flex items-center mt-2">
                              {user.image ? (
                                <Image
                                  className="rounded-full"
                                  src={user.image}
                                  width={40}
                                  height={40}
                                  alt={user.address}
                                />
                              ) : (
                                <div className="rounded-full bg-gray-200">
                                  <UserIcon className="text-gray-700 w-8 h-8 p-1.5" />
                                </div>
                              )}
                              <span className="truncate ml-2 font-bold font-md">{user.address}</span>
                            </div>
                            <div className="flex items-end">
                              <a
                                className="cursor-pointer  flex items-center mt-2 bg-gray-100 rounded-md py-1 px-2 hover:bg-gray-200"
                                onClick={() => navigator.clipboard.writeText(user.address)}>
                                <div className="w-4 h-4 text-gray-500 mr-1">
                                  <ClipboardCopyIcon />
                                </div>
                                <span className="text-gray-500 text-xs">Copy</span>
                              </a>
                            </div>
                          </div>
                        ) : (
                          <div className="relative grid gap-6 bg-white p-6">
                            <a
                              onClick={connectEthereum}
                              className="py-3 p-6 flex items-center cursor-pointer rounded-lg hover:bg-gray-50">
                              <div className="h-8 w-8">
                                <Image src="/metamask.svg" width={32} height={32} alt="Metamask" />
                              </div>
                              <div className="ml-6">
                                <p className="text-base font-medium text-gray-900">Metamask</p>
                                <p className="mt-1 text-xs text-gray-300 whitespace-nowrap">Connect with Metamask</p>
                              </div>
                            </a>
                            <a
                              onClick={connectPolkadot}
                              className=" py-3 p-6 flex items-center cursor-pointer rounded-lg hover:bg-gray-50">
                              <div className="h-8 w-8">
                                <Image src="/polkadot.svg" width={32} height={32} alt="Polkadot" />
                              </div>
                              <div className="ml-6">
                                <p className="text-base font-medium text-gray-900">Polkadot</p>
                                <p className="mt-1 text-xs text-gray-300 whitespace-nowrap">Connect with Polkadot</p>
                              </div>
                            </a>
                          </div>
                        )}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div>
        </div>
      </div>
      <Modal {...{ isOpen: showETHNetworkAlert, setIsOpen: setShowETHNetworkAlert }} title="Change Network">
        <div className="p-4">
          <p className="mb-4">
            Your wallet is connected to a diffrent network. You should change it to Ethereum Mainnet.
          </p>
          <a className="cursor-pointer" onClick={handleDisconnect}>
            <Button disabled title="Sign out" />
          </a>
        </div>
      </Modal>
    </Popover>
  )
}

export default Header
