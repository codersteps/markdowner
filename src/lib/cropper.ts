import { toastr } from '@/lib'
import Cropper from 'cropperjs'
import { useCallback, useEffect, useRef, useState } from 'react'

export function useCropper(options: Cropper.Options = {}) {
  const cropper = useRef<Cropper | null>(null)
  const cropperImageRef = useRef<HTMLImageElement | null>(null)
  const [cropperImageSrc, setCropperImageSrc] = useState<string | null>(null)

  useEffect(() => {
    if (!cropperImageSrc) {
      return () => {}
    }

    if (!cropperImageRef.current) {
      toastr.show('error', 'cropper no image element found')
      return () => {}
    }

    cropper.current = new Cropper(cropperImageRef.current, options)

    return () => {
      cropper.current?.destroy()
      cropper.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cropperImageRef, cropperImageSrc])

  const getBlob = useCallback(
    (fileType: string = 'image/png'): Promise<Blob> => {
      return new Promise((res, rej) => {
        if (!cropper.current) {
          rej(new Error('no cropper instance was found'))
          return
        }

        cropper.current.getCroppedCanvas().toBlob(async (blob) => {
          if (!blob) {
            rej(
              new Error(
                'was not able to get the cropped image from the canvas',
              ),
            )
            return
          }

          res(blob)
        }, fileType)
      })
    },
    [cropper],
  )

  const destroyCropper = useCallback(() => {
    cropper?.current?.destroy()
    cropper.current = null
    setCropperImageSrc(null)
  }, [])

  return {
    getBlob,
    destroyCropper,
    cropperImageRef,
    cropperImageSrc,
    setCropperImageSrc,
  }
}
