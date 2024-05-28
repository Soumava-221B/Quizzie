const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questiontext: { type: String, required: true },
  options: [
    {
      optionText: String,
      optionImage: String,
      count: { type: Number, default: 0 },
    },
  ],
  attempt:{type:Number,default:0},
  correctoptionindex: { type: Number},
  correct: { type: Number, default: 0 },
});

const quizSchema = new mongoose.Schema(
  {
    quizname: { type: String, required: true },
    impression: { type: Number, default: 0 },
    quiztype: { type: String, enum: ["Q&A", "Poll"], required: true },
    optiontype: { type: String },
    createdby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    questions: [questionSchema],
    timer: Number,
  },
  { timestamps: true, required: true }
);

module.exports = mongoose.model("Quiz", quizSchema);
