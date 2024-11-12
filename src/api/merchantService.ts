// merchantService.ts
import {
  Merchant,
  MerchantRegistration,
  MerchantDetailsRequest,
  MerchantLoginRequest,
  MerchantComplaintRequest,
  MerchantUpdateRequest,
} from '../shared.types'
import { apiBase } from './apiBase'

// const BASE_URL = 'http://194.163.149.51:3015/hialal'

export const merchantService = {
  // Register a merchant
  async registerMerchant(
    merchantData: MerchantRegistration
  ): Promise<Merchant> {
    const response = await apiBase.post(`register_merchant`, merchantData)
    return response.data.merchantDetails
  },

  // Fetch merchant details
  async fetchMerchantDetails(
    requestData: MerchantDetailsRequest
  ): Promise<Merchant> {
    const response = await apiBase.post(`merchant_details`, requestData)
    return response.data
  },

  // Merchant login
  async loginMerchant(loginData: MerchantLoginRequest): Promise<Merchant> {
    const response = await apiBase.post(`merchant_login`, loginData)
    return response.data.merchant
  },

  // Fetch all merchants
  async fetchAllMerchants(): Promise<Merchant[]> {
    const response = await apiBase.get(`all_merchants`)
    return response.data
  },

  async sendMerchantComplaint(data: MerchantComplaintRequest): Promise<void> {
    try {
      await apiBase.post(`/merchant_complain`, data)
    } catch (error) {
      console.error('Error sending merchant complaint:', error)
      throw new Error('Could not send complaint')
    }
  },

  // Update merchant details
  async updateMerchantDetails(data: MerchantUpdateRequest): Promise<Merchant> {
    try {
      const response = await apiBase.put(`/update_details`, data)
      return response.data
    } catch (error) {
      console.error('Error updating merchant details:', error)
      throw new Error('Could not update details')
    }
  },
}
