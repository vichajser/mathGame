'use strict'

/**
 * 游戏初始化
 * @return {[type]} [description]
 */

!function(){
    //绑定界面元素
    var query = {
            index: $("#main-game"),
            loading: $("#explain-game"),
            play: $("#play")
            //
        },
        //判断手机型号
        userAgent = window.navigator.userAgent.toLowerCase(),
        isAndriod = /andriod/i.test(userAgent),
        isIOS = /iphone|ipad|ipod/i.test(userAgent),

        //app 初始化
        app = {
            init: function(){
                this.initEvent();
                // this.loading();
                this.render();
            },

            // loading: function(){
            //     app.render();
            // },
            
            //主游戏页面渲染
            render: function(){
                setTimeout(function(){
                    query.loading.show();
                    // query.index.show();
                },10);
            },

            initEvent: function(){
                var clickEvent = "ontouchstart" in document.documentElement ? "touchstart" : "click",
                    mathApp = this;

                query.play.on(clickEvent, function(){
                    // var type = $(this).data('type')
                    query.loading.hide();
                    Game.init(query.index, mathApp);
                });

                this.weixinEvent();
            },

            weixinEvent: function(){
                var content = _lang[_config.lang];

                document.addEventListener('WeixinJSBridgeReady', function(){
                    if(WeixinJSBridge){
                        WeixinJSBridge.bind("menu:share:appmessage", function(){
                            var a = Game.lastScore > 0 ? content.share_txt1 + Game.lastScore + content.share_txt2 + Game.lastGamePercent + content.share_txt3 + content.share_text4 : shareData.tTitle;

                            WeixinJSBridge.invoke('sendAppMessage', {
                                img_url: shareData.imgUrl,
                                link: shareData.timeLineLink,
                                desc: shareData.tContent,
                                title: a
                            },function(){});
                        });

                        WeixinJSBridge.bind("menu:share:timeline", function(){
                            var a = Game.lastScore > 0 ? content.share_txt1 + Game.lastScore + content.share_txt2 + Game.lastGamePercent + content.share_txt3  + content.share_text4 : shareData.tTitle;

                            WeixinJSBridge.invoke('shareTimeline', {
                                img_url: shareData.imgUrl,
                                link: shareData.timeLineLink,
                                desc: shareData.tContent,
                                title: a
                            },function(){});
                        })
                    }
                },false);
            }  
        };

        app.init();
        window.API = {};
}();