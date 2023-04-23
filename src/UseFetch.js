import { useEffect, useState } from 'react'
import axios from 'axios'

export const useFetch = url => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = async (url, options) => {
    setIsLoading(true)
    try {
      const response = await axios.get(url, options)
      setData(response.data)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const refetch = options => {
    fetchData(url, options)
  }

  useEffect(() => {
    fetchData(url)
  }, [url])

  return {
    data,
    isLoading,
    error,
    refetch,
  }
}

export default useFetch
