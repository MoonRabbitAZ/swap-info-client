import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export function lockBodyScroll (container?: HTMLElement | Element) {
  container = container || document.querySelector('body')!
  disableBodyScroll(container, {
    allowTouchMove: el => {
      while (el && el !== document.body) {
        const scrollLockAttr = el.getAttribute('scroll-lock-ignore')
        if (scrollLockAttr !== null) {
          return true
        }
        el = el.parentNode as HTMLElement
      }
      return false
    },
  })
}

export function unlockBodyScroll (container?: HTMLElement | Element) {
  container = container || document.querySelector('body')!
  enableBodyScroll(container)
}
