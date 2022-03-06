import { AddCircle } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'

import styled from 'styled-components'
import { colors, fonts, media, fontWeight, fontSize } from '../../styles'

const ImageUploadDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden
  padding: 1rem 1rem;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  background-color: #d3d3d3
  height: 20rem

  ${media.desktop`
    padding: 2rem 0;
  `};
`
const InnerUploadDiv = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden
  padding: 1rem 1rem;
  margin-top: 4rem
  cursor: pointer

  ${media.desktop`
    padding: 2rem 0;
  `};
`
export default function ImageUploader() {
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const inputRef = useRef(null)

  useEffect(
    () => {
      if (images.length < 1) return
      const newImageURLs = []
      images.forEach(image => newImageURLs.push(URL.createObjectURL(image)))
      setImageURLs(newImageURLs)
    },
    [images]
  )

  function onImageChange(e) {
    setImages([...e.target.files])
  }

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        ref={inputRef}
        style={{ display: 'none' }}
      />
      {/* <button onClick={() => inputRef.current.click()} type="button">
        Upload image
      </button> */}
      <ImageUploadDiv onClick={() => inputRef.current.click()}>
        <InnerUploadDiv>
          <AddCircle fontSize="large" />
          Add a photo
        </InnerUploadDiv>
      </ImageUploadDiv>

      {imageURLs.map(imageSrc => <img src={imageSrc} alt="testImage" />)}
    </>
  )
}
