import { useCallback, useEffect, useRef, useState } from 'react'

// export default function useIsMounted() {
//   const isMounted = useRef(false)

//   useEffect(() => {
//     isMounted.current = true

//     return () => {
//       isMounted.current = false
//     }
//   }, [])

//   return useCallback(() => isMounted.current, [])
// }

export default function useIsMounted() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted
}
