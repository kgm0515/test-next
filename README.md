# next

### 参考网站

### 图片/图标

[免费版权图库 2](https://unsplash.dogedoge.com/)
[react-icons 图标网站](https://react-icons.github.io/react-icons)
[heroicons 图标网站](https://heroicons.com/)

### tailwind

[tailwind css 网站](https://www.tailwindcss.cn/docs/responsive-design)
[tailwind css 网站](https://www.tailwindcss.cn/)
[tailwind 在线调试](https://play.tailwindcss.com/)
[tailwind 组件库-1](https://daisyui.com/docs/install/)
[tailwind 组件库-2(更完善)](https://tailwind-elements.com)
[tailwind 课程代码](https://github.com/bradtraversy/tailwind-course-projects)
[tailwind 网上模板代码](https://github.com/cruip/tailwind-landing-page-template)

## vscode 插件

- 修改标签，自动联动： `Auto Rename Tag`
- tailwind 智能提示: `tailwind CSS IntelliScene`
- Live Server: 允许创建本地开发服务器，允许 html 代码，并热更新: `Live Server`
- PostCSS Language Support:

## 路由跳转

Link 跳转路由

```js
<Link href={`/clients/${item.id}`}>
  <a>{item.name}</a>
</Link>
<Link href={{ pathname: `/clients/[id]`, query: { id: item.id } }}>
  <a>{item.name}</a>
</Link>
```

编程式跳转路由

```js
import { useRouter } from 'next/router'
function Page() {
  const router = useRouter()
  function loadProjectHandler() {
    // 方式1
    router.push('/clients/max/projecta')
    // 方式2
    router.replace('/clients/max/projecta')
    // 方式3
    router.push({
      pathname: `/clients/[id]/[projectid]`,
      query: { id: 'max', projectid: 'projecta' }
    })
  }
  return <button onClick={loadProjectHandler}>Load Project A</button>
}
export default Page
```

接收路由参数

```js
import { useRouter } from 'next/router'
function Page() {
  const router = useRouter()
  console.log(router.query)
  return <div>Hello world!</div>
}
export default Page
```

## 预渲染&服务端渲染

### 预渲染

普通页面的预渲染

```js
// pages/index.js
import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export default function HomePage(props) {
  const { products = [] } = props
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>
            <a>{product.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

// 这个函数只在服务端允许
export async function getStaticProps(context) {
  const content = fs.readFileSync(path.join(process.cwd(), '/data/dummy-backend.json'), 'utf8')
  const data = JSON.parse(content)
  if (!data) return { redirect: { destination: '/no-data' } } // 页面重定向
  const products = data.products
  if (!products.length) return { notFound: true } // true:会显示404页面
  return {
    props: { products },
    revalidate: 10 // 服务端每过多少秒重新更新页面数据
  }
}
```

使用 swr，适用于已经预渲染的页面，但是需要在客户端重新请求数据并更新页面的情况

```js
// last-sales.js
import { useEffect, useState } from 'react'
import useSWR from 'swr'
const fetcher = (...args) => fetch(...args).then((res) => res.json())

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales)
  const { data, error } = useSWR('https://jsonplaceholder.typicode.com/users', fetcher)

  useEffect(() => {
    setSales(data)
  }, [data])

  if (error) return <div>Failed to load!</div>
  if (!data && !sales) return <div>loading...</div>

  return (
    <ul>
      {Array.isArray(sales)
        ? sales.map((item) => (
            <li key={item.id}>
              {item.username}-{item.email}
            </li>
          ))
        : null}
    </ul>
  )
}

// 请求预渲染数据
export async function getStaticProps(context) {
  let data = await fetch('http://localhost:3333/events').then((response) => response.json())
  return {
    props: { sales: data },
    revalidate: 10 // 每过10s重新验证数据
  }
}
```

getStaticPaths, 适用于预渲染部分静态页面，其他页面在服务端请求数据后返回完整页面的情况

```js
// [pid].js
import { Fragment } from 'react'
import fs from 'fs'
import path from 'path'
export default function ProductDetailPage(props) {
  const { product } = props
  if (product === undefined) return <p>loading..</p>
  if (product === null) return <p>empty..</p>
  return (
    <h1>
      {product.title}-{product.description}
    </h1>
  )
}

async function getData() {
  const content = fs.readFileSync(path.join(process.cwd(), '/data/dummy-backend.json'), 'utf8')
  const data = JSON.parse(content)
  return data
}

export async function getStaticProps(context) {
  const pid = context.params.pid
  const data = await getData()
  if (!data) return { redirect: { destination: '/no-data' } } // 页面重定向
  if (!data.products.length) return { notFound: true } // true:会显示404页面
  const product = data.products.find((p) => p.id === pid)
  if (!product) return { notFound: true } // true:会显示404页面
  return { props: { product } }
}

export async function getStaticPaths() {
  const data = await getData()
  const params = data.products.map((item) => item.id).map((id) => ({ params: { pid: id } }))
  return {
    paths: params,
    /**
     * fallback：定义在getStaticPaths中没有找到匹配内容后的浏览器渲染策略
     * false：(不会执行getStaticProps，返回404)
     * true：(直接渲染页面，在页面渲染出来后再请求数据)
     * 'blocking：'(在数据请求完毕后才会渲染页面)
     **/
    fallback: true
  }
}
```

### 服务端渲染

适用于动态变化的内容(经常修改获知需要实时更新的内容)

```js
// user-profile.js
export default function UserProfile(props) {
  return <h1>{props.username}</h1>
}

export function getServerSideProps(context) {
  const { req, res, params } = context
  return {
    props: { username: 'Max' }
  }
}
```

## 添加元数据

### 在页面中添加

```js
// pages/index.js
import Head from 'next/head'
export default function HomePage() {
  return (
    <Fragment>
      <Head>
        <title>Next Events</title>
        <meta name="description" content="Find alot of greate events" />
      </Head>
      <p>this is content<p>
    </Fragment>
  )
}
```

### 添加公共元素据

```js
// pages/_app.js
import Head from 'next/head'
function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Next App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
```

### 定义页面结构

创建公共文件 pages/\_documents

```js
import { Html, Head, Main, NextScript } from 'next/document'
export default function MyDocument() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <div id="overlays"></div>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
```

### 图像优化

```js
import Image from 'next/image'
export default function App() {
  return <Image src={'/' + image} alt={title} width={200} height={200} objectFit="cover" />
}
```

### api 路由

### 创建 api 路由

```js
// api/feedback.js
import fs from 'fs'
import path from 'path'

// 数据文件地址
const getFeedbackPath = () => path.join(process.cwd(), '/data/feedback.json')

// 获取文件数据，解析为js对象
const parseFileData = (filepath) => {
  const feedbackdata = fs.readFileSync(filepath)
  return JSON.parse(feedbackdata)
}

function handler(req, res) {
  const feedbackPath = getFeedbackPath()
  if (req.method === 'POST') {
    const { email, feedbackText: text } = req.body
    const newFeedback = { email, text, id: new Date().toISOString() }
    const fullData = parseFileData(feedbackPath)
    fullData.push(newFeedback)
    fs.writeFileSync(feedbackPath, JSON.stringify(fullData), 'utf-8')
    res.status(201).json({ message: 'success', code: 0, data: newFeedback })
  } else if (req.method === 'GET') {
    const fullData = parseFileData(feedbackPath)
    res.status(200).json({ message: 'success', code: 0, data: fullData })
  }
}

export default handler
```

### api 动态路由

```js
// api/[feedbackId].js
import { parseFileData, getFeedbackPath } from './feedback'

export default function handler(req, res) {
  const feedbackId = req.query.feedbackId
  const feedbackPath = getFeedbackPath()
  const fullData = parseFileData(feedbackPath)
  const targetId = fullData.find((item) => item.id === feedbackId)
  res.status(200).json({ message: 'success', code: 0, data: targetId })
}
```

### 发出 Post 请求

```js
const data = { email: 'wewew@qq.com', feedbackText: 'this is text' }
fetch('/api/feedback', {
  method: 'POST',
  body: JSON.stringify(data),
  headers: { 'Content-Type': 'application/json' }
})
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
  })
```

### 发出 GET 请求

```js
fetch('/api/feedback')
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
  })
```

## 云数据库 MongoDB Atlas(最终连接失败)

访问`https://www.mongodb.com/atlas`, 注册：49...@qq.com, e9...

云数据库管理界面：`https://cloud.mongodb.com/v2/62dd31b71282c5115250de55#clusters`

- 创建了一个云数据库：kua...ao, e9...
- 点击 connect -> 选择连接方式

```js
const { MongoClient, ServerApiVersion } = require('mongodb')
const uri = 'mongodb+srv://kuangguangmiao:<password>@cluster0.r4xi3.mongodb.net/?retryWrites=true&w=majority'
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 })
client.connect((err) => {
  const collection = client.db('test').collection('devices')
  // perform actions on the collection object
  client.close()
})
```

- 左侧菜单 Database Access, 修改并创建安全密码
- 左侧菜单 Nwtwork Access, 修改并创建可以登录的 ip 地址

- 安装插件:`npm i mongodb`

- 参考文档`https://www.npmjs.com/package/mongodb`

### 连接自己的阿里云 mongodb 数据库

封装方法

```js
// helpers/db-utils
import { MongoClient } from 'mongodb'
/** 链接数据库 */
export async function connectDatabase() {
  const client = new MongoClient(`mongodb://test_next:kgm0515@120.76.74.224:27017/test_next`)
  await client.connect()
  return client
}
/** 往数据库插入文档 */
export async function insertDocument(client, collection, document) {
  const db = client.db()
  return await db.collection(collection).insertOne(document)
}
/** 查询所有数据 */
export async function getAllDocuments(client, collection, sort) {
  const db = client.db()
  sort = sort || { _id: -1 }
  return await db.collection(collection).find({}).sort(sort).toArray()
}
```

使用案例

```js
import { connectDatabase, insertDocument } from '../../helpers/db-utils'

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // 注册
    const { email } = req.body
    if (!email || !email.includes('@')) {
      return res.status(422).json({ code: -1, message: 'Invalid email address.' })
    }
    // 开始操作数据库
    let client
    try {
      client = await connectDatabase()
    } catch (error) {
      return res.status(500).json({ code: -1, message: 'Connect to the database failed' })
    }
    try {
      await insertDocument(client, 'newsletter', { email: email })
      res.status(201).json({ code: 0, message: 'Sign up!' })
    } catch (error) {
      res.status(500).json({ code: -1, message: 'Insert to the mongodb failed' })
    }
    client.close()
  }
}
```

## 全局 store

### 定义 store

./store/index.js

```js
import { createContext, useContext } from 'react'
import useNotify from './notifiy'
export const StoreContext = createContext()
export function StoreProvider(props) {
  const notify = useNotify()
  const storeValue = { notify }
  return <StoreContext.Provider value={storeValue}>{props.children}</StoreContext.Provider>
}
const useStore = (attrName) => {
  const store = useContext(StoreContext)
  return attrName ? store[attrName] : store
}
export default useStore
```

./store/notify.js

```js
import { useState } from 'react'
export default function useNotify() {
  const [notify, setNotify] = useState()
  const showNotify = ({ title = '', message = '', status = '', duration = 3000 }) => {
    setNotify({ title, message, status, duration })
  }
  // 隐藏通知
  const hideNotify = () => {
    setNotify(null)
  }
  return {
    notify,
    showNotify,
    hideNotify
  }
}
```

### 使用全局 store

./pages/index.js

```js
import { StoreProvider } from '../store'
export default function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <div></div>
    </StoreProvider>
  )
}
```

./pages/notify.js

```js
import { Fragment, useEffect } from 'react'
import useStore from '../../../store'

export default function Notifylayer() {
  const { notify, hideNotify } = useStore('notify')
  return <Fragment>{notify && <div onClick={hideNotify}>{notify.title}</div>}</Fragment>
}
```

## 解析 markdown 语法

### 安装插件

- `cnpm i react-markdown -S` 渲染 markdown 的 content
- `cnpm i gray-matter -S` 解析 markdown，获取元数据
- `cnpm i rehype-raw -S` 允许在 markdown 中编写原生的 html 语法

[react-markdown 插件文档地址](https://www.npmjs.com/package/react-markdown#appendix-b-components)

存在一个`posts/***.md`文件

```md
---
title: 'Getting Started with NextJS'
date: '2022-10-16'
image: getting-started-nextjs.png
excerpt: NextJS is a the React framework for production - it makes building fullstack React apps and sites a breeze and ships with built-in SSR.
isFeatured: true
---

## Why would we then need NextJS?

this is main image

![Create routes via your file + folder structure](nextjs-file-based-routing.png)
```

### 读取所有的.md 文件

编写配套文件`./lib/posts-util.js`

```js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
const postsDirectory = path.join(process.cwd(), 'posts')
// 读取文件内容
function getPostData(fileName) {
  const filePath = path.join(postsDirectory, fileName)
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(fileContent)
  const slug = fileName.replace(/\.md$/, '')
  return { slug, ...data, content }
}
// 获取所有的帖子
export function getAllPosts() {
  const postFiles = fs.readdirSync(postsDirectory)
  const allPosts = postFiles.map((fileName) => {
    return getPostData(fileName)
  })
  const sortedPosts = allPosts.sort((a, b) => a.date - b.date)
  return sortedPosts
}
```

在页面中使用

```js
import Hero from '../components/home-page/hero'
import FeaturedPosts from '../components/home-page/featured-posts'
import { getFeaturedPosts } from '../lib/posts-util'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'

export default function HomePage(props) {
  const { posts } = props
  // 可以自定义组件
  const customComponents = {
    // img: (imgRaw) => <Image src={`/images/posts/${post.slug}/${imgRaw.src}`} alt={imgRaw.alt} width={600} height={300} />,
    p: (pRaw) => {
      const { node } = pRaw
      if (node.children[0].tagName === 'img') {
        const imgRaw = pRaw.children[0] // 获取内部图片，修改内容
        return (
          <div className="image">
            <Image src={`/images/posts/${post.slug}/${imgRaw.props.src}`} alt={imgRaw.props.alt} width={600} height={300} />
          </div>
        )
      }
      return <p>{pRaw.children}</p>
    }
  }
  return (
    <div>
      {Array.isArray(posts) &&
        posts.map((item) => (
          <div>
            <div>{item.title}</div>
            <div>{item.date}</div>
            <div>{item.image}</div>
            <div>{item.excerpt}</div>
            <ReactMarkdown components={customComponents} rehypePlugins={[rehypeRaw]}>
              {DUMMY_POST.content}
            </ReactMarkdown>
          </div>
        ))}
    </div>
  )
}
export async function getStaticProps() {
  const featuredPosts = getAllPosts()
  return {
    props: { posts: featuredPosts }
  }
}
```

## 关于 markdoen 语法

非常推荐使用 MDX 替换现有的.md 文件，因为.mdx 文件可以写 html 语法，引入并使用自定义组件，非常 nice

## 配置环境变量

next.config.js

```js
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants')

module.exports = (phase) => {
  /**
   npm run dev: phase-development-server
   npm run build: phase-production-build
   npm run start: phase-production-server
  */
  let config = {
    reactStrictMode: true,
    swcMinify: false // 不适用swc打包()
  }
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    // 开发环境
    Object.assign(config, {
      env: {
        mongodb_username: 'test_next',
        mongodb_password: 'kgm0515',
        mongodb_ip: '120.76.74.224',
        mongodb_port: '27017',
        mongodb_database: 'test_next'
      }
    })
  } else {
    Object.assign(config, {
      env: { ...
      }
    })
  }
  return config
}
```

使用

```js
const connectionString = new MongoClient(
  `mongodb://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_ip}:${process.env.mongodb_port}/${process.env.mongodb_database}`
)
```

## vercel 部署

[官网](https://vercel.com/)
