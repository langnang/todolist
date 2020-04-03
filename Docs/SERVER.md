# SERVER

- [DataSource](#datasource)
  - [Useruser.active 用户信息表](#useruseractive-用户信息表)
  - [Authuser.active 验证信息表](#authuseractive-验证信息表)
  - [ToDouser.active 待办事项信息表](#todouseractive-待办事项信息表)
  - [Loguser.active 操作记录表](#loguseractive-操作记录表)
- [API](#api)
  - [`[POST]/api/user/register`user.active 注册](#postapiuserregisteruseractive-注册)
  - [`[POST]/api/user/signin`user.active 登录](#postapiusersigninuseractive-登录)
  - [`[GET]/api/user/signout` 登出](#getapiusersignout-登出)
  - [`[GET]/api/user/active` 检测服务端用户缓存](#getapiuseractive-检测服务端用户缓存)
  - [`[GET]/api/todo/list` 代办事项列表](#getapitodolist-代办事项列表)
  - [`[POST]/api/todo/insert` - 新增待办事项](#postapitodoinsert---新增待办事项)
  - [`[POST]/api/todo/delete`](#postapitododelete)
  - [`[POST]/api/todo/update`](#postapitodoupdate)
  - [`[POST]/api/todo/select`](#postapitodoselect)

## DataSource

### Useruser.active 用户信息表

| name     | type     | size | PK  | not null | default |
| -------- | -------- | ---- | --- | -------- | ------- |
| id       | int      |      | Y   | Y        |         |
| uuid     | string   |      |     |          |         |
| name     | string   |      |     |          |         |
| pasword  | string   |      |     |          |         |
| datetime | datetime |      |     | Y        |         |
|          |          |      |     |          |         |

### Authuser.active 验证信息表

| name     | type | size | PK  | not null | default |
| -------- | ---- | ---- | --- | -------- | ------- |
| id       | int  |      | Y   | Y        |         |
| uuid     |      |      |     |          |         |
| token    |      |      |     |          |         |
| datetime |      |      |     |          |         |
|          |      |      |     |          |         |

### ToDouser.active 待办事项信息表

| name     | type | size | PK  | not null | default |
| -------- | ---- | ---- | --- | -------- | ------- |
| id       | int  |      |     | Y        |         |
| uuid     |      |      |     |          |         |
| name     |      |      |     |          |         |
| content  |      |      |     |          |         |
| datetime |      |      |     |          |         |
|          |      |      |     |          |         |

### Loguser.active 操作记录表

| name        | type | size | PK  | not null | default                               |
| ----------- | ---- | ---- | --- | -------- | ------------------------------------- |
| id          | int  |      |     |          |                                       |
| uuid        |      |      |     |          |                                       |
| type        |      |      |     |          | ['Insert','Delete','Update','Select'] |
| table       |      |      |     |          | ['User','Auth','ToDo']                |
| old_content |      |      |     |          |                                       |
| new_content |      |      |     |          |                                       |
| datetime    |      |      |     |          |                                       |
|             |      |      |     |          |                                       |

## API

```json
// RequestModel
{
  "data": {}
}
```

```json
// ResponseModel
{
  "status": 0,
  "statusText": "",
  "data": {}
}
```

```json
// User->Token
{
  "id": 0,
  "token": ""
}
```

### `[POST]/api/user/register`user.active 注册

```json
// Request
{
  "data": {
    "name": "",
    "password": ""
  }
}
```

```json
// Response
{
  "data": {
    "uuid": "",
    "name": ""
  }
}
```

### `[POST]/api/user/signin`user.active 登录

```json
// Request
{
  "data": {
    "name": "",
    "password": ""
  }
}
```

```json
// Response
{
  "data": {
    "uuid": "",
    "name": "",
    "token": {}
  }
}
```

### `[GET]/api/user/signout` 登出

```json
{
  "data": {}
}
```

### `[GET]/api/user/active` 检测服务端用户缓存

```json
// Response
{
  "data": {
    "uuid": "",
    "name": "",
    "token": {}
  }
}
```

### `[GET]/api/todo/list` 代办事项列表

```json
// Response
```

### `[POST]/api/todo/insert` - 新增待办事项

```json
// Request
{
  "data": {
    "name": "",
    "content": "",
    "token": {}
  }
}
```

```flow
st=>start: 开始
e=>end: 结束

st(right)->e
```

```json
// Response
{
  "data": {
    "id": "",
    "name": "",
    "content": "",
    "datetime": ""
  }
}
```

### `[POST]/api/todo/delete`

### `[POST]/api/todo/update`

### `[POST]/api/todo/select`
