import fs from 'fs'

export async function getHeader(ctx: any) {
  const username = ctx.params.username
  console.log("h", username)
  const url = `/root/project/xgEnglish/asset/header/${username}`
  const isExist = fs.existsSync(url)
  let res: any
  console.log(isExist)
  if (isExist) {
    res = fs.readFileSync(url)
  } else {
    res = fs.readFileSync(`/root/project/xgEnglish/asset/image/default.png`)
  }
  ctx.body = res
}