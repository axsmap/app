// @flow

import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  height: 100%;
  padding: 4em;
  background: papayawhip;
`

const Title = styled.h1`
  color: palevioletred;
  font-size: 1.5em;
  text-align: center;
`

const App = () =>
  <Wrapper>
    <Title>Hello World Humans!</Title>
  </Wrapper>

export default App
