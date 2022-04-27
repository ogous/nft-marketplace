import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import Link from 'next/link'
import Image from 'next/image'
import categories from './data'
import axios from 'axios'
import type { IBidding } from '../../types/bidding'
import { ClockIcon } from '@heroicons/react/solid'
import { formatDistance } from 'date-fns'
import Modal, { DetailModal } from '../modals/index'
import classNames from '../../utils/className'

function Tabs() {
  const [data, setData] = useState<IBidding[]>()
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<IBidding>()
  const [isOpen, setIsOpen] = useState(false)
  async function getMongo() {
    try {
      const response = await axios.get('https://nft-backend-fsl3dqjtcq-ey.a.run.app/api/list')
      // categories['NFTS'] = response
      console.log(response.data)
      if (response) setData(response.data)
    } catch (err) {
      if (err instanceof Error) window.alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMongo()
  }, [])

  return (
    <div className="w-full  px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex max-w-md space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full  rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2',
                  selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                )
              }>
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2',
              )}>
              {loading || !data ? (
                <ClockIcon scale={20} />
              ) : (
                <ul className="flex flex-wrap">
                  {data.map((post) => (
                    <li
                      onClick={() => {
                        setIsOpen(true)
                        setSelectedItem(post)
                      }}
                      key={post._id}
                      className="w-1/4 relative rounded-md p-3 hover:bg-coolGray-100">
                      <ul className="mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
                        <li className="w-full aspect-square	relative">
                          <Image alt="" src={post.imageUrl} layout="fill" objectFit="cover" className="rounded-md" />
                        </li>
                        <li>
                          <h3 className="text-sm font-medium leading-5">{post.title}</h3>
                        </li>
                        <li>{formatDistance(new Date(post.endTime), new Date(), { addSuffix: true })}</li>
                        <li>
                          <h3>{post.lastPrice} ETH</h3>
                        </li>
                      </ul>
                      <Link href="#">
                        <a
                          className={classNames(
                            'absolute inset-0 rounded-md',
                            'focus:outline-none ring-blue-400 focus:z-10 focus:ring-2',
                          )}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      {selectedItem && (
        <Modal
          {...{
            setIsOpen,
            isOpen,
            children: <DetailModal data={selectedItem} />,
            title: selectedItem?.title ?? 'Post Detail',
          }}
        />
      )}
    </div>
  )
}

export default Tabs
