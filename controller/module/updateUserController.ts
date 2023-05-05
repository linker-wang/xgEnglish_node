import { User } from '../../util/module/mongodb/model'

export async function updateUser(ctx: any) {
    const currentBook = ctx.request.body.currentBook
    const userName = ctx.request.body.username
    const finalDate = new Date().getTime()
    currentBook.finalDate = finalDate
    const res = await User.findOne({ username: userName }, { "bookinfo":  1})
    const usedBook = res?.bookinfo.usedBook
    usedBook.push(currentBook)
    const data = await User.updateOne({ username: userName }, { "bookinfo.currentBook": currentBook, "bookinfo.usedBook": usedBook }, { runValidators: true })
    if (data.modifiedCount !== 0) {
        ctx.body = {
            message: "ok"
        }
    } else {
        ctx.body = {
            message: "error"
        }
    }
    
}