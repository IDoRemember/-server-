const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    publishTime:Number,
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    uid: String,
    unote: { type: String, index: true },
    like: Number,//喜欢
    store:Number,//收藏
    status: String,//匿名还是公开
    deleteTime: Number,
})