var  client = require('../config/db');
var  uid = require('node-uuid');//用于生成id
function  User(user) {
    this.name = user.name;
    this.password = user.password;
}
mysql = client.getDbCon();
module.exports = User;
//新增用户
User.prototype.save = function  save(callback) {
    // 用户对象
    var  user = {
        name: this.name,
        password: this.password
    };
    uuid = uid.v4();
    //插入数据库
    var sql ="insert into user (id,name,password) values(?,?,?)";

    mysql.query(sql,[uuid,user.name,user.password],function(err,results,fields){
        if (err) {
            throw err;
        } else {
            //返回用户id
            return callback(err, uuid, fields);
        }
    });
};
//修改用户
User.prototype.update = function  update(callback) {
    // 用户对象
    var  user = {
        name: this.name,
        password: this.password
    };
    uuid = uid.v4();
    var password = user.password;
    username = user.name;
    //修改数据库
    var sql ="update user set password='"+ password +"'where name ='"+username +"'";
    console.log('sql==' +sql);
    mysql.query(sql,[uuid,user.name,user.password],function(err,results,fields){
        if (err) {
            throw err;
        } else {
            //返回用户id
            return callback(err, uuid, fields);
        }
    });
};
//根据用户名获取用户
User.get =  function  get(username, callback) {

    // 读取 users 集合
    //var sql = "select c.id,c.name,c.password from user c where c.name='"+username+"'";
    var sql = "select * from user where name='"+username+"'";
    console.log('sql==' + sql);
    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            console.log('results==' + results);
            console.log('results[0]==' + results[0]);
            callback(err,results[0],fields);
        }
    })

};
//获取所有用户
User.prototype.queryAll =  function  queryAll(callback) {
    // 用户对象
    var  user = {
        name: this.name,
        password: this.password
    };
    // 读取 users 集合
    var sql = "select * from user ";
    console.log('sql==' + sql);
    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            return callback(err,results,fields);
        }
    })

};