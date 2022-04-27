import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import axios from 'axios'
import { createNFT } from '../../pages/api/methods'
import { IBidding } from '../../types/bidding'

type Inputs = {
  imageUrl: string
  title: string
  endTime: Date
  lastPrice: number
}

export default function UploadModal() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const [loading, setLoading] = useState(false)
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true)

    try {
      await createNFT(data)
    } catch (error) {
      if (error instanceof Error) console.log(error.message)
    } finally {
      setLoading(false)
    }
    console.log(data)
  }

  console.log(watch('lastPrice')) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <fieldset>
        {/* register your input into the hook by invoking the "register" function */}
        <label htmlFor="imageUrl">Image URL:</label>
        <input
          id="imageUrl"
          className="'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60' border rounded-md hover:border-blue-200"
          defaultValue="https://images.unsplash.com/photo-1508138221679-760a23a2285b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
          {...register('imageUrl')}
        />
        {errors.imageUrl && <span>Title is required</span>}
        <label htmlFor="title">Title:</label>
        <input
          className="'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60' border rounded-md hover:border-blue-200"
          {...register('title', { required: true })}
        />
        {errors.title && <span>Title is required</span>}
        <label htmlFor="endTime">End Time:</label>
        <input
          className="'ring-2 ring-offset-2 ring-offset-sky-300 ring-white ring-opacity-60' border rounded-md hover:border-blue-200"
          {...register('endTime', { required: true })}
          defaultValue="2000-01-01T00:00:00.000Z"
        />
        {errors.title && <span>End time is required</span>}
        <input type="hidden" value={0} {...register('lastPrice', { required: true })} />

        {loading ? (
          <span>Loading</span>
        ) : (
          <input
            type="submit"
            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          />
        )}
      </fieldset>
    </form>
  )
}
