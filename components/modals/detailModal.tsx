import React, { useState } from 'react'
import { IBidding } from '../../types/bidding'
import Link from 'next/link'
import Image from 'next/image'
import { formatDistance } from 'date-fns'
import classNames from '../../utils/className'

export default function DetailModal({ data }: { data: IBidding }) {
  const [loading, setLoading] = useState(false)

  return (
    <div key={data._id} className="w-full relative rounded-md p-3 hover:bg-coolGray-100">
      <ul className="mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
        <li className="w-full aspect-square	relative">
          <Image alt="" src={data.imageUrl} layout="fill" objectFit="cover" className="rounded-md" />
        </li>
        <li>
          <h3 className="text-sm font-medium leading-5">{data.title}</h3>
        </li>
        <li>{formatDistance(new Date(data.endTime), new Date(), { addSuffix: true })}</li>
        <li>
          <h3>{data.lastPrice} ETH</h3>
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
    </div>
  )
}
