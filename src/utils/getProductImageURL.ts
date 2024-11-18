// utils/getProductImageURL.ts

export function getProductImageURL(product_picture: any): string | undefined {
  if (!product_picture) {
    return undefined
  }

  if (Array.isArray(product_picture)) {
    // If product_picture is an array, return the first item if it exists
    return product_picture[0] || undefined
  } else if (typeof product_picture === 'object' && product_picture.picture1) {
    // If product_picture is an object, return picture1 if it exists
    return product_picture.picture1
  }

  return undefined // Return undefined if neither case matches
}
