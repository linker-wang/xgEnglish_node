import { WordBook, User } from '../../util/module/mongodb/model'

export async function getWordInfo(ctx: any) {
    const wordBookName = ctx.query.wordBookName
    const wordIndex = Number(ctx.query.wordIndex)
    const res = await WordBook.find( { bookName: wordBookName }, { wordArr: { $slice: [wordIndex, 1] } })
    ctx.body = {
        wordInfo: res[0].wordArr[0]
    }
}

export async function patchWordInfo(ctx: any) {
    const username = ctx.request.body.username
    const wordBookName = ctx.request.body.wordBookName
    const wordIndex = ctx.request.body.wordIndex
    await User.updateOne({ username: username }, { $inc: {"bookinfo.currentBook.finishCount": 1, "bookinfo.currentBook.haveLearnCount": 1} })
    const res = await WordBook.find( { bookName: wordBookName }, { wordArr: { $slice: [wordIndex, 1] } })
    ctx.body = {
        wordInfo: res[0].wordArr[0]
    }
}