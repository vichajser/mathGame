'use strict'

//游戏资源
var _lang = {
        zh: {
            title: "看谁算的快",
            help_txt: "规则: 初始15秒,答对一题相应添加一秒作答时间,看你能做多少,鉴别你小学数学老师的真实身份的时候到了",
            score: "得分:",
            btn_pause: "暂停",
            btn_reTry: "重来",
            game_pause: "游戏暂停中",
            btn_resume: "继续",
            loading: "加载中...",
            share_txt1: "我怒砍",
            share_txt2: "分，击败了",
            share_txt3: "%的人,经鉴定我的小学数学老师",
            share_text4: ",不服来战！",
            desc: "看你能算多少。分享朋友圈,选择你身边那些被体育老师教过的数学的汉子"
        }
    },
    //游戏配置
    _config = {
        lang: 'zh',
        initTime: 15

    },

    //游戏数据
    shareData = {
        imgUrl: "",
        timeLineLink: "",
        tTitle: _lang[_config.lang].title,
        tContent: _lang[_config.lang].desc
    };

/**
 * [description]
 * @return {[type]} [description]
 */
(function(){
    //绑定界面元素
    var dom = {},
        game = {
            score: 0,
            right_answer: 0, //正确答案
            init: function(el, parent){
                this.api = API;
                this.config = _config;
                this.lang = _lang[_config.lang];
                this.el = el;
                this.parent = parent;

                this.reset();
                this.randerUI();
                this.inited || this.initEvent();
                this.inited = true;

                this.start();

            },

            //渲染游戏主UI
            randerUI: function(){
                var isLandScape = 90 == window.orientation || -90 == window.orientation;//判断用是否横屏
                var width = isLandscape ? window.innerHeight : window.innerWidth;

                width -= 20;
                width = Math.min(width,600);

                this.el.show();
            },

            //事件初始化
            initEvent: function(){
                var eventName = "ontouchstart" in document.documentElement ? "touch" : "click",
                    mathGame = this;
            }



        }
})()