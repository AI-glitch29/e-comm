export type Product = {
  id: string
  name: string
  price: number
  imageSrc: string
  imageAlt?: string
}

export type CartLineItem = {
  product: Product
  quantity: number
}


