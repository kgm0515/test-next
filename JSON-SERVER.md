# json-server

官网: `https://jsonplaceholder.typicode.com/`

github: `https://github.com/typicode/json-server`

## 创建并启动数据源

安装插件：`npm install -g json-server`

### 在项目中创建数据源

在项目中创建`db.json`作为数据源

```json
{
  "users": [{ "id": "01", "username": "kgm" }],
  "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
  "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
  "profile": { "name": "typicode" }
}
```

启动服务

```sh
# 启动接口服务
json-server --watch db.json
# 监听端口号
json-server --watch db.json --port 3004
# 启动一个本地静态服务,如把`public`作为静态目录：
json-server --watch db.json --static ./public
```

### 创建 github 数据源

登录 github 创建数据源, 创建一个仓库(`https://github.com/kgm0515/json-server-next-data`)，在仓库中创建一个`db.json`文件作为数据源

```json
{
  "users": [{ "id": "01", "username": "kgm" }],
  "posts": [{ "id": 1, "title": "json-server", "author": "typicode" }],
  "comments": [{ "id": 1, "body": "some comment", "postId": 1 }],
  "profile": { "name": "typicode" }
}
```

- 访问仓库网站：`https://my-json-server.typicode.com/kgm0515/json-server-next-data/`

- 访问用户数据：`https://my-json-server.typicode.com/kgm0515/json-server-next-data/users`

### 请求接口

- 请求数据

```js
fetch('https://jsonplaceholder.typicode.com/posts/users')
  .then((response) => response.json())
  .then((json) => console.log(json))

axios.get('http://localhost:3333/users').then((json) => console.log(json))

axios
  .post('http://localhost:3333/users', {
    id: '02',
    username: 'yat1'
  })
  .then((json) => console.log(json))

axios
  .patch('http://localhost:3333/users/02', {
    username: 'yat1'
  })
  .then((json) => console.log(json))

// GET	/posts
// GET	/posts/1
// GET	/posts/1/comments
// GET	/comments?postId=1
// POST	/posts
// PUT	/posts/1
// PATCH	/posts/1
// DELETE	/posts/1
```

- 创建一条数据

```js
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  body: JSON.stringify({
    title: 'foo',
    body: 'bar',
    userId: 1
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json))
```

- 替换一条数据

```js
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json))
```

- 修补一条数据(添加字段)

```js
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'PATCH',
  body: JSON.stringify({
    title: 'foo'
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
})
  .then((response) => response.json())
  .then((json) => console.log(json))
```

- 删除资源

```js
// Important: resource will not be really updated on the server but it will be faked as if.
fetch('https://jsonplaceholder.typicode.com/posts/1', {
  method: 'DELETE'
})
```

- 过滤数据

```js
// This will return all the posts that belong to the first user
fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
  .then((response) => response.json())
  .then((json) => console.log(json))
```

- 获取嵌套资源

```js
// This is equivalent to /comments?postId=1
fetch('https://jsonplaceholder.typicode.com/posts/1/comments')
  .then((response) => response.json())
  .then((json) => console.log(json))
```

## 增删改查(crud)

基于前 db.json 文件，这里是所有的默认路由。你也可以使用——routes 添加其他路由。

### 关于路由

```
<!-- Plural routes -->
GET    /posts
GET    /posts/1
POST   /posts
PUT    /posts/1
PATCH  /posts/1
DELETE /posts/1
<!-- Singular routes -->
GET    /profile
POST   /profile
PUT    /profile
PATCH  /profile
```

### 过滤数据

使用 . 访问内部熟悉(Use . to access deep properties)

```
GET /posts?title=json-server&author=typicode
GET /posts?id=1&id=2
GET /comments?author.name=typicode
```

### 分页

使用\_page 和可选的\_limit 对返回的数据进行分页(默认返回 10 条数据)。

(Use \_page and optionally \_limit to paginate returned data.)

```
GET /posts?_page=7
GET /posts?_page=7&_limit=20
```

### 排序

添加 \_sort 和 \_order (默认的排序是升序)

(Add \_sort and \_order (ascending order by default))

```
GET /posts?_sort=views&_order=asc
GET /posts/1/comments?_sort=votes&_order=asc
```

如果是多个字段，使用下面的格式

```
GET /posts?_sort=user,views&_order=desc,asc
```

### 获取列表数据(Slice)

Add \_start and \_end or \_limit (an X-Total-Count header is included in the response)

```
GET /posts?_start=20&_end=30
GET /posts/1/comments?_start=20&_end=30
GET /posts/1/comments?_start=20&_limit=10
```

Works exactly as Array.slice (i.e. \_start is inclusive and \_end exclusive)

### 数据操作(Operators)

- 查询数据范围(Add \_gte or \_lte for getting a range)

`GET /posts?views_gte=10&views_lte=20`

- Add \_ne to exclude a value

`GET /posts?id_ne=1`

- Add \_like to filter (RegExp supported)

`GET /posts?title_like=server`

### 文本搜索(Full-text search)

```
GET /posts?q=internet
```

### Relationships

- To include children resources, add \_embed

```
GET /posts?_embed=comments
GET /posts/1?_embed=comments
```

- To include parent resource, add \_expand

```
GET /comments?_expand=post
GET /comments/1?_expand=post
```

- To get or create nested resources (by default one level, add custom routes for more)

```
GET  /posts/1/comments
POST /posts/1/comments
```

### Database

```
GET /db
```

### Homepage

Returns default index file or serves ./public directory

`GET /`

## 其他功能

### 添加自定义路由

创建一个`route.json` 文件,注意每个路由都以/开头。

```json
{
  "/api/*": "/$1",
  "/:resource/:id/show": "/:resource/:id",
  "/posts/:category": "/posts?category=:category",
  "/articles\\?id=:id": "/posts/:id"
}
```

执行 json-server 命令

```sh
json-server db.json --routes routes.json
```

现在您可以使用其他路由访问资源。

```sh
/api/posts # → /posts
/api/posts/1  # → /posts/1
/posts/1/show # → /posts/1
/posts/javascript # → /posts?category=javascript
/articles?id=1 # → /posts/1
```

### 添加中间件

创建中间件文件`hello.js`

```js
module.exports = (req, res, next) => {
  res.header('X-Hello', 'World')
  next()
}
```

运行 json-server

```sh
json-server db.json --middlewares ./hello.js
json-server db.json --middlewares ./first.js ./second.js
```

### CLI 配置

```
json-server [options] <source>

Options:
  --config, -c       Path to config file           [default: "json-server.json"]
  --port, -p         Set port                                    [default: 3000]
  --host, -H         Set host                             [default: "localhost"]
  --watch, -w        Watch file(s)                                     [boolean]
  --routes, -r       Path to routes file
  --middlewares, -m  Paths to middleware files                           [array]
  --static, -s       Set static files directory
  --read-only, --ro  Allow only GET requests                           [boolean]
  --no-cors, --nc    Disable Cross-Origin Resource Sharing             [boolean]
  --no-gzip, --ng    Disable GZIP Content-Encoding                     [boolean]
  --snapshots, -S    Set snapshots directory                      [default: "."]
  --delay, -d        Add delay to responses (ms)
  --id, -i           Set database id property (e.g. _id)         [default: "id"]
  --foreignKeySuffix, --fks  Set foreign key suffix, (e.g. _id as in post_id)
                                                                 [default: "Id"]
  --quiet, -q        Suppress log messages from output                 [boolean]
  --help, -h         Show help                                         [boolean]
  --version, -v      Show version number                               [boolean]

Examples:
  json-server db.json
  json-server file.js
  json-server http://example.com/db.json

https://github.com/typicode/json-server
```

添加配置文件`json-server.json`

```json
{
  "port": 3000
}
```

### 模块化

如果需要添加身份验证、验证或任何行为，可以将项目作为模块与其他 Express 中间件结合使用。

```js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query)
})

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
  if (req.method === 'POST') {
    req.body.createdAt = Date.now()
  }
  // Continue to JSON Server router
  next()
})

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
```

添加自定义选项(例如:foreginKeySuffix)将一个对象作为第二个参数传递给 jsonServer。

`router('db.json', { foreginKeySuffix: '\_id' })`

```sh
$ node server.js
```
