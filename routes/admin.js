var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user');
var Admin = require('../models/admin');
module.exports = router ;
//将数据转成json返回给前台
/*var jsonWrite = function (res, ret) {
  if(typeof ret === 'undefined') {
    res.json({
      code:'1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};*/
//admin首页路由
router.get('/',function(req, res){
    res.render('admin/Views/index', {
      title: '后台管理首页'
    });
});
//管理员的数据路由
router.post('/',function(req, res){
  Admin.get( null, function (err, admins) {
    if (err) {
      admins = [];
    }
    res.json(admins);
  });
});
//用户的数据路由
router.post('/',function(req, res){
  User.queryAll( null, function (err, users) {
    if (err) {
      users = [];
    }
    res.json(users);
  });
});
//登录页面跳转路由
router.get('/addUser',function(req, res){
  res.render('admin/Views/reg', {
    title: '用户注册'
  });
});
//注册页面路由
//router.get('/reg', checkNotLogin);
router.get('/reg',function(req, res){
  res.render('admin/Views/reg', {
    title: '用户注册页面'
  });
});
//注册页面session处理
//router.post('/reg',checkNotLogin);
router.post('/reg',function(req,res){
  //检验用户两次输入的口令是否一致
  if(req.body['re_password']!=req.body['password']){
    req.session.messages=['error','两次输入的口令不一致'];
    return res.redirect('reg');
  }
  //生成口令的散列
  var md5 = crypto.createHash("md5");
  var password = md5.update(req.body.password).digest('base64');
  var  newUser =  new  User({
    name: req.body.username,
    password: password
  });

  //检查用户名是否已经存在
  User.get(newUser.name, function (err, user) {
    if (user)
      err = '用户已存在,请重新注册！！！';
    if (err) {
      req.session.messages=['Error', err];
      console.log('err===' + err);
      return res.redirect('reg');
    }
    // 如果不存在则新增用户
    newUser.save(function (err) {
      if (err) {
        req.session.messages=['Error', err];
        return  res.redirect('reg');
      }
      //req.session.user = newUser;
      req.session.messages=['Success', ' 注册成功!'];
      req.messages=['Success','注册成功'];
      res.redirect('login');
    });
  });
});
//登录页面路由
router.get('/login', checkNotLogin);
router.get('/login',  function (req, res) {
  res.render('admin/Views/login', {
    title: '用户登入'
  });
});
//登录页面session处理
router.post('/login',checkNotLogin);
router.post('/login', function (req, res) {
  //生成口令的散列值
  var  md5 = crypto.createHash('md5');
  var  password = md5.update(req.body.password).digest('base64');

  User.get(req.body.username, function (err, user) {
    if (!user) {
      req.session.messages=['用户不存在'];
      return  res.redirect('/login');
    }
    if (user.password != password) {
      req.session.messages=['error', ' 用户口令错误'];
      return  res.redirect('./login');
    }
    req.session.user = user;
    req.messages=['success', ' 登入成功'];
    res.redirect('/admin');
  });
});
router.get('/logout',checkLogin);
router.get('/logout', function (req, res) {
  req.session.user =  null;
  req.session.messages=['success', '登出成功'];
  res.redirect('/');
});
//发表微博
/*router.post('/post', checkLogin);
router.post('/post',  function (req, res) {
  var  currentUser = req.session.user;
  var  post =  new  Author(currentUser.name, req.body.authors);
  post.save(function (err) {
    if (err) {
      req.flash('error', err);
      return  res.redirect('/');
    }
    req.flash('success', ' 发表成功');
    res.redirect('/u/' + currentUser.name);
  });
});*/
//用户页面
/*router.get('/:user', function (req, res) {
  User.get(req.params.user,  function (err, user) {
    if (!user) {
      req.messages=['error', ' 用户不存在'];
      return  res.redirect('/');
    }
    Author.get(user.name, function (err, authors) {
      if (err) {
        req.flash('error', err);
        return  res.redirect('/');
      }
      res.render('user', {
        title: user.name,
        authors: authors
      });
    });
  });
});*/
router.get('/toGetPwd',function(req,res){
  res.render('admin/Views/getpwd', {
    title: '密码找回'
  });
});
//找回密码
router.get('/getPwd',checkNotLogin);
router.get('/getPwd',function(req,res){
  res.render('admin/Views/getpwd', {
    title: '密码找回'
  });
});

router.post('/getPwd',checkNotLogin);
router.post('/getPwd',function(req,res){
  if(req.body['re_password']!=req.body['password']){
    req.session.messages=['error','两次输入的口令不一致'];
    return res.redirect('/getPwd');
  }
  //生成口令的散列
    var md5 = crypto.createHash("md5");
    var password = md5.update(req.body.password,'utf8').digest('base64');
    var  newUser =  new  User({
      name: req.body.username,
      password: password
    });
  //检查用户是否存在
  User.get(newUser.name, function (err,user) {
    if (!user) {
      req.session.messages=['error', ' 用户不存在'];
      return  res.redirect('/getPwd');
    }
    newUser.update(function(err){
      if (err) {
        req.session.messages=['Error', err];
        return  res.redirect('reg');
      }
      req.session.messages=['Success', ' 更新密码成功!'+user.password];
      res.redirect('/admin/login');
    });
    /*req.session.messages=['success', '成功找回密码:'+user.password];
    console.log(user.password);
    res.redirect('/admin/login');*/
  });
});

function  checkLogin(req, res, next) {
  if (!req.session.user) {
    req.messages=['Error', '未登入'];
    return  res.render('admin/Views/login');
  }
  next();
}

function checkNotLogin(req, res, next) {
  if (req.session.user) {
    req.session.messages=['Error', '已登入'];
    return res.render('admin/Views/login');
  }
  next();
}

/*//查询所有用户
router.get('/',function(req,res,next){
  console.log('查询所有User');
  User.queryAll(req,res,next);
});
//根据id查询用户
router.get('/queryById',function(req,res,next){
  console.log('根据ID查询');
  userDao.queryById(req,res,next);
});
//删除用户
router.post('/deleteUser',function(req,res,next){
  console.log('删除用户');
  userDao.delete(req,res,next);
});
//修改用户
router.post('/updateUser',function(req,res,next){
  userDao.update(req,res,next);
});*/

module.exports = router;
