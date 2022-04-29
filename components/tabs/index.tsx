import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import type { IBidding } from '../../types/bidding'
import Modal, { DetailModal } from '../modals/index'
import classNames from '../../utils/className'
import { getList } from '../../pages/api/methods'
import TabItem from './tabItem'
import Button, { ButtonSize, ButtonVariant } from '../../theme/button'

function Tabs() {
  const categories = {
    art: 'Art',
    celebrities: 'Celebrities',
    gaming: 'Gaming',
    sport: 'Sport',
    music: 'Music',
    crypto: 'Crypto',
  }

  const [data, setData] = useState<IBidding[]>()
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<IBidding>()
  const [isOpen, setIsOpen] = useState(false)

  async function getMongo() {
    try {
      const response = await getList()
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
    <div className="w-full p-6 bg-gray-100">
      <h2 className="text-xl mb-4 tracking-tight font-extrabold text-gray-900">
        <span className="block xl:inline">DISCOVER MORE NFT</span>
      </h2>
      <Tab.Group>
        <Tab.List className="flex max-w-lg space-x-1 rounded-full bg-black/5 p-1">
          {Object.values(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full rounded-full py-2.5 text-sm font-medium leading-5',
                  'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-primary/[0.12] focus:ring-2',
                  selected ? 'text-white bg-primary shadow' : 'text-gray-500 hover:bg-primary/[0.12] hover:text-black',
                )
              }>
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.keys(categories).map((category) => (
            <Tab.Panel
              key={category}
              className={
                'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2'
              }>
              {loading || !data ? null : (
                <ul className="flex grid grid-cols-4 gap-2">
                  {data.map((post) => (
                    <TabItem key={post._id} {...{ post, setIsOpen, setSelectedItem }} />
                  ))}
                </ul>
              )}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <div className="mt-6 items-center inline-block">
        <Button variant={ButtonVariant.Secondary} size={ButtonSize.Medium} title="More NFTs" />
      </div>
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
