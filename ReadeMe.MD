1. 运行工程前要先准备数据库环境

2. 访问地址：
只有更新接口使用的是post，其它接口都是get。所以其它接口可以通过
直接输入URL地址访问

    增加 http://localhost:3000/users/addUser?author_name=张三&screen_name=王二麻子
    删除 http://localhost:3000/users/deleteUser?author_id=1
    查询全部 http://localhost:3000/admin/queryAll
    ID查询 http://localhost:3000/users/queryById?author_id=1
    修改 http://localhost:3000/users，会返回一个页面。通过表单模拟一个post请求