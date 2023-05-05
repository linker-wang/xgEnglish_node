import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './schema/user'

dotenv.config()
const url = process.env.DB_URL

// 入口函数
const connectMongo = () => {
  return new Promise((resolve, reject) => {
    connect().then(
      res => {
        if (res) {
          console.log(res)
          resolve(res)
        } else {
          reject("无法连接数据库, url为空")
        }
      }
    ).catch(
      err => {
        console.log("数据库连接失败,请检查url:", err.message)
        reject(err)
      }
    )
  })
}
  
// 连接数据库
const connect = async () => {
  try {
    if (url) {
      await mongoose.connect(url, { authSource: 'admin' })
      return `成功连接数据库:${url}`
    }
  } catch (error) {
    throw error
  }
}

// 关闭数据库连接
const close = async () => {
  mongoose.disconnect()
}

// 插入数据
const insertOne = async (collection: any, row: object) => {
  try {
    const data = await collection.create(row)
    console.log(`成功插入 1 条数据`)
    return data.length
  } catch (error) {
    console.log("插入数据失败", error)
    return 0
  }
}

// 插入多组数据
const insertMany = async (collection: any, rows: object[]) => {
  try {
    const data = await collection.insertMany(rows)
    console.log(`成功插入 ${data.length} 条数据`)
    return data.length
  } catch (error) {
    console.log("插入数据失败", error)
    return 0
  }
}

// 查询数据
const findOne = async (conllection: any, conditions: object, need?: string) => {
  try {
    const data = await conllection.find(conditions, need)
    console.log(`查询到 ${data.length} 条数据`)
    return data
  } catch (error) {
    console.log("查询数据失败", error)
    return undefined
  }
}

// 更新数据
const updateOne = async (conllection: any, conditions: object, update: object, runValidators?: boolean) => {
  try {
    const opts = { runValidators: runValidators ?? true }
    const data = await conllection.updateOne(conditions, update, opts)
    console.log("更新数据成功")
    console.log(`匹配到 ${data.matchedCount} 条数据, 成功更新 ${data.modifiedCount} 条数据`)
    return data
  } catch (error) {
    console.log("更新数据失败", error)
    return undefined
  }
}

export default {
  connectMongo,
  close,
  insertOne,
  insertMany,
  findOne,
  updateOne
}
