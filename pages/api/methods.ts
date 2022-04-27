import baseAPI from '.'
import { IBidding } from '../../types/bidding'

export async function getList() {
  return baseAPI({
    url: 'api/list',
    method: 'GET',
  })
}

export async function createNFT(data: IBidding) {
  return baseAPI({
    url: 'api/create',
    method: 'POST',
    data,
  })
}

export async function makeBid() {
  return baseAPI({
    url: 'api/bid',
    method: 'POST',
  })
}
