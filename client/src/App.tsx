import React, { useCallback, useEffect, useState } from 'react'
import { useHttp } from './hooks/http.hook'
import { Document } from './pages/Document'
import { Container, Input, InputAdornment } from '@material-ui/core'
import { SearchContext } from './context/SearchContext'
import { SearchOutlined } from '@material-ui/icons'
import { Loader } from './components/Loader'
import { IDoc } from './types'
import { container } from './styles/styles'

function App() {
  const [doc, setDoc] = useState<IDoc[]>([{ id: 0, tag: '', text: '' }])
  const { loading, request } = useHttp()
  const [keyword, setKeyword] = useState<string>('')

  const fetchDoc = useCallback(async () => {
    try {
      const fetched = await request('/api/document', 'GET')
      setDoc(fetched)
    } catch (err) {
      console.error(err)
    }
  }, [request])

  useEffect(() => {
    fetchDoc()
  }, [fetchDoc])

  return (
    <SearchContext.Provider value={{ doc, loading, keyword }}>
      <Container style={container}>
        <h2>
          {keyword ? `Keyword: ${keyword}` : 'Type something to start search'}
        </h2>
        <Input
          id="input-with-icon-adornment"
          onChange={(e) => setKeyword(e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <SearchOutlined />
            </InputAdornment>
          }
        />
        {loading ? <Loader /> : <Document />}
      </Container>
    </SearchContext.Provider>
  )
}

export default App
