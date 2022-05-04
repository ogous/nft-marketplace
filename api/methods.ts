import baseAPI from '.'
import { IAsset, ILastSale } from '../types/asset'

export async function list({ offset, limit = 16, category }: { offset: number; limit?: number; category?: string }) {
  return baseAPI<IAsset[]>({
    url: 'api/list',
    method: 'POST',
    data: { offset, limit, category },
  })
}

export async function create(data: FormData) {
  return baseAPI({
    url: 'api/create',
    method: 'POST',
    data,
    headers: {
      'content-type': 'multipart/form-data',
    },
  })
}

interface IMakeBidReq {
  id: IAsset['_id']
  price: ILastSale['price']
  user: ILastSale['user']
}

export async function makeBid(data: IMakeBidReq) {
  return baseAPI({
    url: 'api/makeBid',
    method: 'POST',
    data,
  })
}
