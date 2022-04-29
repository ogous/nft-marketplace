import { IBidding } from '../../types/bidding'
import Image from 'next/image'
import { Dispatch } from 'react'
import classNames from '../../utils/className'
import useCountDown from '../../hooks/countdown'

interface ITabItem {
  post: IBidding
  setIsOpen: Dispatch<boolean>
  setSelectedItem: Dispatch<IBidding>
}

export default function TabItem({ post, setIsOpen, setSelectedItem }: ITabItem) {
  const { countDownText, isBiddable } = useCountDown(post.endTime)

  return (
    <div className="w-full relative rounded-md p-3 bg-white hover:bg-coolGray-100">
      <ul className="mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
        <li className="w-full aspect-square	relative">
          <Image alt="" src={post.imageUrl} layout="fill" objectFit="cover" className="rounded-md" />
        </li>
        <li>
          <h3 className="text-sm font-medium leading-5 mt-4">{post.title}</h3>
        </li>
        <li className="flex justify-between items-center mt-2">
          <div className="flex items-center">
            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.24746 8.15576L4.80473 10.9395L0.35907 8.15576L4.80473 0.332352L9.24746 8.15576ZM4.80473 11.8335L0.35907 9.04969L4.80473 15.6912L9.25038 9.04969L4.80473 11.8335Z"
                fill="#00AC4F"
              />
            </svg>

            <span className="text-[#00AC4F] ml-2 font-bold">{post.lastPrice} ETH</span>
          </div>
          <div>
            <span className="bg-gray-100 rounded-full py-2 px-4 inline-block">
              {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
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

          <a className="text-primary z-99 align-middle">Place a bid</a>
        </li>
      </ul>

      <a
        onClick={() => {
          setIsOpen(true)
          setSelectedItem(post)
        }}
        className={classNames(
          'absolute inset-0 rounded-md cursor-pointer',
          'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2',
        )}
      />
    </div>
  )
}
