// types.ts

// Product types
export interface Product {
  product_id: number | string
  category_id: string
  sub_category_id: string
  merchant_id: string
  product_name: string
  short_product_name: string
  product_description: string
  product_price: string
  product_model: string
  product_color: string
  product_picture?: {
    picture1?: string | File // Explicitly allow string or File here
  }
  expiry_date: string
  product_discount_percentage: string
  vat: string
  product_quantity: string
  created_at: string
  updated_at: string | null
  subcategory_name: string
  category_name: string
  vendor: string
  status: string
}

// Product details type (same as Product for this API)
export type ProductDetails = Product

// Add product request type
export interface AddProductRequest {
  productName: string
  shortProductName: string
  productPrice: number
  productDescription: string
  productModel: string
  productColor: string
  productQuantity: string
  productPictures: File
  expiryDate: Date
  categoryId: number
  subCategoryId: number
  merchantId: number
  productDiscountPercentage: number
  vat: number
  productId: string
}

// Update product request type
export interface UpdateProductRequest {
  product_name?: string
  short_product_name?: string
  product_description?: string
  product_price?: string
  product_model?: string
  product_color?: string
  product_quantity?: string
  product_discount_percentage?: string
  product_picture?: {
    [key: string]: string | File
  }
  category_id?: string
  sub_category_id?: string
  vat?: string
  status?: string
  expiry_date?: string
}

// Delete product request type
export interface DeleteProductRequest {
  productId: number
}

// Merchant registration type
export interface MerchantRegistration {
  names: string
  gender: string
  email: string
  address: string
  password: string
  phonenumber: string
  merchant_business_name: string
  providus_account_no?: string
  merchantId?: string | number
  status?: number
}

// Merchant details request type
export interface MerchantDetailsRequest {
  zippy_wallet_number: string
}

// Merchant login request type
export interface MerchantLoginRequest {
  email: string
  pin: string
}

export interface OrderProduct {
  product_name: string
  product_quantity: number
  amount: number
}

export interface Order {
  orderId: string
  customerName: string
  orderDate: string
  amount: string
  status: string
  products: OrderProduct[]
  subTotal: number
}

export interface OrderItem {
  order_item_id: number
  order_id: string
  product_id: string
  product_name: string
  customer_id: string
  merchant_id: string
  price: string
  ordered_at: string | null
}

export interface OrderDetails {
  order_id: number
  customer_id: number
  total_amount: string
  vat: string
  delivery_fee: string
  order_status: string
  created_at: string
  updated_at: string | null
  order_items: OrderItem[]
}

export interface UpdateOrderStatusRequest {
  status: string
}

export interface MerchantOrder {
  order_item_id: number
  order_id: string
  product_id: string
  customer_id: string
  merchant_id: string
  price: string
  quantity: string | null
  ordered_at: string | null
}

export interface OrderHistoryItem {
  status: string
  updated_at: string
}

export interface DeliveryStatus {
  status: string
}

export interface Category {
  category_id: number
  category_name: string
  description: string
  created_at: string
}

export interface Subcategory {
  subcategory_id: number
  subcategory_name: string
  description: string
  category_id: number
}

export interface AddCategoryRequest {
  categoryName: string
  description: string
}

export interface AddSubcategoryRequest {
  subcategoryName: string
  description: string
  categoryId: number
}

export interface UpdateCategoryRequest {
  categoryName: string
  description: string
}

export interface UpdateSubcategoryRequest {
  subcategoryName: string
  description: string
}

// Request body for registration
export interface RegisterBody {
  names: string
  gender: string
  email: string
  address: string
  password: string
  phonenumber: string
  merchant_business_name: string
}

// Request body for login
export interface LoginBody {
  email: string
  pin: string
}

// Response structure from login
export interface Merchant {
  merchant_id: number
  // merchantId?: string | number
  names: string
  merchant_business_name: string
  gender: string
  email: string
  address: string
  bvn: string | null
  phonenumber: string
  providus_account_no: string | null
  user_type_id: string
  registered_at?: string
  active_status: string
  isAuthenticated?: boolean
}

// Merchant registration type
export interface MerchantRegistration {
  names: string
  gender: string
  email: string
  address: string
  password: string
  phonenumber: string
  merchant_business_name: string
  providus_account_no?: string
  merchantId?: string | number
  status?: number
}

export interface MerchantComplaintRequest {
  email: string
  merchant_name: string
  merchantId: string | number
  subject: string
  message: string
}

export interface MerchantUpdateRequest {
  email: string
  pin?: string // Optional
  merchant_business_name?: string
  address?: string
  // Add other optional fields you might have
}
