import React, { useState, useEffect } from 'react'
import Modal, { DetailModal } from '../modals/index'
import Button, { ButtonSize, ButtonVariant } from '../../theme/button'
import axios from 'axios'
import TabItem from './tabItem'

class NFTModel {
  public id: Pick<INFT, 'id'>
  public imageUrl: Pick<INFT, 'imageUrl'>
  public name: Pick<INFT, 'name'>
  public description: Pick<INFT, 'description'>
  public address: Pick<INFT, 'address'>
  public numberOfSales: Pick<INFT, 'numberOfSales'>
  public payoutAddress: Pick<INFT, 'payoutAddress'>
  // public totalPrice: Pick<INFT, 'totalPrice'>

  constructor(data: any) {
    this.id = data.id
    this.imageUrl = data.image_url
    this.name = data.name
    this.description = data.description
    this.address = data.asset_contract.address
    this.numberOfSales = data.num_sales
    this.payoutAddress = data.asset_contract.payout_address
    // this.totalPrice = data.last_sale.total_price
  }
}

export interface INFT {
  id: string
  imageUrl: string
  name: string
  description: string
  address: string
  createDate: string
  numberOfSales: string
  payoutAddress: string
  // totalPrice: string
}

function Tabs2({ collection }: { collection: 'ape' | 'god' }) {
  const [data, setData] = useState<INFT[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<INFT>()
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const FakeBoredApeYachtClub = '0x7470ea065e50e3862cd9b8fb7c77712165da80e5'
  const AzukiGods = '0xb74bf94049d2c01f8805b8b15db0909168cabf46'

  const collections = React.useMemo(
    () => ({
      ape: {
        title: 'Fake Bored Ape Yacht Club',
        address: FakeBoredApeYachtClub,
      },
      god: {
        title: 'Azuki Gods',
        address: AzukiGods,
      },
    }),
    [],
  )

  useEffect(() => {
    async function getNFTs() {
      setLoading(true)

      try {
        const response = await axios({
          method: 'GET',
          baseURL: 'https://testnets-api.opensea.io',
          url: `api/v1/assets?asset_contract_address=${collections[collection].address}&order_direction=desc&offset=${currentIndex}&limit=16`,
        })
        if (!response.data) return

        const data = response.data.assets?.map((item: any) => new NFTModel(item))

        if (data)
          setData((prevData) => {
            return prevData.concat(data)
          })
      } catch (err) {
        if (err instanceof Error) window.alert(err.message)
      } finally {
        setLoading(false)
      }
    }
    //OpenSea Test API rate limit does not allow two api call at the same time
    setTimeout(getNFTs, currentIndex === 0 && collection === 'god' ? 1000 : 0)
  }, [collection, collections, currentIndex])

  function handleMoreButton() {
    setCurrentIndex(currentIndex + 1)
  }

  return (
    <div className="w-full p-6 bg-gray-100">
      <h2 className="text-xl mb-4 tracking-tight font-extrabold text-gray-900">
        <span className="block xl:inline">{collections[collection].title}</span>
      </h2>

      <div className="grid grid-cols-4 gap-2">
        {data?.map((item) => {
          return <TabItem key={item.id} {...{ post: item, setIsOpen, setSelectedItem }} />
        })}
      </div>
      <div className="mt-6 justify-center grid">
        <a className="cursor-pointer" onClick={handleMoreButton}>
          <Button
            disabled
            loading={loading}
            variant={ButtonVariant.Secondary}
            size={ButtonSize.Medium}
            title="More NFTs"
          />
        </a>
      </div>
      {/* {selectedItem && (
        <Modal
          {...{
            setIsOpen,
            isOpen,
            children: <DetailModal data={selectedItem} />,
            title: selectedItem?.name ?? 'Asset Detail',
          }}
        />
      )} */}
    </div>
  )
}

export default Tabs2
