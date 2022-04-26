import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

type Inputs = {
  example: string
  exampleRequired: string
}

export default function UploadModal() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  console.log(watch('example')) // watch input value by passing the name of it

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <input className="border rounded-md hover:border-blue-200" defaultValue="test" {...register('example')} />

      {/* include validation with required or other standard HTML validation rules */}
      <input className="border rounded-md hover:border-blue-200" {...register('exampleRequired', { required: true })} />
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input
        type="submit"
        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
      />
    </form>
  )
}
