var arr = ["G", "A", "g", "U", "Z", "w", "s", "S", "J", "b", "P", "g", "F", "1", "4", "8", "0", "5"]

function rom() {
	var fg = "";
	var dd = ""
	for(var i = 0; i < 4; i++) {
		fg = Math.ceil(Math.random() * (arr.length - 1))
		dd += arr[fg]
	}
	$("input[type=button]").val(dd)
}
rom()
$("input[type=button]").click(function() {
	rom()
})

$("#register").submit(function(e) {
	e.preventDefault();
	var data = {
		username: $("#register>input[name=username]").val(),
		password: $("#register>input[name=password]").val(),
		passwordConfirm: $("#register>input[name=password1]").val()
	}
	var yan=$("#yan").val().trim().toUpperCase();
	var btn=$("input[type=button]").val().toUpperCase();
	if(yan == btn){
		$.ajax({
		type: "post",
		url: "/user/register",
		data: data,
		async: true
	}).done(function(res) {
		alert(res)
	})
	}else{
		alert('验证码输入有误')
	}
	
})

$("#login").submit(function(e) {
	e.preventDefault();
	var data = {
		username: $("#login>input[name=username]").val(),
		password: $("#login>input[name=password]").val()
	}
	console.log(data)
	$.ajax({
		type: "post",
		url: "/user/login",
		data: data,
		async: true
	}).done(function(res) {
		if(res=="yes"){
			location.href="http://www.baidu.com"
		}else{
			alert(res)
		}
	})
})