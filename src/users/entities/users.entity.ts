import {
  pre,
  prop,
  modelOptions,
  mongoose,
  Severity,
} from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: { createdAt: true, updatedAt: true },
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@pre<Users>('save', async function (next) {
  if (this._id === undefined || this._id === null) {
    this._id = mongoose.Types.ObjectId()
  }

  next()
})
export class Users {
  @prop()
  _id: mongoose.Types.ObjectId

  @prop({ nullable: false, unique: true })
  email: string

  @prop({ nullable: false })
  password: string

  constructor(user?: Partial<Users>) {
    this._id = user?._id
    this.email = user?.email
    this.password = user?.password
  }
}
