import { useState } from 'react'
import { Tab } from '@headlessui/react'
import Link from 'next/link'
import Image from 'next/image'
import categories from './data'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
function Tabs() {
  return (
    <div className="w-full  px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex max-w-md space-x-1 rounded-xl bg-blue-900/20 p-1">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full  rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2',
                  selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                )
              }>
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {Object.values(categories).map((posts, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl bg-white p-3',
                'focus:outline-none ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:ring-2',
              )}>
              <ul className="flex flex-wrap">
                {posts.map((post) => (
                  <li key={post.id} className="w-1/4 relative rounded-md p-3 hover:bg-coolGray-100">
                    <ul className="mt-1 space-x-1 text-xs font-normal leading-4 text-coolGray-500">
                      <li className="w-full aspect-square	relative">
                        <Image
                          alt=""
                          src="https://images.unsplash.com/photo-1650702059233-71b26365cee0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
                          layout="fill"
                          className="rounded-md"
                        />
                      </li>
                      <li>
                        <h3 className="text-sm font-medium leading-5">{post.title}</h3>
                      </li>
                      <li>{post.date}</li>
                      <li>&middot;</li>
                      <li>{post.commentCount} comments</li>
                      <li>&middot;</li>
                      <li>{post.shareCount} shares</li>
                    </ul>
                    <Link href="#">
                      <a
                        className={classNames(
                          'absolute inset-0 rounded-md',
                          'focus:outline-none ring-blue-400 focus:z-10 focus:ring-2',
                        )}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  )
}

export default Tabs
