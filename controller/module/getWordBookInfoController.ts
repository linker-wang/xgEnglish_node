import { DB } from '../../util/index'
import User from '../../util/module/mongodb/schema/user'

export async function getWordBookInfo(ctx: any) {
    const userName = ctx.request.body.username
    // 数据库中查找bookInfo
    const res = await DB.findOne(User, {
        username: userName
    })

    const bookInfo = res[0].bookinfo
    const finalDate = bookInfo?.currentBook?.finalDate
    if (finalDate) {
        const nowDate = new Date().getTime()
        const milliseconds = nowDate - finalDate
        if ( milliseconds >= 24*60*60*1000 ) {
            bookInfo.currentBook.finalDate = nowDate
            const reviewCount = bookInfo.currentBook.haveLearnCount
            await User.updateOne({ username: userName}, { "bookinfo.currentBook.finalDate": nowDate, "bookinfo.currentBook.haveLearnCount": 0, "bookinfo.currentBook.needReview": reviewCount})
        }
    }
    ctx.response.status = 200
    ctx.body = {
        status: 200,
        bookInfo: bookInfo
    }
}