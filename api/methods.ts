import baseAPI from '.'
import { IBidding } from '../types/bidding'

export async function getList({ offset, limit = 16, category }: { offset: number; limit?: number; category?: string }) {
  return baseAPI<IBidding[]>({
    url: 'api/list',
    method: 'POST',
    data: { offset, limit, category },
  })
}

export async function createNFT(data: IBidding) {
  return baseAPI({
    url: 'api/create',
    method: 'POST',
    data,
  })
}

interface IMakeBidReq {
  _id: Pick<IBidding, '_id'>
  lastPrice: Pick<IBidding, 'lastPrice'>
  owner: Pick<IBidding, 'owner'>
}
export async function makeBid(data: IMakeBidReq) {
  return baseAPI({
    url: 'api/bid',
    method: 'POST',
    data,
  })
}
