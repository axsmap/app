import { Modal, Box, Typography, Grid } from '@material-ui/core'
import { AddCircle, Close, CloudUpload } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { FaUpload } from 'react-icons/fa'
import styled from 'styled-components'
import def1 from '../../images/mapathonsDefaults/def1.jpg'
import def2 from '../../images/mapathonsDefaults/def2.jpg'
import def3 from '../../images/mapathonsDefaults/def3.jpg'
import def4 from '../../images/mapathonsDefaults/def4.jpg'
import def5 from '../../images/mapathonsDefaults/def5.jpg'
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
  border: 4px solid white;
  background-color: white;
  border-radius: 10px ${media.desktop`
    padding: 2rem 0;
  `};
`

const ModalGrid = styled.div`
  display: grid
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 2.5em 1em;
  padding-left: 1rem
  padding-right: .5rem
`

const ModalItem = styled.div`
  display: flex
  justify-content: center
  height: 150px
  width: 200px
`

const UploadDiv = styled.div`
  display: flex
  justify-content: center
  padding: .5rem
  background-color: #D3D3D3
  cursor: pointer
  border: 1px solid #D3D3D3
  border-radius: 10px
`

export default function ImageUploader() {
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const [hide, setHide] = useState(true)
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)
  const defaultURL = []

  useEffect(
    () => {
      const newImageURLs = []
      if (images.length < 1) return
      images.forEach(image => newImageURLs.push(URL.createObjectURL(image)))
      setImageURLs(newImageURLs)
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

  const handleDefaultPick = defaultImage => {}

  const showSelectedImage = (uploadedURLs, defaultURLinput) => {
    if (uploadedURLs) {
      return uploadedURLs.map(imageSrc => (
        <img src={imageSrc} alt="testImage" />
      ))
    }

    if (defaultURLinput) {
      return defaultURLinput.map(imageSrc => (
        <img src={imageSrc} alt="testImage" />
      ))
    }

    return null
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
              <UploadDiv onClick={() => inputRef.current.click()}>
                <FaUpload size={28} />
                <UploadDiv>Upload Image</UploadDiv>
              </UploadDiv>
              <ModalItem onClick={handleDefaultPick(def1)}>
                <img src={def1} alt="default1" />
              </ModalItem>
              <ModalItem>
                <img src={def2} alt="default2" />
              </ModalItem>
              <ModalItem>
                <img src={def3} alt="default3" />
              </ModalItem>
              <ModalItem>
                <img src={def4} alt="default4" />
              </ModalItem>
              <ModalItem>
                <img src={def5} alt="default5" />
              </ModalItem>
            </ModalGrid>
          </InnerModalDiv>
        </ModalContainerDiv>
      </Modal>
      {/* {imageURLs.map(imageSrc => <img src={imageSrc} alt="testImage" />)} */}
      {showSelectedImage(imageURLs, defaultURL)}
    </>
  )
}
