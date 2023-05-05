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
        console.log(res)
        if (res.length == 0) {
          resolve(res)
        } else {
          const obj: any = {}
          console.log(res.split("&"))
          res.split("&").forEach((item) => {
            const index = item.indexOf("=")
            const key = item.slice(0, index)
            const value = item.slice(index+1)
            obj[key] = value
          })
          resolve(obj)
        }
      })
    } catch (error) {
      reject(error)
    }
  })
}