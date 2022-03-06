import { Modal, Box, Typography, Grid } from '@material-ui/core'
import { AddCircle, Close, CloudUpload } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { FaUpload } from 'react-icons/fa'
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

const ModalContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  width: 100%;
  height: 100%;
`

const InnerModalDiv = styled.div`
  height: 70%;
  width: 40%;
  border: 4px solid green;
  background-color: white;

  ${media.desktop`
    padding: 2rem 0;
  `};
`

const ModalGrid = styled.div`
  display: grid
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 4em 1em;
  padding-left: .5rem
  padding-right: .5rem
`

const ModalItem = styled.div`
  display: flex
  justify-content: center
  padding: .5rem
`

const UploadDiv = styled.div`
  display: flex
  justify-content: center
  padding: .5rem
  background-color: grey
  cursor: pointer
`

export default function ImageUploader() {
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const [hide, setHide] = useState(true)
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)

  useEffect(
    () => {
      if (images.length < 1) return
      const newImageURLs = []
      images.forEach(image => newImageURLs.push(URL.createObjectURL(image)))
      setImageURLs(newImageURLs)
      console.log(newImageURLs)
    },
    [images]
  )

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  function onImageChange(e) {
    setHide(false)
    handleClose()
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
      {hide ? (
        <ImageUploadDiv onClick={handleOpen}>
          <InnerUploadDiv>
            <AddCircle fontSize="large" />
            Add a photo
          </InnerUploadDiv>
        </ImageUploadDiv>
      ) : null}

      <Modal open={open} onClose={handleClose}>
        <ModalContainerDiv>
          <InnerModalDiv>
            <Close
              fontSize="large"
              style={{ marginTop: '-1rem', cursor: 'pointer' }}
              onClick={handleClose}
            />
            <Typography
              style={{
                paddingLeft: '1rem',
                marginTop: '1rem',
                marginBottom: '3rem'
              }}
            >
              Add or select an image that represents your story
            </Typography>
            <ModalGrid>
              <UploadDiv
                style={{ border: '2px solid black' }}
                onClick={() => inputRef.current.click()}
              >
                <FaUpload size={28} />
              </UploadDiv>
              <ModalItem style={{ border: '2px solid black' }}>2</ModalItem>
              <ModalItem style={{ border: '2px solid black' }}>3</ModalItem>
              <ModalItem style={{ border: '2px solid black' }}>4</ModalItem>
              <ModalItem style={{ border: '2px solid black' }}>5</ModalItem>
              <ModalItem style={{ border: '2px solid black' }}>6</ModalItem>
            </ModalGrid>
          </InnerModalDiv>
        </ModalContainerDiv>
      </Modal>
      {imageURLs.map(imageSrc => <img src={imageSrc} alt="testImage" />)}
    </>
  )
}
