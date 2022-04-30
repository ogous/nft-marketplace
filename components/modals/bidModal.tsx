import React, { useState } from 'react'
import { makeBid } from '../../api/methods'
import Button from '../../theme/button'
import { IAsset } from '../../types/asset'

export default function BidModal({
  asset,
  setAsset,
  setIsOpen,
}: {
  asset: IAsset
  setAsset: React.Dispatch<IAsset>
  setIsOpen: React.Dispatch<boolean>
}) {
  const [price, setPrice] = useState<number>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>()
  const onSubmit = async () => {
    if (!price || !asset._id) {
      setError('Price is required')
      return
    }
    if (asset.lastSale && asset.lastSale.price > price) {
      setError(`Bid have to be higher than asset's price`)
      return
    }
    setLoading(true)

    const data = {
      id: asset._id,
      price,
      user: '0xd31fE3b2c23bbf7301deB5888F0627482A7622B6',
    }

    try {
      await makeBid(data)
      setAsset({
        ...asset,
        lastSale: {
          price,
          user: data.user,
          eventTime: new Date().toISOString(),
        },
      })
      setIsOpen(false)
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mb-6">
      <div className="p-4 bg-gray-100 rounded-md">
        <span className="text-sm text-left text-gray-500">
          You are about to place a bid for <strong>{asset.title}</strong> from creator <strong>{asset.creator}</strong>.
        </span>
      </div>
      <div className="my-6">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">
          Your bid
        </label>
        <input
          type="number"
          id="price"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Enter bid"
          onChange={(e) => {
            setPrice(Number(e.currentTarget.value))
            setError(undefined)
          }}
          required
        />
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
      <a className="cursor-pointer mt-6" onClick={onSubmit}>
        <Button disabled loading={loading} title="Place a bid" />
      </a>
    </div>
  )
}
