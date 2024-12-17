import { useCallback, useState } from 'react'
import { cn, toastr, useCropper } from '@/lib'
import { MarkdownerAction, Picture, UploadHandler } from '@/types'

type Props = {
  value: Picture
  dispatch(action: MarkdownerAction): void
  handleUpload: UploadHandler | null
}

export function PictureInput({ value, dispatch, handleUpload }: Props) {
  const {
    getBlob,
    destroyCropper,
    cropperImageRef,
    cropperImageSrc,
    setCropperImageSrc,
  } = useCropper({ autoCropArea: 1, zoomable: false })
  const [fileType, setFileType] = useState('image/png')
  const [uploaded, setUploaded] = useState(!!value.src)

  const onChoose = useCallback(() => {
    const fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
    fileInput.setAttribute('name', 'file')
    fileInput.setAttribute('accept', 'image/*')

    fileInput.onchange = async () => {
      if (!fileInput.files || fileInput.files.length === 0) {
        toastr.show('error', 'no file was chosen')
        return
      }

      if (!fileInput.files[0].type.startsWith('image/')) {
        toastr.show('error', 'please choose a valid image file')
        return
      }

      setUploaded(false)
      setFileType(fileInput.files[0].type)
      setCropperImageSrc(URL.createObjectURL(fileInput.files[0]))
    }

    fileInput.click()
  }, [setCropperImageSrc])

  const onUpload = useCallback(async () => {
    try {
      const blob = await getBlob(fileType)
      const formData = new FormData()
      formData.append('file', blob)

      const upload = handleUpload
        ? await handleUpload(formData)
        : { error: "the onUpload prop wasn't provided." }

      if ('error' in upload) {
        toastr.show('error', upload.error)
        return
      }

      destroyCropper()
      setUploaded(true)

      dispatch({
        type: 'UPDATE_BLOCK',
        payload: {
          block: {
            ...value,
            alt: upload.alt || '',
            src: upload.path,
            caption: upload.caption || '',
          },
        },
      })
    } catch (err) {
      if (err instanceof Error) {
        toastr.show('error', err.message)
      }
    }
  }, [fileType, dispatch, getBlob, value, handleUpload, destroyCropper])

  return (
    <div>
      <div className="space-y-1.5">
        {value.src && !cropperImageSrc && (
          <div onClick={onChoose}>
            <img
              src={value.src}
              alt={value.alt}
              width={480}
              height={240}
              className="w-full h-auto"
            />
          </div>
        )}

        <div className={cn(cropperImageSrc ? 'block' : 'hidden', 'max-w-full')}>
          <img
            ref={cropperImageRef}
            src={
              cropperImageSrc ||
              'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
            }
            width={480}
            height={240}
            className="block w-full max-w-full h-auto"
            alt="Image to use with cropperjs."
          />
        </div>

        {!cropperImageSrc && !value.src && (
          <div
            className="relative"
            style={{ paddingTop: `${(486 / 960) * 100}%` }}
          >
            <button
              type="button"
              onClick={onChoose}
              className="absolute inset-0 h-full w-full flex items-center justify-center text-plumbeous hover:text-black border border-mercury hover:border-plumbeous rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </button>
          </div>
        )}

        <div className="space-y-1.5 text-xs">
          <input
            id={`alt-${value.id}`}
            type="text"
            placeholder="Alt"
            value={value.alt}
            onChange={({ target: { value: alt } }) =>
              dispatch({
                type: 'UPDATE_BLOCK',
                payload: { block: { ...value, alt } },
              })
            }
            className="block w-full transition-colors duration-300 py-1 px-1.5 bg-white border border-mercury placeholder:text-plumbeous focus:outline-none focus:border-plumbeous"
          />
          <input
            id={`caption-${value.id}`}
            type="text"
            placeholder="Caption"
            value={value.caption}
            onChange={({ target: { value: caption } }) =>
              dispatch({
                type: 'UPDATE_BLOCK',
                payload: { block: { ...value, caption } },
              })
            }
            className="block w-full transition-colors duration-300 py-1 px-1.5 bg-white border border-mercury placeholder:text-plumbeous focus:outline-none focus:border-plumbeous"
          />
        </div>

        <div className="flex items-center justify-end gap-3">
          {cropperImageSrc && !uploaded && (
            <button
              type="button"
              className="bg-white w-20 h-10 transition-colors duration-300 border border-mercury text-plumbeous hover:border-plumbeous hover:text-black rounded text-sm font-medium"
              onClick={onUpload}
            >
              Upload
            </button>
          )}
          {cropperImageSrc && (
            <button
              type="button"
              className="bg-white h-10 transition-colors duration-300 border border-mercury text-plumbeous hover:border-plumbeous hover:text-black rounded text-sm font-medium px-3"
              onClick={onChoose}
            >
              Replace
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
