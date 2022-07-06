import { Modal, Box, Typography, Grid } from '@material-ui/core'
import { red } from '@material-ui/core/colors'
import { AddCircle, Close, CloudUpload } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { FaUpload } from 'react-icons/fa'
import styled from 'styled-components'
import def1 from '../../images/mapathonsDefaults/def1.jpeg'
import def2 from '../../images/mapathonsDefaults/def2.jpeg'
import def3 from '../../images/mapathonsDefaults/def3.jpeg'
import def4 from '../../images/mapathonsDefaults/def4.jpeg'
import def5 from '../../images/mapathonsDefaults/def5.jpeg'
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
  border: 1px solid #d3d3d3
  border-radius: 10px
  margin-top: 1rem

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
  gap: 1em;
  padding-left: 3rem
`

const ModalItem = styled.div`
  display: flex
  justify-content: center
  width: 150px
  height: 150px
  border: 1px solid #D3D3D3
  border-radius: 10px
  overflow: hidden
  cursor: pointer
`

const UploadDiv = styled.div`
  display: flex
  justify-content: center
  padding: .5rem
  background-color: #D3D3D3
  cursor: pointer
  border: 1px solid #D3D3D3
  border-radius: 10px
  width: 150px
  height: 150px
`
const UploadedImageDiv = styled.div`
  height: auto
  width: auto
  margin-top: 1rem
  margin-bottom: 1rem
`

export default function ImageUploader() {
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])
  const [defaultImage, setDefaultImage] = useState(0)
  const [hide, setHide] = useState(true)
  const [open, setOpen] = useState(false)
  const inputRef = useRef(null)

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

  const handleDefaultPick = imageNumber => {
    // console.log('cock')
    setDefaultImage(imageNumber)
    setHide(false)
    handleClose()
    console.log(defaultImage)
  }

  const showSelectedImage = (uploadedURLs, defaultImage) => {
    if (uploadedURLs.length > 0) {
      console.log('inside uploadedURLs')
      return uploadedURLs.map(imageSrc => (
        <UploadedImageDiv key={imageSrc}>
          <img
            src={imageSrc}
            alt="testImage"
            style={{ maxHeight: '100%', maxWidth: '100%' }}
          />
        </UploadedImageDiv>
      ))
    } else if (defaultImage > 0) {
      console.log('inside defaultImage', defaultImage)
      return (
        <UploadedImageDiv>
          <img
            src={require(`../../images/mapathonsDefaults/def${defaultImage}.jpeg`)}
            alt="testImage"
            style={{ maxHeight: '100%', maxWidth: '100%' }}
          />
        </UploadedImageDiv>
      )
    }
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
                <> Upload Image</>
              </UploadDiv>
              <ModalItem onClick={() => handleDefaultPick(1)}>
                <img src={def1} alt="default1" />
              </ModalItem>
              <ModalItem onClick={() => handleDefaultPick(2)}>
                <img src={def2} alt="default2" />
              </ModalItem>
              <ModalItem onClick={() => handleDefaultPick(3)}>
                <img src={def3} alt="default3" />
              </ModalItem>
              <ModalItem onClick={() => handleDefaultPick(4)}>
                <img src={def4} alt="default4" />
              </ModalItem>
              <ModalItem onClick={() => handleDefaultPick(5)}>
                <img src={def5} alt="default5" />
              </ModalItem>
            </ModalGrid>
          </InnerModalDiv>
        </ModalContainerDiv>
      </Modal>
      {showSelectedImage(imageURLs, defaultImage)}
    </>
  )
}
