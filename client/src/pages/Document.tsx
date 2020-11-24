import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SearchContext } from '../context/SearchContext'
import { IDoc } from '../types'
import { sectionStyle } from '../styles/styles'

export const Document = () => {
  const { doc, keyword } = useContext(SearchContext)
  const [searchDoc, setSearchDoc] = useState<IDoc[]>(doc)

  const highlightMatch = useCallback(() => {
    const mDoc = doc.map((item) => {
      const docItem = { ...item }
      let index = item.text.toLowerCase().indexOf(keyword.toLowerCase())
      if (index >= 0 && keyword !== '') {
        docItem.text =
          item.text.substring(0, index) +
          `<strong>${item.text.substring(
            index,
            index + keyword.length
          )}</strong>` +
          item.text.substring(index + keyword.length)
      }

      return docItem
    })

    setSearchDoc(mDoc)
  }, [doc, keyword])

  useEffect(() => {
    highlightMatch()
  }, [doc, highlightMatch])

  return (
    <div>
      {searchDoc.map((i) => (
        <div
          style={sectionStyle}
          key={i.id}
          dangerouslySetInnerHTML={{ __html: i.text }}
        ></div>
      ))}
    </div>
  )
}
