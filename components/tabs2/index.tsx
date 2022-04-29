import { useState, useEffect } from 'react'
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

function Tabs2() {
  const [data, setData] = useState<INFT[]>()
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState<INFT>()
  const [isOpen, setIsOpen] = useState(false)

  const options = { method: 'GET' }

  async function getNFTs() {
    try {
      const response = await axios({
        method: 'GET',
        baseURL: 'https://testnets-api.opensea.io',
        url: 'api/v1/assets?owner=0x7470ea065e50e3862cd9b8fb7c77712165da80e5&order_direction=desc&offset=0&limit=20',
      })
      if (!response.data) return

      const data = response.data.assets?.map((item: any) => new NFTModel(item))

      if (data) setData(data)
    } catch (err) {
      if (err instanceof Error) window.alert(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getNFTs()
  }, [])

  return (
    <div className="w-full p-6 bg-gray-100">
      <h2 className="text-xl mb-4 tracking-tight font-extrabold text-gray-900">
        <span className="block xl:inline">FAKED BORED APE YACHT CLUB</span>
      </h2>

      <div className="grid grid-cols-4 gap-2">
        {data?.map((item) => {
          return <TabItem key={item.id} {...{ post: item, setIsOpen, setSelectedItem }} />
        })}
      </div>
      <div className="mt-6 items-center inline-block">
        <Button variant={ButtonVariant.Secondary} size={ButtonSize.Medium} title="More NFTs" />
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
