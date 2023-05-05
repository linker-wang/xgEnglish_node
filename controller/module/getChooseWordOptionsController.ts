import { WordBook } from '../../util/module/mongodb/model'

export async function getChooseWordOptions(ctx: any) {
    const wordBookName = ctx.query.wordBookName
    const wordIndex = Number(ctx.query.wordIndex)
    const opsIndex = JSON.parse(ctx.query.opsIndex)

    const arr: any = []
    for (let item of opsIndex) {
        const data = await WordBook.find( { bookName: wordBookName }, { wordArr: { $slice: [item, 1] } })
        arr.push({
            isRight: false,
            content: data[0].wordArr[0].word?.word
        })
    }

    const res = await WordBook.find( { bookName: wordBookName }, { wordArr: { $slice: [wordIndex, 1] } })
    arr.push({
        isRight: true,
        content: res[0].wordArr[0].word?.word
    })
    ctx.body = {
        wordInfo: res[0].wordArr[0],
        options: arr
    }
}