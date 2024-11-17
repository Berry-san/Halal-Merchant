// utils/getProductImageURL.ts

export function getProductImageURL(productPicture: any): string | undefined {
  if (!productPicture) {
    return undefined
  }

  if (Array.isArray(productPicture)) {
    // If product_picture is an array, return the first item if it exists
    return productPicture[0] || undefined
  } else if (typeof productPicture === 'object' && productPicture.picture1) {
    // If product_picture is an object, return picture1 if it exists
    return productPicture.picture1
  }

  return undefined // Return undefined if neither case matches
}
