import { LoaderCircleIcon } from 'lucide-react'
import React from 'react'

export default function loading() {
  return (
    <div className='grid min-h-[100dvh] place-items-center'><LoaderCircleIcon className='animate-spin'/></div>
  )
}
