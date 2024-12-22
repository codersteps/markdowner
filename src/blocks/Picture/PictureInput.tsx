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
      <div className="mdr-space-y-1.5">
        {value.src && !cropperImageSrc && (
          <div onClick={onChoose}>
            <img
              src={value.src}
              alt={value.alt}
              width={480}
              height={240}
              className="mdr-w-full mdr-h-auto"
            />
          </div>
        )}

        <div
          className={cn(
            cropperImageSrc ? 'mdr-block' : 'mdr-hidden',
            'mdr-max-w-full',
          )}
        >
          <img
            ref={cropperImageRef}
            src={
              cropperImageSrc ||
              'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
            }
            width={480}
            height={240}
            className="mdr-block mdr-w-full mdr-max-w-full mdr-h-auto"
            alt="Image to use with cropperjs."
          />
        </div>

        {!cropperImageSrc && !value.src && (
          <div
            className="mdr-relative"
            style={{ paddingTop: `${(486 / 960) * 100}%` }}
          >
            <button
              type="button"
              onClick={onChoose}
              className="mdr-absolute mdr-inset-0 mdr-h-full mdr-w-full mdr-flex mdr-items-center mdr-justify-center mdr-text-plumbeous mdr-hover:text-black mdr-border mdr-border-mercury mdr-hover:border-plumbeous mdr-rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="mdr-size-8"
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

        <div className="mdr-space-y-1.5 mdr-text-xs">
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
            className="mdr-block mdr-w-full mdr-transition-colors mdr-duration-300 mdr-py-1 mdr-px-1.5 mdr-bg-white mdr-border mdr-border-mercury mdr-placeholder:text-plumbeous mdr-focus:outline-none mdr-focus:border-plumbeous"
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
            className="mdr-block mdr-w-full mdr-transition-colors mdr-duration-300 mdr-py-1 mdr-px-1.5 mdr-bg-white mdr-border mdr-border-mercury mdr-placeholder:text-plumbeous mdr-focus:outline-none mdr-focus:border-plumbeous"
          />
        </div>

        <div className="mdr-flex mdr-items-center mdr-justify-end mdr-gap-3">
          {cropperImageSrc && !uploaded && (
            <button
              type="button"
              className="mdr-bg-white mdr-w-20 mdr-h-10 mdr-transition-colors mdr-duration-300 mdr-border mdr-border-mercury mdr-text-plumbeous mdr-hover:border-plumbeous mdr-hover:text-black mdr-rounded mdr-text-sm mdr-font-medium"
              onClick={onUpload}
            >
              Upload
            </button>
          )}
          {cropperImageSrc && (
            <button
              type="button"
              className="mdr-bg-white mdr-h-10 mdr-transition-colors mdr-duration-300 mdr-border mdr-border-mercury mdr-text-plumbeous mdr-hover:border-plumbeous mdr-hover:text-black mdr-rounded mdr-text-sm mdr-font-medium mdr-px-3"
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
