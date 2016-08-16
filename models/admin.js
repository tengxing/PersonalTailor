var  client = require('../config/db');
var moment = require('moment');
var  uid = require('node-uuid');//用于生成id
function  Admin(username, password,re_password,professional,origin,tel,email,time) {
    this.user = username;
    this.password = password;
    this.re_password = re_password;
    this.professional = professional;
    this.origin = origin;
    this.tel = tel;
    this.email = email;
    if (time) {
        this.time = moment(time).format('YYYY-MM-DD HH:mm:ss')
    } else {
        this.time =  moment(new Date ()).format('YYYY-MM-DD HH:mm:ss');
        console.log('-----------------************' + this.time);
    }
}
mysql = client.getDbCon();
module.exports = Admin;

Admin.prototype.save = function  save(callback) {
    var  admin = {
        user: this.user,
        password: this.password,
        re_password: this.re_password,
        professional: this.professional,
        origin: this.origin,
        tel: this.tel,
        email: this.email,
        time: this.time
    };
    uuid = uid.v4();
    var sql = "insert into admin (id,user,password,re_password,professional,origin,tel,email,time) values(?,?,?,?,?,?,?,?,?)";
    mysql.query(sql,[uuid,admin.user,admin.password,admin.re_password,admin.professional,admin.origin,admin.tel,admin.email,admin.time],function(err,results,fields){
        if (err) {
            throw err;
        } else {
            //返回用户id
            return callback(err, uuid, fields);
        }
    });
};

Admin.get =  function  get(username, callback) {
    var sql ="select p.id,p.user,p.password,p.re_password,p.professional,p.origin,p.tel,p.email,p.time from admin p where 1=1";
    if(username){
        sql +=" and p.username='"+username+"'";
    }
    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            callback(err,results,fields);

        }
    })
};
Admin.queryByName =  function  queryByName(username, callback) {
    var sql ="select p.user from admin p where p.user='"+username+"'";
    //var sql ="select p.user from author p where p.user='admin'";

    //var sql ="select p.id,p.user,p.password,p.re_password,p.professional,p.origin,p.tel,p.email,p.time from author p where 1=1";
    if(username){
     sql +=" and p.username='"+username+"'";
     }
    mysql.query(sql,function(err,results,fields){
        if(err){
            throw err;
        }else{
            console.log('Admin_results==' + results + '\nAdmin_results[0]==' + results[0]);
            callback(err,results,fields);

        }
    })
};
