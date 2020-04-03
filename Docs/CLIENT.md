# CLIENT

- [Vue](#vue)
- [Vuex](#vuex)
  - [modules](#modules)
  - [mutations](#mutations)
  - [getters](#getters)
  - [actions](#actions)
    - [active 检测服务端用户缓存 `[GET]/api/user/active`](#active-检测服务端用户缓存-getapiuseractive)
    - [signIn 用户登录 `[POST]/api/user/signin`](#signin-用户登录-postapiusersignin)
    - [signOut 用户登出 `[GET]/api/user/signout`](#signout-用户登出-getapiusersignout)
    - [loadToDoList 页面加载时加载本地/服务的 ToDoList](#loadtodolist-页面加载时加载本地服务的-todolist)
    - [saveToDo 保存 ToDo](#savetodo-保存-todo)
    - [deleteToDo 删除 ToDo](#deletetodo-删除-todo)
    - [selectToDo 查询 ToDo](#selecttodo-查询-todo)
- [Element-ui](#element-ui)
- [axios](#axios)
- [font-awesome](#font-awesome)
- [markdown](#markdown)

## Vue

- App
  - components
    - HeaderRow
    - CardBody
    - ToDoDialog
  - [x] created
    - [x] `dispatch("active")`

## Vuex

### modules

- user
  - state
  - mutations
  - getters
- todo
  - state
  - mutations
    - [ ] deleteToDo 删除 ToDo 数组中的元素
    - [ ] updateToDo 更新 ToDo 数组中的元素
      - 根据 index 取 list 中的 todo 信息，赋值给 state，打开 Dialog
  - getters

### mutations

### getters

### actions

#### active 检测服务端用户缓存 `[GET]/api/user/active`

- [x] 200 `commit("setUser");`
- [x] 400
- [x] `dispatch("loadToDoList")`

#### signIn 用户登录 `[POST]/api/user/signin`

- [x] 200
  - [x] `commit("setUser");`
  - [x] `commit("toggleSignIn");`
  - [x] `dispatch("loadToDoList")`
- [x] 400

#### signOut 用户登出 `[GET]/api/user/signout`

- [x] 200
  - [x] `commit("initUser");`
  - [x] `dispatch("loadToDoList")`
- [x] 400

#### loadToDoList 页面加载时加载本地/服务的 ToDoList

```flow
st=>start: 开始
e=>end: 结束

op1=>operation: 获取本地缓存
op2=>operation: commit("setToDoList")
op3=>operation: 同步缓存服务器
op4=>operation: 移除本地缓存
op5=>operation: [GET]/api/todo/list 代办事项列表

cond1=>condition: 用户是否登录
cond2=>condition: 是否有缓存数据

st->op1->cond1
cond1(yes)->cond2
cond1(no)->op2
cond2(yes)->op3->op4->op5
cond2(no)->op5
op5(right)->op2
```

#### saveToDo 保存 ToDo

```flow
st=>start: 开始
e=>end: 结束
op11=>operation: 开启加载中状态
op21=>operation: 更新本地缓存
op22=>operation: 更新服务端数据
op23=>operation: 新增本地缓存
op24=>operation: 新增服务端数据
op31=>operation: 删除对应次序事项
op32=>operation: [POST]/api/todo/update 更新代办事项
op33=>operation: [POST]/api/todo/insert 新增代办事项
op41=>operation: 数组头部插入更新后的事项
op42=>operation: 数组头部插入新增的事项
op51=>operation: 关闭状态

cond11=>condition: 有次序&&未登录
cond12=>condition: 有次序&&已登录
cond13=>condition: 无次序&&未登录
cond14=>condition: 无次序&&已登录

cond99=>condition: 删除次序对应事项
cond100=>condition: 更新缓存

st->op11->cond11
cond11(no)->cond12(no)->cond13(no)->cond14(no)
cond11(yes)->op21->op31->op41->op51->e
cond12(yes)->op22->op32->op31
cond13(yes)->op23->op42->op51
cond14(yes)->op24->op33->op42
```

#### deleteToDo 删除 ToDo

#### selectToDo 查询 ToDo

## Element-ui

## axios

## font-awesome

## markdown
