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
        initTime: 15,
        addTime: 1,
        addScore: 20,
        sumMax: 100,
        multiMax: 1000
    },

    //游戏数据
    shareData = {
        imgUrl: "",
        timeLineLink: "",
        tTitle: _lang[_config.lang].title,
        tContent: _lang[_config.lang].desc
    },

    mathFactory = function(){
        this.init();
    };

    mathFactory.prototype.init = function(){
        var _this = this,
            num = parseInt(Math.random()*1) || 0;

        this.factory(num);
    };

    mathFactory.prototype.randomNum = (minNum,maxNum){
        return parseInt(minNum + Math.random() * (maxNum - minNum));
    };

    mathFactory.prototype.operator = (num, a, b){
        var result = {},
            operatorFactory = [
                function add(a,b){
                    result.a = a;
                    result.b = b;
                    result.rightAnswer = parseInt(a) + parseInt(b);
                    result.operator = "+";
                },
                function sub(a, b){
                    result.a = a;
                    result.b = b;
                    result.rightAnswer = parseInt(a) - parseInt(b);
                    result.operator = "-";
                },
                function mul(a, b){
                    result.a = a;
                    result.b = b;
                    result.rightAnswer = parseInt(a) * parseInt(b);
                    result.operator = "×";
                },
                function sub(a, b){
                    result.b = a;
                    result.rightAnswer = b;

                    result.a = parseInt(a) * parseInt(b);
                    result.operator = "÷";
                }
            ];

        
        if(num == 0){
            operatorFactory[2 + parseInt(Math.random()*2)]();
        }else{
            operatorFactory[parseInt(Math.random()*2)]();
        }

        return result
    };


    mathFactory.prototype.factory = function(num){
        var _this = this,
            result = {};

        switch(num){
            case 0 :
                var a = _this.randomNum(0, _config.sumMax),
                    b = _this.randomNum(0, _config.sumMax);

                    result = _this.operator(num, a, b);
                    break;
            case 1 :
                var a = _this.randomNum(100, _config.sumMax),
                    b = _this.randomNum(100, _config.sumMax);

                    result = _this.operator(num, a, b);
                    break;
            default: break;
        }

        return {
            a: a,
            b: b,
            operator: result.operator,
            rightAnswer: result.rightAnswer
        };
    };

/**
 * [description]
 * @return {[type]} [description]
 */
(function(){
    //绑定界面元素
    var dom = {
        input_val: $(),
        start: $(),
        time: $()
    },
        mathfactory = new mathFactory(),
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

                $(window).resize(function(){
                    mathGame.randerUI();
                });

                dom.input_val.bind('input propertychange',function(){
                    var value = dom.input_val.data();

                    if(right_answer == value){
                        // dom.input_val.css('border','1px solid blue');
                        game.nextLv().call(mathGame);
                    }else{
                        // dom.input_val.css('border','1px solid red');
                    }
                });

                dom.btn_resume.on(eventName,function(){
                    game.resume.call(this);
                });

                dom.start.on(eventName,function(){
                    mathGame.right_answer = 0;
                    mathGame.score = 0;
                    
                    mathGame.reset();
                    mathGame.start();
                });

            },

            start: function(){
                var _this = this;

                dom.dialog.hide();
                mathfactory.init();
                this.timer || (this.timer = setInterval(this.tick.call(_this), 1000));
            },

            tick: function(){
                var _this = this;
                
                _this.time --;
                if(_this.time < 0){
                    _this.gameOver();
                }else{
                    dom.time.text(parseInt(this.time));
                }
            },

            reset: function(){
                var _this = this;
                
                _this.time = _config[initTime];
            },
            nextLv: function(){
                this.time += this.config.addTime;
                this.score += this.config.addScore; 
                dom.time.text(parseInt(this.time)); 

                this.start();
            },
            gameOver: function(){

            }
        }
})()