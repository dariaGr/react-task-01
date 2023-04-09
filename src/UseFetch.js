import { useEffect, useReducer } from 'react'
import axios from 'axios'

export const useFetch = url => {
  const paramObj = {
    params: {
      _limit: 3,
    },
  }
  const refetch = paramObj => {
    return `${url}?_limit=${paramObj.params._limit}`
  }

  const initialState = {
    data: [],
    error: false,
    isLoading: false,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'isLoading':
        return { ...initialState, isLoading: action.payload }
      case 'fetched':
        return { ...initialState, data: action.payload }
      case 'error':
        return { ...initialState, error: action.payload }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (!url) return
    dispatch({ type: 'refetch', payload: true })

    try {
      dispatch({ type: 'isLoading', payload: true })

      axios.get(refetch(paramObj)).then(response => {
        dispatch({ type: 'fetched', payload: response.data })
      })
    } catch (error) {
      dispatch({ type: 'error', payload: true })
    }
  }, [url])

  return state
}

export default useFetch
