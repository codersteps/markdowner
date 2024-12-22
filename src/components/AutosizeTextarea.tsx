import {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
  TextareaHTMLAttributes,
} from 'react'
import { cn } from '@/lib'
import autosize from 'autosize'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  setHeight?: (height: string) => void
}

export const AutosizeTextarea = forwardRef<HTMLTextAreaElement, Props>(
  function AutosizeTextarea({ setHeight, className, ...props }: Props, ref) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
      const textareaEl = textareaRef.current as HTMLTextAreaElement
      const onAutosizeResized = () => {
        if (setHeight) {
          setHeight(textareaEl.style.height)
        }
      }

      autosize(textareaEl)
      if (setHeight) {
        setHeight(textareaEl.style.height)
      }

      textareaEl.addEventListener('autosize:resized', onAutosizeResized)

      return function () {
        autosize.destroy(textareaEl)
        textareaEl.removeEventListener('autosize:resized', onAutosizeResized)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useImperativeHandle(ref, () => {
      return textareaRef.current as HTMLTextAreaElement
    }, [])

    return (
      <textarea
        ref={textareaRef}
        className={cn(
          'mdr-block mdr-w-full placeholder:mdr-text-plumbeous mdr-resize-none focus:mdr-outline-none',
          className,
        )}
        {...props}
      />
    )
  },
)
