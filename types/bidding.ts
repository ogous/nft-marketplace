interface MongoBase {
  _id: string
}

interface IBidding extends MongoBase {
  imageUrl: string
  title: string
  endTime: Date
  lastPrice: number
}

export type { IBidding }
