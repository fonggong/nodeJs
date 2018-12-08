const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
	extended: true
}))

app.post("/user/register", function(req, res) {
	function send(code) {
		res.send(code)
	}
	fs.exists("user", function(exists) {
		if(exists) {
			makeFile()
		} else {
			fs.mkdir("user", function(err) {
				if(err) {
					send("创建文件夹失败")
				} else {
					makeFile()
				}
			})
		}
	})

	function makeFile() {
		fs.exists("user/" + req.body.username + ".txt", function(exists) {
			if(exists) {
				send("用户已存在")
				return
			} else {
				if(req.body.password.trim() == "") {
					send("请输入密码")
				} else {
					if(req.body.password != req.body.passwordConfirm) {
						send("两次密码输入不一致")
					} else {
						fs.appendFile("user/" + req.body.username + ".txt", JSON.stringify(req.body), function(err) {
							if(err) {
								send("文件创建失败")
							} else {
								send("注册成功")
							}
						})
					}
				}
			}
		})
	}

})

app.post("/user/login", function(req, res) {
	function sendMsg(code) {
		res.send(code)
	}
	if(req.body.username == "" || req.body.password == "") {
		sendMsg("用户名或密码为空")
	} else {
		fs.exists("user/" + req.body.username + ".txt", function(exists) {
			if(!exists) {
				sendMsg("用户不存在，请先注册")
			} else {
				fs.readFile("user/" + req.body.username + ".txt", function(err, data) {
					if(err) {
						sendMsg("系统有误")
					} else {
						if(req.body.username != JSON.parse(data.toString()).username || req.body.password != JSON.parse(data.toString()).password) {
							sendMsg("密码有误")
						} else {
							sendMsg("yes")
						}
					}
				})
			}
		})

	}

})

app.listen(3000, function(err) {
	console.log("server is running...")
})