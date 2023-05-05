import { DB } from '../../util/index'
import { WordBook } from '../../util/module/mongodb/model'

export async function getWordBookList(ctx: any) {
    const res = await WordBook.find( {}, { bookName: 1, wordCount: 1})
    // const res2 = await WordBook.find( {}, { wordArr: { $slice: [4670, 1]}})
    // console.log(res2[0].wordArr[0])
    ctx.body = {
        wordBookList: res
    }
}