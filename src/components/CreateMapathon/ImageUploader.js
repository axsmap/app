import React, { useEffect, useRef, useState } from 'react'

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
      <button onClick={() => inputRef.current.click()} type="button">
        Upload image
      </button>
      {imageURLs.map(imageSrc => <img src={imageSrc} alt="testImage" />)}
    </>
  )
}
