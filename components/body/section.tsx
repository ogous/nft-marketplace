import Button, { ButtonSize } from '../../theme/button'
import Image from 'next/image'

export default function Section() {
  return (
    <main className="mt-10 mx-auto max-w-7xl px-6 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28 relative">
      <div className="sm:text-center lg:text-left w-1/2 pr-8">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Discover, and collect </span>{' '}
          <span className="block text-primary xl:inline">Digital Art NFTs</span>
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, Sell, and discover exclusive
          digital assets.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="mt-3 mb-6">
            <Button title="Explore Now" size={ButtonSize.Big} />
          </div>
        </div>
        <div className="grid grid-cols-3 w-2/3 mb-16">
          <div className="grid">
            <span className="font-extrabold text-4xl">
              98<span className="font-bold">K+</span>
            </span>
            <span className="font-xl text-gray-500">Artwork</span>
          </div>
          <div className="grid">
            <span className="font-extrabold text-4xl">
              12<span className="font-bold">K+</span>
            </span>
            <span className="font-xl text-gray-500">Auction</span>
          </div>
          <div className="grid">
            <span className="font-extrabold text-4xl">
              15<span className="font-bold">K+</span>
            </span>
            <span className="font-xl text-gray-500">Artist</span>
          </div>
        </div>
      </div>

      <div className="lg:absolute lg:top-20 lg:right-0 lg:w-1/3 animate-bounce z-1 transition delay-100">
        <div className="h-[320] items-center flex">
          <Image width={260} height={280} src="/hero/hero_3.png" alt="Nft" />
        </div>
      </div>
      <div className="lg:absolute lg:top-10 lg:right-10 lg:w-1/3 animate-bounce z-2 transition delay-400">
        <div className="h-[320] items-center flex">
          <Image width={280} height={300} src="/hero/hero_2.png" alt="Nft" />
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-20 lg:w-1/3 animate-bounce z-3">
        <Image width={300} height={320} src="/hero/hero_1.png" alt="Nft" />
      </div>
      <div className="absolute left-1/2 ml-24 top-16  z-5">
        <Image
          className="-right-20"
          width={100}
          height={100}
          // className="h-56  object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/hero/marker.png"
          alt="Live Auction mark"
        />
      </div>
    </main>
  )
}
