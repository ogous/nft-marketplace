import { IAsset } from '../../types/asset'
import Link from 'next/link'
import Image from 'next/image'
import { Dispatch } from 'react'
import classNames from '../../utils/className'
import useCountDown from '../../hooks/countdown'
import { INFT } from '.'
import { PhotographIcon } from '@heroicons/react/outline'
interface ITabItem {
  post: INFT
  setIsOpen: Dispatch<boolean>
  setSelectedItem: Dispatch<INFT>
}

export default function TabItem({ post, setIsOpen, setSelectedItem }: ITabItem) {
  const { countDownText, isBiddable } = useCountDown(post.createDate)

  return (
    <div
      onClick={() => {
        setIsOpen(true)
        setSelectedItem(post)
      }}
      key={post.id}
      className="w-full relative rounded-md p-3 bg-white hover:bg-coolGray-100">
      <ul className="mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
        <li className="w-full aspect-square	relative">
          {post.imageUrl ? (
            <Image alt="" src={post.imageUrl} layout="fill" objectFit="cover" className="rounded-md" />
          ) : (
            <div className="bg-gray-200 absolute inset-0 rounded-md flex items-center justify-center">
              <PhotographIcon className="text-gray-400 h-12 w-12" />
            </div>
          )}
        </li>

        <li>
          <h3 className="text-sm font-medium leading-5 mt-4">{post.name}</h3>
        </li>
        <li className="flex lign-items mt-2">
          <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
            <path
              d="M9.24746 8.15576L4.80473 10.9395L0.35907 8.15576L4.80473 0.332352L9.24746 8.15576ZM4.80473 11.8335L0.35907 9.04969L4.80473 15.6912L9.25038 9.04969L4.80473 11.8335Z"
              fill="#00AC4F"
            />
          </svg>

          <span className="text-[#00AC4F] ml-2 font-bold">{post.numberOfSales} ETH</span>
        </li>
        <li>
          <hr className="my-4" />
        </li>
        <li className="flex justify-between items-center font-bold">
          <span
            className={classNames(isBiddable ? 'text-black' : 'text-gray-300', 'py-2 px-4 bg-gray-100 rounded-full')}>
            {countDownText}
          </span>
          <Link href="#">
            <a className="text-primary z-99 align-middle">Place a bid</a>
          </Link>
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
