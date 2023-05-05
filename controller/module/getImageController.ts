import fs from 'fs'

export async function getImage(ctx: any) {
  const imageName = ctx.params.name
  console.log(imageName)
  const res = fs.readFileSync(`/root/project/xgEnglish/asset/image/${imageName}`)
  ctx.body = res
}