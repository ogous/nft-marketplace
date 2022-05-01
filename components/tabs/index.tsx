import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import type { IAsset } from '../../types/asset'
import Modal, { DetailModal } from '../modals/index'
import classNames from '../../utils/className'
import { list } from '../../api/methods'
import TabItem from './tabItem'
import Button, { ButtonSize, ButtonVariant } from '../../theme/button'

function Tabs() {
  const categories = {
    'All Categories': undefined,
    Art: 'art',
    Celebrities: 'celebrities',
    Gaming: 'gaming',
    Sport: 'sport',
    Music: 'music',
    Crypto: 'crypto',
  } as const
  type Categories = typeof categories[keyof typeof categories]

  const [data, setData] = useState<IAsset[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<IAsset>()
  const [selectedCategory, setSelectedCategory] = useState<Categories>()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [endReached, setEndReached] = useState<boolean>(false)

  useEffect(() => {
    async function getMongo({ offset, category }: { offset: number; category?: string }) {
      setLoading(true)

      try {
        const response = await list({ offset, category })

        if (response) {
          setData((prevData) => prevData.concat(response))
          if (response.length < 16) {
            setEndReached(true)
          }
        }
      } catch (err) {
        if (err instanceof Error) window.alert(err.message)
      } finally {
        setLoading(false)
      }
    }
    getMongo({ offset: currentIndex, category: selectedCategory })
  }, [currentIndex, selectedCategory])

  function handleMoreButton() {
    if (endReached) return
    setCurrentIndex(currentIndex + 1)
  }

  return (
    <div className="w-full p-6 bg-gray-100">
      <h2 className="text-xl mb-4 tracking-tight font-extrabold text-gray-900">
        <span className="block xl:inline">DISCOVER MORE NFT</span>
      </h2>
      <Tab.Group
        onChange={(index) => {
          setSelectedCategory(Object.values(categories)[index])
          setLoading(true)
          setData([])
          setCurrentIndex(0)
          setEndReached(false)
        }}>
        <Tab.List className="flex max-w-4xl space-x-1 rounded-full bg-black/5 p-1">
          {Object.keys(categories).map((category) => (
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
            <Tab.Panel key={category}>
              <div className="flex grid md:grid-cols-4 grid-cols-2 gap-2">
                {data.map((post) => (
                  <TabItem key={post._id} {...{ post, setIsOpen, setSelectedItem }} />
                ))}
              </div>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
      <div className="mt-6 justify-center grid">
        <a
          className={classNames(endReached ? 'cursor-not-allowed opacity-50' : 'cursor-pointer')}
          onClick={handleMoreButton}>
          <Button
            disabled
            loading={loading}
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Medium}
            title={endReached ? 'All data loaded' : 'More NFTs'}
          />
        </a>
      </div>
      {selectedItem && (
        <Modal
          {...{
            setIsOpen,
            isOpen,
            children: <DetailModal data={selectedItem} setData={setSelectedItem} />,
            title: selectedItem?.title ?? 'Post Detail',
          }}
        />
      )}
    </div>
  )
}

export default Tabs
