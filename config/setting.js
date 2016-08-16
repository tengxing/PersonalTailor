/**
 * Created by sf on 2016/7/29.
 */
(function() {
    var settings;
        settings = {
            db: {
                host: 'localhost',     //本地数据库
                port: '3306',
                user: 'admin',          //数据库用户名
                password: 'admin',          //数据库密码
                database: 'personal',  //数据库名称
                skims:0
            }
        };

    module.exports = settings;

}).call(this);