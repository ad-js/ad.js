new Vue({
    el:"#app",
    data() {
        return {
            selectOptions1: [
                {
                    value:'en',
                    label:'英文' 	
                },
                {
                    value: 'zh-CHS',
                    label: '中文'
                },
                {
                    value:'ja',
                    label:'日文' 	
                },
                {
                    value:'ko',
                    label:'韩文' 	
                },
                {
                    value:'fr',
                    label:'法文' 	
                }
            ],
            selectOptions2: [
                {
                    value:'en',
                    label:'英文' 	
                },
                {
                    value: 'zh-CHS',
                    label: '中文'
                },
                {
                    value:'ja',
                    label:'日文' 	
                },
                {
                    value:'ko',
                    label:'韩文' 	
                },
                {
                    value:'fr',
                    label:'法文' 	
                }
            ],
            selectValue1: '英语',//原文语言
            selectValue2:'中文',//译文语言
            textareaFrom: '',
            textareaTo: '',
            tableList:{
                list1:'原文语言',
                list2:'译文',
                list3:'时间',
                // list4:'删除记录',
                list4:'',
                list5:'译文语言'
            }, 
            tableList2:{
                list1:'原文语言',
                list2:'译文',
                list3:'时间',
                // list4:'删除记录',
                list4:'',
                list5:'译文语言'
            },
            history: [],
            favorites:[],
            isPhone:false
        }
    },
    created() {
        const that = this
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
        console.log(window.screenWidth)
        if(window.screenWidth<=750){
            that.isPhone = true
        }else{
            that.isPhone = false
        }
        /**
         * 读取 cookie 
         */
        /**
         * 如果没有Cookie 创建
         */
        // 历史翻译记录 如果不存在cookie 创建一个
        const his = []
        if(!cookie('history')){
            try{
                cookie.set('history',JSON.stringify(his) ,0.375)  
            }catch(e){}
        }
        // 收藏夹 如果不存在cookie 创建一个
        if(!cookie('favorites')){
            try{
                cookie.set('favorites',JSON.stringify(his), 3650)   
            }catch(e){}
        }
        // 读取到data中
        this.history = JSON.parse(cookie('history'))
        this.favorites = JSON.parse(cookie('favorites'))
        console.log( cookie() )
        console.log( JSON.parse(cookie('history'))   )
        console.log( JSON.parse(cookie('favorites')) )
    },
    mounted() {
        /**
         * 监控 窗口 实现 部分 控件的显示和隐藏
         */
        const that = this
        window.onresize = () => {
            return (() => {
              window.screenWidth = document.body.clientWidth
              that.screenWidth = window.screenWidth
              console.log(window.screenWidth)
              if(window.screenWidth<=750){
                that.isPhone = true
              }else{
                that.isPhone = false
              }
            })()
          }
    },
    methods: {
        youDao(){
            /**
             * 处理请求参数
             */
            var appKey =  '4008b3392f01aeae';
            var key = 'xTWyyGf28SLGkxrJCMGt1XJFfipUQW26';//注意：暴露appSecret，有被盗用造成损失的风险
            var salt = (new Date).getTime();
            var curtime = Math.round(new Date().getTime()/1000);
            var query =this.textareaFrom;
            // var from = 'zh-CHS';
            var from = this.selectValue1;
            // var to = 'en';
            var to =  this.selectValue2;
            var str1 = appKey + truncate(query) + salt + curtime + key;
            // console.log('---',str1);
            var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
            const that = this
            $.ajax({
                url: 'http://openapi.youdao.com/api',
                type: 'post',
                dataType: 'jsonp',
                data: {
                    q: query,
                    appKey:appKey,
                    salt: salt,
                    from: from,
                    to: to,
                    sign: sign,
                    signType: "v3",
                    curtime: curtime
                },
                success: function (data) {
                    // 渲染 翻译结果 
                    that.textareaTo = data.translation[0]
                    /**
                     * 调用 函数 把结果保存到cookie
                     */
                    that.textareaFromChange()
                } 
                // headers:{
                //     referer:'',
                //     host:'10.63.0.43:5500'
                // },
                // url:'https://fanyi.baidu.com/langdetect',
                //  type: 'post',
                // dataType: 'jsonp',
                // data: {
                //    query:'time'
                // },
                // success: function (data) {
                //     console.log(data)
                // } 
            })
            function truncate(q){
                var len = q.length;
                if(len<=20) return q;
                return q.substring(0, 10) + len + q.substring(len-10, len);
            }
            function str2utf8(str) {
                encoder = new TextEncoder('utf8');
                return encoder.encode(str);
            }
        },
        del(index,num,type){
            console.log(type)
            if(num==='1'){
                if(type==='h'){
                    this.history.splice(index,num)
                }else if(type==='f'){
                    this.favorites.splice(index,num)
                }
            }else if(num==='all'){
                if(type==='h'){
                    this.history=[]
                }else if(type==='f'){
                    this.favorites=[]
                }
            }
            this.$message({
                message: '删除成功',
                type: 'success'
              });
            // 更新 Cookie
            cookie.set('history',JSON.stringify(this.history), 0.375)   
            cookie.set('favorites',JSON.stringify(this.favorites), 3650)   
        },
        textareaFromChange(){
            /**
             * 添加 翻译 记录
             */
            const time = new Date()
            const h =  time.getHours()//时
            const m =  time.getMinutes()//分
            const addHistory = {
                originalText: this.textareaFrom,
                translation: this.textareaTo,
                time: h+':'+m,
                isFav:false
            }
            // const addFavorites = {
            //     originalText: this.textareaFrom,
            //     translation: this.textareaTo,
            //     time: h+':'+m,
            //     isFav:false
            // }
            this.history.unshift(addHistory)
            // this.favorites.unshift(addFavorites)
            /**
             * 把记录保存到cookie内 
             */
            cookie.set('history',JSON.stringify(this.history),0.1)   
            // cookie.set('favorites',JSON.stringify(this.favorites), 3650)   
        },
        addFavorites(){
            const time = new Date()
            const h =  time.getHours()//时
            const m =  time.getMinutes()//分
            if(this.textareaFrom!=='' && this.textareaTo!==''){
                this.favorites.unshift({
                    originalText: this.textareaFrom,
                    translation: this.textareaTo,
                    time: h+':'+m,
                    isFav:true
                })
                this.$message({
                    message: '收藏成功',
                    type: 'success'
                  });
            }else{
                this.$message.error('无法收藏空内容');
            }
        },
        copy(){
            const that = this
            copyToClip( this.textareaTo,'已经成功复制到剪贴板')
            function copyToClip(content, message) {
                if(content!==''){
                    var aux = document.createElement("input"); 
                    aux.setAttribute("value", content); 
                    document.body.appendChild(aux); 
                    aux.select();
                    document.execCommand("copy"); 
                    document.body.removeChild(aux);
                    that.$message({
                        message: message,
                        type: 'success'
                    });
                }else{                
                    that.$message.error('建议您先去翻译一下再来复制哦!');
                }
            }
        },
        add(index,num,type,scop,how){
            if(how){
                // console.log( this.history[scop.$index] )
                this.favorites.unshift(this.history[index])
                cookie.set('favorites',JSON.stringify(this.favorites), 0.375)   
                // this.history[index].isFav = !this.history[index].isFav 
                // console.log( this.history[index].isFav )
            }else{
                this.favorites.splice(0,1)
                cookie.set('favorites',JSON.stringify(this.favorites), 0.375) 
            }
            this.history[index].isFav = !this.history[index].isFav 
        }
        
    }
})