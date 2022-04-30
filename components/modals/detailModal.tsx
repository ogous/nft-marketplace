import React, { useState } from 'react'
import { IAsset } from '../../types/asset'
import Image from 'next/image'
import classNames from '../../utils/className'
import useCountDown from '../../hooks/countdown'
import Button from '../../theme/button'
import Modal, { BidModal } from '../modals'

export default function DetailModal({ data, setData }: { data: IAsset; setData: React.Dispatch<IAsset> }) {
  const [loading, setLoading] = useState(false)
  const { countDownText, isBiddable } = useCountDown(data.endTime)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div key={data._id} className="w-full relative rounded-md">
      <ul className="mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
        <li className="w-full aspect-square	relative">
          <Image alt="" src={data.imageUrl} layout="fill" objectFit="cover" className="rounded-md" />
        </li>
        <li>
          <h3 className="text-2xl font-extrabold leading-5 mt-4">{data.title}</h3>
        </li>
        <li className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.24746 8.15576L4.80473 10.9395L0.35907 8.15576L4.80473 0.332352L9.24746 8.15576ZM4.80473 11.8335L0.35907 9.04969L4.80473 15.6912L9.25038 9.04969L4.80473 11.8335Z"
                fill="#00AC4F"
              />
            </svg>

            <span className="text-[#00AC4F] text-lg ml-2 font-bold">{data.lastSale?.price ?? 0} ETH</span>
          </div>
          <div>
            <span className="bg-gray-100 rounded-full py-2 px-4 inline-block">
              {data.category.charAt(0).toUpperCase() + data.category.slice(1)}
            </span>
          </div>
        </li>
        <li>
          <hr className="my-4" />
        </li>
        <li className="flex justify-between items-center font-bold">
          <span
            className={classNames(isBiddable ? 'text-black' : 'text-gray-300', 'py-2 px-4 bg-gray-100 rounded-full')}>
            {countDownText}
          </span>

          <a
            className={classNames(isBiddable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50')}
            onClick={() => setIsOpen(true)}>
            <Button title="Place a bid" disabled />
          </a>
        </li>
      </ul>

      <Modal
        {...{
          setIsOpen,
          isOpen,
          title: 'Place a bid',
          children: <BidModal asset={data} setAsset={setData} setIsOpen={setIsOpen} />,
        }}
      />
    </div>
  )
}
