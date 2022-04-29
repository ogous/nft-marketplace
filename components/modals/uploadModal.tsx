import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { createNFT } from '../../api/methods'
import { IBidding } from '../../types/bidding'

enum BiddingCategory {
  art = 'art',
  celebrities = 'celebrities',
  gaming = 'gaming',
  sport = 'sport',
  music = 'music',
  crypto = 'crypto',
}

type Inputs = {
  image: string
  title: string
  endTime: string
  lastPrice: string
  user: string
  category: BiddingCategory
}

export default function UploadModal() {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<Inputs>()
  const [loading, setLoading] = useState(false)
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)
    console.log(data.image)
    try {
      // console.log(data)
      // const fuck = new FormData()
      // fuck.append('image', data.image)
      // fuck.append('title', data.title)
      // fuck.append('endTime', data.endTime)
      // fuck.append('lastPrice', data.lastPrice)
      // fuck.append('user', data.user)
      // fuck.append('category', data.category)
      // console.log(fuck)
      // await createNFT(data.image)
    } catch (error) {
      if (error instanceof Error) window.alert(error.message)
    } finally {
      setLoading(false)
    }
    console.log(data)
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" method="post">
      <div className="mb-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="image">
            Upload Image
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            aria-describedby="image_help"
            id="image"
            type="text"
            {...register('image', { required: true })}
            required
          />
          {errors.image && <span className="text-red">Image file is required</span>}
          <p className="mt-1 text-sm text-gray-500 " id="image_help">
            {/* SVG, PNG, JPG or GIF */}
            Add image URL, image upload is coming soon...
          </p>
        </div>
      </div>
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 ">
          Title
        </label>
        <input
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="KingCrypto etc."
          {...register('title', { required: true })}
          required
        />
        {errors.title && <span className="text-red">Title is required</span>}
      </div>
      <div className="mb-6">
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 ">
          Category
        </label>
        <select
          required
          {...register('category', { required: true })}
          id="category"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ">
          <option value={''}>Select a category</option>
          <option value="art">Art</option>
          <option value="celebrities">Celebrities</option>
          <option value="gaming">Gaming</option>
          <option value="sport">sport</option>
          <option value="music">Music</option>
          <option value="crypto">Crypto</option>
        </select>
        {errors.category && <span className="text-red">Category is required</span>}
      </div>
      <div className="mb-6">
        <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 ">
          End Time
        </label>
        <input
          type="text"
          id="last_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder={new Date().toUTCString()}
          defaultValue={new Date().toUTCString()}
          {...register('endTime', { required: true })}
          required
        />
        <p className="mt-1 text-sm text-gray-500 " id="image_help">
          Enter time UTC string, select Date and Time coming soon...
        </p>
      </div>
      <input type="hidden" value={0} {...register('lastPrice', { required: true })} />
      <input
        type="hidden"
        value={'0xd31fe3b2c23bbf7301deb5888f0627482a7622b6'}
        {...register('user', { required: true })}
      />

      {loading ? (
        <span>Loading</span>
      ) : (
        <input
          type="submit"
          className="w-full flex justify-center h-12 px-8 text-xl font-medium text-white bg-primary border border-transparent rounded-full hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        />
      )}
    </form>
  )
}
