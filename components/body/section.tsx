import Button, { ButtonSize } from '../../theme/button'
import Image from 'next/image'

export default function Section() {
  return (
    <main className="mt-10 mx-auto max-w-7xl px-6 sm:mt-12 md:mt-16 lg:mt-20 xl:mt-28 relative flex md:flex-row flex-col-reverse">
      <div className="sm:text-left text-center flex-1 pr-8">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">Discover, and collect </span>{' '}
          <span className="block text-primary xl:inline">Digital Art NFTs</span>
        </h1>
        <p className="mt-3 sm:text-left text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl xs:mx-auto md:mt-5 md:text-xl lg:mx-0">
          Digital marketplace for crypto collectibles and non-fungible tokens (NFTs). Buy, Sell, and discover exclusive
          digital assets.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex xs:justify-center ">
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
      <div className="flex-1 relative">
        <div className="h-[320px] mt-[60px] md:hidden" />
        <div className="absolute top-1/2 -ml-[80px] -mt-[160px] left-1/2 sm:items-center flex w-[320px] animate-bounce z-1 transition delay-100">
          <div className="h-[320px] items-center flex">
            <Image width={260} height={280} src="/hero/hero_3.png" alt="Nft" />
          </div>
        </div>
        <div className="absolute w-[320px] top-1/2 -mt-[160px]  left-1/2 -ml-[120px] animate-bounce z-2 transition delay-400">
          <div className="h-[320px] items-center flex">
            <Image width={280} height={300} src="/hero/hero_2.png" alt="Nft" />
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -mt-[160px] -ml-[160px] w-[320px] animate-bounce transition z-3">
          <Image width={300} height={320} src="/hero/hero_1.png" alt="Nft" />
        </div>
        <div className="absolute w-[320px] top-1/2 -mt-[140px] z-5 left-1/2 -ml-[210px]">
          <div className="bg-[#ffe0d4] inset-0 absolute animate-ping z-1 w-24 h-24 rounded-full" />

          <Image className="z-2" width={96} height={96} src="/hero/marker.png" alt="Live Auction mark" />
        </div>
      </div>
    </main>
  )
}
