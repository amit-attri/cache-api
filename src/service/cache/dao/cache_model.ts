import * as mongoose from 'mongoose';

const CacheSchema = new mongoose.Schema(
  {
    key: {type: String, required: true},
    value: {type: String, required: true},
    expireAt: {type: Date, required: true},
    lastReadAt: {type: Date, default: Date.now}
  },
  { timestamps: true }
);


CacheSchema.index({key: 1});
CacheSchema.index({lastReadAt: 1});
// create index at `expireAt` field. And set `expireAfterSeconds` to 0 so that record expires after current time exceeds expireAt time
CacheSchema.index({expireAt: 1},{expireAfterSeconds: 0});


export default mongoose.model('cache', CacheSchema);