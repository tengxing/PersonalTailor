/**
 * Created by hp-wanglihui on 2014/5/27.
 */

'use strict';

/**
 * 分页插件类
 * @param page {Number} 当前页
 * @param perPage {Number} 每页记录数
 * @param total {Number} 总记录数
 * @param items {dict} 当前页记录列表
 * @constructor
 */
function Paginate(page, perPage, total, items){
    if(!page || page <1){
        page = 1;
    }
    if(!perPage || perPage<1){
        perPage = 20;
    }
    if(!total || total <0){
        total = 0;
    }
    if(!items){
        items = [];
    }
    this.page = page;
    this.perPage = perPage;
    this.total = total;
    this.items = items;
    this.currentPageTatol = items.length;
    if(this.total%this.perPage ===0){
        this.pages = parseInt(this.total/this.perPage);
    }else{
        this.pages = parseInt(this.total /this.perPage) + 1;
    }
}

/**
 * 设置当前页数
 * @param page {Number}
 */
Paginate.prototype.setPage = function(page){
    this.page = page;
}

/**
 * 设置每页条数
 * @param perPage
 */
Paginate.prototype.setPerPage = function(perPage){
    this.perPage = perPage;
}

/**
 * 是否有上一页
 * @returns {boolean}
 */
Paginate.prototype.hasPrevPage = function(){
    if(this.page >1){
        return true;
    }
    return false;
}

/**
 * 上一页
 * @returns {number}
 */
Paginate.prototype.prevPage = function(){
    if(this.page <= 1){
        return 1;
    }
    return this.page-1;
}

/**
 * 是否有下一页
 * @returns {boolean}
 */
Paginate.prototype.hasNextPage = function(){
    if(this.page < this.totalPage){
        return true;
    }
    return false;
}

/**
 * 下一页
 * @returns {*}
 */
Paginate.prototype.nextPage = function(){
    if(this.page < this.totalPage){
        return this.page+1;
    }
    return this.totalPage;
}

module.exports = Paginate;


/**
 * 分页列出图书信息
 * @param condition 条件
 * @param page  当前页
 * @param perPage 每页记录
 * @param opt 排序,skip,limit...
 * @param callback
 *  - err
 *  - Paginate
 */
var listBookAndPaginate = function(condition, page, perPage,opt, callback){
    if(!condition){
        condition = {};
    }
    if(!opt){
        opt = {};
    }
    //计算分页信息
    if(!perPage || perPage<1){
        perPage = 20;
    }
    var skip = 0;
    if(page && page >=1){
        skip = (page-1) * perPage;
    }
    opt['skip'] = skip;
    opt['limit'] = perPage;

    var ep = new EventProxy();
    ep.fail(callback);

    ep.all('total', 'books', function(total, books){
        var paginate = new Paginate(page, perPage, total, books);
        callback(null, paginate);
    });

    //计算总数
    BookSchema.count(condition,ep.done('total'));
    //查询当前页图书信息
    BookSchema.find(condition, {}, opt, ep.done('books'));

    /*首页 > 工作日志 > 自己写的nodejs分页插件

    自己写的nodejs分页插件*/

    /**
     * Created by hp-wanglihui on 2014/5/27.
     */

    'use strict';

    /**
     * 分页插件类
     * @param page {Number} 当前页
     * @param perPage {Number} 每页记录数
     * @param total {Number} 总记录数
     * @param items {dict} 当前页记录列表
     * @constructor
     */
    function Paginate(page, perPage, total, items){
        if(!page || page <1){
            page = 1;
        }
        if(!perPage || perPage<1){
            perPage = 20;
        }
        if(!total || total <0){
            total = 0;
        }
        if(!items){
            items = [];
        }
        this.page = page;
        this.perPage = perPage;
        this.total = total;
        this.items = items;
        this.currentPageTatol = items.length;
        if(this.total%this.perPage ===0){
            this.pages = parseInt(this.total/this.perPage);
        }else{
            this.pages = parseInt(this.total /this.perPage) + 1;
        }
    }

    /**
     * 设置当前页数
     * @param page {Number}
     */
    Paginate.prototype.setPage = function(page){
        this.page = page;
    }

    /**
     * 设置每页条数
     * @param perPage
     */
    Paginate.prototype.setPerPage = function(perPage){
        this.perPage = perPage;
    }

    /**
     * 是否有上一页
     * @returns {boolean}
     */
    Paginate.prototype.hasPrevPage = function(){
        if(this.page >1){
            return true;
        }
        return false;
    }

    /**
     * 上一页
     * @returns {number}
     */
    Paginate.prototype.prevPage = function(){
        if(this.page <= 1){
            return 1;
        }
        return this.page-1;
    }

    /**
     * 是否有下一页
     * @returns {boolean}
     */
    Paginate.prototype.hasNextPage = function(){
        if(this.page < this.totalPage){
            return true;
        }
        return false;
    }

    /**
     * 下一页
     * @returns {*}
     */
    Paginate.prototype.nextPage = function(){
        if(this.page < this.totalPage){
            return this.page+1;
        }
        return this.totalPage;
    }

    module.exports = Paginate;
    //我在项目中的使用例子：
/**
 * 分页列出图书信息
 * @param condition 条件
 * @param page  当前页
 * @param perPage 每页记录
 * @param opt 排序,skip,limit...
 * @param callback
 *  - err
 *  - Paginate
 */
var listBookAndPaginate = function(condition, page, perPage,opt, callback){
    if(!condition){
        condition = {};
    }
    if(!opt){
        opt = {};
    }
    //计算分页信息
    if(!perPage || perPage<1){
        perPage = 20;
    }
    var skip = 0;
    if(page && page >=1){
        skip = (page-1) * perPage;
    }
    opt['skip'] = skip;
    opt['limit'] = perPage;

    var ep = new EventProxy();
    ep.fail(callback);

    ep.all('total', 'books', function(total, books){
        var paginate = new Paginate(page, perPage, total, books);
        callback(null, paginate);
    });

    //计算总数
    BookSchema.count(condition,ep.done('total'));
    //查询当前页图书信息
    BookSchema.find(condition, {}, opt, ep.done('books'));
}
    //controller端获取数据后的处理如下：
    var index = function(req, res, next){
        BookProxy.listBookAndPaginate({},1,20,{}, function(err,paginate){
            if(err){
                next(err);
            }else{
                if(!paginate){
                    res.send('not paginate');
                }
                var page = paginate.page;
                var perPage = paginate.perPage;
                var total = paginate.total;
                var items = paginate.items;
                var currentPageTotal = paginate.currentPageTatol;
                var hasNextPage = paginate.hasNextPage();
                var nextPage = paginate.nextPage();
                var hasPrevPage = paginate.hasPrevPage();
                var prevPage = paginate.prevPage();
                var pages = paginate.pages;

                res.jsonp({page:page, perPage:perPage, total:total,pages:pages, items:items,currentPageTotal:currentPageTotal, hasNextPage:hasNextPage,nextPage:nextPage, hasPrevPage:hasPrevPage, prevPage:prevPage})
            }
        })
    }