interface MongoBase {
  _id?: string
}

interface ILastSale {
  user: string
  price: number
  eventTime?: string
}

interface IAsset extends MongoBase {
  imageUrl: string
  title: string
  endTime: string
  category: string
  creator: string
  lastSale?: ILastSale
}

export type { IAsset, ILastSale }
