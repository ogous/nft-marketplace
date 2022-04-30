import React, { useState } from 'react'
import { IAsset } from '../../types/asset'
import Image from 'next/image'
import classNames from '../../utils/className'
import useCountDown from '../../hooks/countdown'
import Button from '../../theme/button'
import Modal, { BidModal } from '../modals'
import { INFT } from '../tabs2/index'
import { PhotographIcon } from '@heroicons/react/outline'

export default function NFTModal({ data }: { data: INFT }) {
  const [loading, setLoading] = useState(false)
  //   const { countDownText, isBiddable } = useCountDown(data.endTime)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div key={data.id} className="w-full relative rounded-md">
      <ul className="mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
        <li className="w-full aspect-square	relative">
          <Image alt="" src={data.imageUrl} layout="fill" objectFit="cover" className="rounded-md" />
        </li>
        <li>
          <h3 className="text-2xl font-extrabold leading-5 my-4">{'#' + data.tokenId}</h3>
        </li>
        <li>
          <span className="text-gray-700 font-bold">Collection</span>
        </li>
        <li className="flex items-center mt-2">
          {data.collection.image ? (
            <Image
              className="rounded-full"
              src={data.collection.image}
              width={48}
              height={48}
              alt={data.collection.name}
            />
          ) : (
            <div className="flex items-center w-[48px] rounded-full h-[48px] justify-center bg-gray-100">
              <PhotographIcon className="h-4 w-4" />
            </div>
          )}
          <div className="ml-2">
            <h4 className="font-bold">{data.collection.name}</h4>
            <span className="text-xs text-gray-500">{data.collection.payoutAddress}</span>
          </div>
        </li>
        <li className="flex justify-between items-center mt-4">
          <div className="flex items-center">
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.24746 8.15576L4.80473 10.9395L0.35907 8.15576L4.80473 0.332352L9.24746 8.15576ZM4.80473 11.8335L0.35907 9.04969L4.80473 15.6912L9.25038 9.04969L4.80473 11.8335Z"
                fill="#00AC4F"
              />
            </svg>

            <span className="text-[#00AC4F] text-lg ml-2 font-bold">{data.price ?? 0} ETH</span>
          </div>
        </li>
        <li>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {data.traits.map((trait, idx) => (
              <div key={trait.type + idx} className="bg-gray-100 rounded-md py-2 px-4">
                <span className="text-primary text-sm block">{trait.type}</span>
                <span className="font-bold text-sm block">{trait.value}</span>
                <span className="text-gray-500 text-xs block">{trait.count}</span>
              </div>
            ))}
          </div>
        </li>
      </ul>
    </div>
  )
}
