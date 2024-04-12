import { getCookie, hasCookie, setCookie } from "cookies-next";


export const getCookieCart = (): { [key: string]: number } => {
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse(getCookie('cart') as string || '{}')
    return cookieCart
  }

  return {}
}

export const addCookieProductToCart = (id: string) => {
  const cookieCart = getCookieCart()

  if (cookieCart[id]) {
    cookieCart[id] += 1
  } else {
    cookieCart[id] = 1
  }

  setCookie('cart', JSON.stringify(cookieCart))
}

export const deleteCookieProductCart = (id: string) => {
  const cookieCart = getCookieCart()

  if (cookieCart[id]) {
    delete cookieCart[id]
  }

  setCookie('cart', JSON.stringify(cookieCart))
}

export const removeSingleItemFromProductCart = (id: string) => {
  const cookieCart = getCookieCart()

  if (cookieCart[id]) {
    if (cookieCart[id] === 1) {
      delete cookieCart[id]
    } else {
      cookieCart[id] -= 1
    }
  }

  setCookie('cart', JSON.stringify(cookieCart))
}