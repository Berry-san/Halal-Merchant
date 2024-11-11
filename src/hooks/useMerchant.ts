// useMerchants.ts
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { merchantService } from '../api'
import {
  Merchant,
  MerchantRegistration,
  MerchantDetailsRequest,
  MerchantLoginRequest,
  MerchantComplaintRequest,
  MerchantUpdateRequest,
} from '../shared.types'

export function useAllMerchants() {
  return useQuery<Merchant[], Error>(
    'allMerchants',
    merchantService.fetchAllMerchants
  )
}

export function useRegisterMerchant() {
  const queryClient = useQueryClient()
  return useMutation(
    (merchantData: MerchantRegistration) =>
      merchantService.registerMerchant(merchantData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('allMerchants') // Refresh merchant list
      },
    }
  )
}

export function useMerchantDetails() {
  return useMutation((requestData: MerchantDetailsRequest) =>
    merchantService.fetchMerchantDetails(requestData)
  )
}

export function useMerchantLogin() {
  return useMutation((loginData: MerchantLoginRequest) =>
    merchantService.loginMerchant(loginData)
  )
}

export function useMerchantComplaint() {
  return useMutation((data: MerchantComplaintRequest) =>
    merchantService.sendMerchantComplaint(data)
  )
}

export const useUpdateMerchantDetails = () => {
  return useMutation<Merchant, Error, MerchantUpdateRequest>(
    (updateData) => merchantService.updateMerchantDetails(updateData),
    {
      onSuccess: (data) => {
        console.log('Merchant details updated successfully:', data)
      },
      onError: (error) => {
        console.error('Failed to update merchant details:', error)
      },
    }
  )
}
