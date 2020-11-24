import { createContext } from 'react'
import { IContextProps } from '../types'

export const SearchContext = createContext<IContextProps>({
  doc: [{ id: 0, tag: '', text: '' }],
  loading: true,
  keyword: '',
})
