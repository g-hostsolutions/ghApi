import {
  pre,
  prop,
  modelOptions,
  mongoose,
  Severity,
} from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    collection: 'vehicles',
    timestamps: { createdAt: true, updatedAt: true },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<Vehicle>('save', async function (next) {
  if (this._id === undefined || this._id === null) {
    this._id = mongoose.Types.ObjectId()
  }

  next()
})
export class Vehicle {
  @prop()
  _id?: mongoose.Types.ObjectId

  @prop({ nullable: false })
  plate?: string

  @prop({ nullable: false })
  color?: string

  @prop({ nullable: false })
  type?: string

  @prop({ nullable: false })
  price?: number

  constructor(vehicle?: Partial<Vehicle>) {
    this._id = vehicle?._id
    this.plate = vehicle?.plate
    this.color = vehicle?.color
    this.type = vehicle?.type
    this.price = vehicle?.price
  }
}
