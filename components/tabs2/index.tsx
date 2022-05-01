import React, { useState, useEffect } from 'react'
import Modal, { DetailModal } from '../modals/index'
import Button, { ButtonSize, ButtonVariant } from '../../theme/button'
import axios from 'axios'
import TabItem from './tabItem'
import NFTModal from '../modals/nftModal'

export class NFTModel {
  public id: INFT['id']
  public imageUrl: INFT['imageUrl']
  public name: INFT['name']
  public description: INFT['description']
  public address: INFT['address']
  public numberOfSales: INFT['numberOfSales']
  public traits: INFT['traits']
  public price: INFT['price']
  public collection: INFT['collection']
  public tokenId: INFT['tokenId']

  constructor(data: any) {
    this.id = data.id
    this.imageUrl = data.image_url
    this.name = data.name
    this.description = data.description
    this.address = data.asset_contract.address
    this.numberOfSales = data.num_sales
    this.traits = data.traits.map((item: any) => ({
      type: item.trait_type,
      value: item.value,
      count: item.trait_count,
    }))
    this.price = Number(data.last_sale.payment_token.eth_price)
    this.collection = {
      image: data.collection.image_url,
      name: data.collection.name,
      payoutAddress: data.collection.payout_address,
      slug: data.collection.slug,
    }
    this.tokenId = data.token_id
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
  collection: {
    image: string
    name: string
    payoutAddress: string
    slug: string
  }
  traits: { type: string; value: string; count: number }[]
  price: number
  tokenId: string
}

function Tabs2({ collection }: { collection: 'ape' | 'god' }) {
  const [data, setData] = useState<INFT[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<INFT>()
  const [isOpen, setIsOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const FakeBoredApeYachtClub = '0x7470ea065e50e3862cd9b8fb7c77712165da80e5'
  const AzukiGod = '0xb74bf94049d2c01f8805b8b15db0909168cabf46'

  const collections = React.useMemo(
    () => ({
      ape: {
        title: 'Fake Bored Ape Yacht Club',
        address: FakeBoredApeYachtClub,
      },
      god: {
        title: 'Azuki God',
        address: AzukiGod,
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
          url: `api/v1/assets?asset_contract_address=${collections[collection].address}&order_by=sale_price&order_direction=desc&offset=${currentIndex}&limit=16`,
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
    setTimeout(getNFTs, currentIndex === 0 && collection === 'god' ? 2000 : 0)
  }, [collection, collections, currentIndex])

  function handleMoreButton() {
    setCurrentIndex(currentIndex + 1)
  }

  return (
    <div className="w-full p-6 bg-gray-100">
      <h2 className="text-xl mb-4 tracking-tight font-extrabold text-gray-900">
        <span className="block xl:inline">{collections[collection].title}</span>
      </h2>

      <div className="grid md:grid-cols-4 grid-cols-2 gap-2">
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
      {selectedItem && (
        <Modal
          {...{
            setIsOpen,
            isOpen,
            children: <NFTModal data={selectedItem} />,
            title: selectedItem?.name ? selectedItem?.name : selectedItem.collection.name + ' #' + selectedItem.tokenId,
          }}
        />
      )}
    </div>
  )
}

export default Tabs2
