interface MongoBase {
  _id?: string
}

interface IBidding extends MongoBase {
  imageUrl: string
  title: string
  endTime: string
  lastPrice: string
  category: string
  owner: string
  creator: string
}

export type { IBidding }
