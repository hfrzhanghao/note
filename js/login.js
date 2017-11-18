var user = new Vue({
	el:"#user",
	data:{
		isLogin:true,
		state:"",
		username:"",
		password:"",
		password_again:""
	},
	methods:{
		changeState:function(){
			this.isLogin = !this.isLogin
			this.state = ""
		},
		login:function(){
			if(this.username == "" || this.password == ""){
				this.state = "用户名或密码不能为空"
				return false
			}
			var loginInfo = {
				username:this.username,
				password:this.password
			}
			postRequest("server/login.php", loginInfo)
                .then((message) => {
                	
                    if(message.success != "none"){
                    	this.state = "登录成功！"
                    	document.cookie = "username=" + this.username + ";";
                		document.cookie = "password=" + this.password + ";";
                    	window.location = 'index.html'

                    }else{
                    	this.state = "登录失败,请检查用户名或密码"
                    }
                })
                .catch((message) => {
                    this.state = "登录失败,请检查用户名或密码"
                })

		},
		register:function(){
			if(this.username == "" || this.password == ""){
				this.state = "用户名或密码不能为空"
				return false
			}
			if(this.password != this.password_again){
				this.state = "重复密码不正确"
				return false
			}
			var registerInfo = {
				username:this.username,
				password:this.password
			}
			postRequest("server/register.php", registerInfo)
                .then((message) => {
                    if(message.code == 0){
                    	this.state = "注册成功,点击上方链接返回登录界面"

                    }else if(message.code == 1){
                    	this.state = "用户名已被占用"
                    }
                })
                .catch((message) => {
                    this.state = "注册失败"
                })
		}
	}
})

function postRequest(url, params) {
    return new Promise((resolve, reject) => {
        Vue.http.post(
                url, params, { emulateJSON: true }
            )
            .then((res) => {
                resolve(res.body);
            })
            .catch((res) => {
                reject(res.body);
            })
    })
}

function getRequest(url, params) {
    return new Promise((resolve, reject) => {
        Vue.http.get(
                url, {
                    params: params
                }, { emulateJSON: true }
            )
            .then((res) => {
                resolve(res.body);
            })
            .catch((res) => {
                reject(res.body);
            })
    })
}