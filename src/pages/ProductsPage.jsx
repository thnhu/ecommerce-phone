// eslint-disable-next-line no-unused-vars
import React from 'react'
import ProductImagesSelection from './ProductsPageComponents/ProductImagesSelection'
import ProductDetail from './ProductsPageComponents/ProductDetails'

const ProductsPage = () => {
  return (
    <>
    <div className='flex'>
      <ProductImagesSelection></ProductImagesSelection>
      <ProductDetail></ProductDetail>

    </div>
    </>
  )
}

export default ProductsPage