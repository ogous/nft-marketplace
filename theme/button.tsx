import Link from 'next/link'
import classNames from '../utils/className'
import Loader from './loader'

export enum ButtonSize {
  Small,
  Medium,
  Big,
}

export enum ButtonVariant {
  Primary,
  Secondary,
}

interface IButton {
  title: string
  link?: string
  size?: ButtonSize
  variant?: ButtonVariant
  disabled?: boolean
  loading?: boolean
}

export default function Button({
  title,
  link = '',
  size = ButtonSize.Medium,
  variant = ButtonVariant.Primary,
  disabled = false,
  loading = false,
}: IButton) {
  const sizeMap = {
    [ButtonSize.Small]: 'h-9 px-6',
    [ButtonSize.Medium]: 'h-12 px-8',
    [ButtonSize.Big]: `px-10 h-16`,
  }
  const fontMap = {
    [ButtonSize.Small]: 'text-sm',
    [ButtonSize.Medium]: 'text-md',
    [ButtonSize.Big]: 'text-xl',
  }

  const variantMap = {
    [ButtonVariant.Primary]: 'bg-primary text-white',
    [ButtonVariant.Secondary]: 'text-primary',
  }
  const classes = classNames(
    sizeMap[size],
    variantMap[variant],
    fontMap[size],
    'w-full flex items-center justify-center whitespace-nowrap font-bold border-2 border-primary rounded-full',
  )

  if (disabled) {
    return <span className={classes}>{loading ? <Loader /> : title}</span>
  }

  return (
    <Link href={link}>
      <a className={classes}>{loading ? <Loader /> : title}</a>
    </Link>
  )
}
