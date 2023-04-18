import Application from "koa";
import Router from "koa-router";

export default function(ctx: Application.ParameterizedContext<any, Router.IRouterParamContext<any, {}>, any>) {
  return new Promise((resolve, reject) => {
    try {
      // 初始化化数据
      let res = ""

      // 追加数据
      ctx.req.on("data", (chunk: any) => {
        res += chunk
      })

      // 完成数据接收
      ctx.req.on("end", () => {
        resolve(res)
      })
    } catch (error) {
      reject(error)
    }
  })
}