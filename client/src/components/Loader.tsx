import React from 'react'
import { CircularProgress, Container } from '@material-ui/core'

export const Loader = () => {
  return (
    <Container className="full-height">
      <CircularProgress />
    </Container>
  )
}
