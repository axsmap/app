import React, { useEffect, useState } from 'react'

export default function ImageUploader() {
  const [images, setImages] = useState([])
  const [imageURLs, setImageURLs] = useState([])

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
        ref={fileInput => (this.fileInput = fileInput)}
      />
      {imageURLs.map(imageSrc => <img src={imageSrc} alt="testImage" />)}
    </>
  )
}
