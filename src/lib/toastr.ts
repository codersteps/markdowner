import Noty from 'noty'

Noty.overrideDefaults({
  theme: 'nest',
  layout: 'topCenter',
  timeout: 3000,
})

class Toastr {
  show(type: Noty.Type, text: string) {
    new Noty({
      text,
      type,
    }).show()
  }

  confirm(text: string, onConfirm: () => void) {
    const n = new Noty({
      text: text,
      timeout: false,
      layout: 'center',
      buttons: [
        Noty.button('YES', 'px-3 text-red-600', async () => {
          if (onConfirm.constructor.name === 'AsyncFunction') {
            await onConfirm()
          } else {
            onConfirm()
          }
          n.close()
        }),
        Noty.button('NO', 'px-3 text-secondary', () => {
          n.close()
        }),
      ],
    })
    n.show()
  }
}

export const toastr = new Toastr()
