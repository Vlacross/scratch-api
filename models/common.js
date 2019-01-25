module.exports = {
  SCHEMA_OPTS: {
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret._id;
        delete ret.__v;
      }
    }
  }
}