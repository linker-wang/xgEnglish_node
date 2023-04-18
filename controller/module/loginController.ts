import { getPostData } from '../../util/index'

export async function postLogin(ctx: any) {
  try {
    const res = await getPostData(ctx)
    console.log(res)
    ctx.body = "nihao1"
  } catch (error) {
    console.log(error)
  }
}