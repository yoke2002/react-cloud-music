import { createContext, useReducer } from 'react'

export const CategoryContext = createContext({})

export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY'
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA'

function reducer(state, action) {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return { ...state, category: action.payload }
    case CHANGE_ALPHA:
      return { ...state, alpha: action.payload }
    default:
      return state
  }
}

export default function Data(props) {
  const [data, dispatch] = useReducer(reducer, {
    category: '',
    alpha: ''
  })
  return (
    <CategoryContext.Provider value={{ data, dispatch }}>
      {props.children}
    </CategoryContext.Provider>
  )
}
