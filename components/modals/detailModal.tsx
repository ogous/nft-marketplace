import React, { useState } from 'react'
import { IBidding } from '../../types/bidding'
import Link from 'next/link'
import Image from 'next/image'
import classNames from '../../utils/className'
import useCountDown from '../../hooks/countdown'

export default function DetailModal({ data }: { data: IBidding }) {
  const [loading, setLoading] = useState(false)
  const { countDownText, isBiddable } = useCountDown(data.endTime)

  return (
    <div key={data._id} className="w-full relative rounded-md p-3 hover:bg-coolGray-100">
      <ul className="mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
        <li className="w-full aspect-square	relative">
          <Image alt="" src={data.imageUrl} layout="fill" objectFit="cover" className="rounded-md" />
        </li>
        <li>
          <h3 className="text-sm font-medium leading-5">{data.title}</h3>
        </li>
        <li className={classNames(isBiddable ? 'text-black' : 'text-gray-300	')}>{countDownText}</li>
        <li>
          <h3>{data.lastPrice} ETH</h3>
        </li>
      </ul>

      {!isBiddable ? null : (
        <input
          title="Submit Price"
          type="submit"
          className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        />
      )}
    </div>
  )
}
