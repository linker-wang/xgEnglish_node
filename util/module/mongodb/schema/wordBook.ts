import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  bookName: {
    type: String,
    unique: true,
    requierd: true
  },
  wordCount: {
    type: Number,
    required: true
  },
  wordArr: {
    type: [{
      wid: {
        type: Number,
        required: true
      },
      word: {
        word: String,
        accentUs: String,
        accentUk: String,
      },
      mnemonic: {
        content: String
      },
      cnMean: {
        type: [{
          meanType: String,
          mean: String
        }],
      },
      enMean: {
        type: [{
          meanType: String,
          mean: String
        }]
      },
      sentences: {
        type: [{
          sentenceEn: String,
          translate: String,
        }]
      },
      variant: {
        type: [{
          type: String,
          variant: String
        }]
      },
      derivations: {
        type: [{
          word: String,
          mean: String
        }]
      },
      synonyms: {
        type: [{
          word: String
        }]
      },
      antonyms: {
        type: [{
          word: String
        }]
      },
      similars: {
        type: [{
         word: String 
        }]
      },
      tvInfo: {
        tvPath: String,
        tvSnapshot: String
      },
      phrases: {
        type: [{
          phrase: String,
          mean: String
        }]
      },
      sentence: String,
      deformation_img: String,
      sentence_trans: String,
      sentence_audio: String,
      mean_en: String,
      accent: String,
      mean_cn: String,
      word_etyma: String,
      word_audio: String,
      image_file: String,
    }]
  }
})

export default mongoose.model("wordbook", BookSchema)