import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { create } from '../../api/methods'
import Loader from '../../theme/loader'

enum AssetCategory {
  art = 'art',
  celebrities = 'celebrities',
  gaming = 'gaming',
  sport = 'sport',
  music = 'music',
  crypto = 'crypto',
}

type Inputs = {
  imageUrl: string
  title: string
  endTime: string
  creator: string
  category: AssetCategory
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

    try {
      await create(data)
    } catch (error) {
      if (error instanceof Error) window.alert(error.message)
    } finally {
      setLoading(false)
    }
    console.log(data)
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 " htmlFor="image">
            Image URI
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            aria-describedby="image_help"
            id="image"
            type="text"
            {...register('imageUrl', { required: true })}
            required
          />
          {errors.imageUrl && <span className="text-red-500 text-sm">Image file is required</span>}
          <p className="mt-1 text-sm text-gray-500 " id="image_help">
            {/* SVG, PNG, JPG or GIF */}
            Add image URI, image upload is coming soon...
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
        {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
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
        {errors.category && <span className="text-red-500 text-sm">Category is required</span>}
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
      <input
        type="hidden"
        value={'0xd31fe3b2c23bbf7301deb5888f0627482a7622b6'}
        {...register('creator', { required: true })}
      />

      {loading ? (
        <Loader />
      ) : (
        <input
          type="submit"
          className="cursor-pointer w-full flex items-center justify-center whitespace-nowrap font-bold border-2 border-primary rounded-full h-12 px-8 text-md bg-primary text-white hover:border-indigo-700 hover:bg-indigo-700"
        />
      )}
    </form>
  )
}
