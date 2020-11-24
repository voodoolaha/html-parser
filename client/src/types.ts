export interface IDoc {
  id: number
  tag: string
  text: string
}

export interface IContextProps {
  doc: Array<IDoc>
  loading: Boolean
  keyword: string
}
