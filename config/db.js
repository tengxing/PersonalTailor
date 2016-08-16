/*
* db.js
* ���ݿ������ļ�
*
* */
/*module.exports = {
    mysql:{
        host:'localhost',
        user:'admin',
        password:'admin',
        database:'personal',
        port:3306
    }
}*/
(function() {
    var client, mysql, settings;

         settings = require('./setting');

    client = null;

    mysql = require('mysql');

    exports.getDbCon = function() {
        var err;
        try {
            if (client) {
                client = mysql.createConnection(settings.db);
                client.connect();
            } else {
                client = new mysql.createConnection(settings.db);
                client.connect();
            }
        } catch (_error) {
            err = _error;
            throw err;
        }
        return client;
    };

}).call(this);
