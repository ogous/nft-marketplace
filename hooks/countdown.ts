import { useState } from 'react'
import { formatDistance, isAfter } from 'date-fns'

const useCountDown = (time: string | Date) => {
  const [countDown, setCountDown] = useState<string | undefined>(() => {
    if (isAfter(new Date(time), new Date())) {
      return formatDistance(new Date(time), new Date(), {
        addSuffix: true,
        includeSeconds: true,
      })
    }
  })

  setInterval(() => {
    if (isAfter(new Date(time), new Date())) {
      setCountDown(
        formatDistance(new Date(time), new Date(), {
          addSuffix: true,
          includeSeconds: true,
        }),
      )
    } else {
      setCountDown(undefined)
    }
  }, 1000)

  return { countDownText: countDown ?? 'This bidding is ended', isBiddable: Boolean(countDown) }
}

export default useCountDown
