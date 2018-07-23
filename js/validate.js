$(document).ready(function(){
    //生成验证码
    createCode();
    //手机号码验证
    $.validator.addMethod("isPhone",function(value,element){
        var phone=/^[0-9]{11}$/;
        return this.optional(element) || (phone.test(value));
    },"请填写正确的手机号");
    //验证注册界面
    $("#form-reg").validate({
        rules:{
            username:{
                required:true,
                maxlength:12,
                minlength:2
            },
            password:{
                required:true,
                maxlength:16,
                minlength:6
            },
            "re-password":{
                required:true,
                equalTo:"#pw"
            },
            email:{
                required:true,
                email:true
            },
            phone:{
                required:true,
                isPhone:true
            }
        },
        messages:{
            username:{
                required:"必填",
                maxlength:"最大长度为12",
                minlength:"最小长度为2"
            },
            password:{
                required:"必填",
                maxlength:"最大长度为16",
                minlength:"最小长度为6"
            },
            "re-password":{
                required:"必填",
                equalTo:"密码不一致"
            },
            email:{
                required:"必填",
                email:"邮箱格式错误"
            },
            phone:{
                required:"必填",
                isPhone:"电话号码格式错误"
            }
        },
        errorPlacement:function(error,element){
            element.next().remove();
            element.after('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
            element.closest(".form-group").append(error);
        },
        highlight : function(element) {
            $(element).closest(".form-group").addClass("has-error");
        },
        success:function(label){
            var el=label.closest(".form-group").find("input");
            el.next().remove();
            el.after('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
            label.closest(".form-group").removeClass("has-error").addClass("has-success");
            label.remove();
        },

        submitHandler:function(form){
            alert("submit!");
        }
    });
    $(".code").click(function(){
        createCode();
    });

    $("#input").blur(function(){
        validate();
    });

    //生成验证码
    function createCode(){
        code = "";
        var codeLength = 4;
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
            'S','T','U','V','W','X','Y','Z');
        for(var i = 0; i < codeLength; i++) {
            var index = Math.floor(Math.random()*36);
            code += random[index];
        }
        $(".code").text(code);
    }
    //验证码验证
    function validate(){
        var inputCode = $("#input").val().toUpperCase();
        if(inputCode!=""&&inputCode != code ) {
            //encodeURI($("#input").val("验证码输入错误"));
            $("#input").val("验证码输入错误").css("color","#D63333");
        }
    }
    //验证登录界面
    $("#form-login").validate({
        rules:{
            username:{
                required:true,
                maxlength:12,
                minlength:2
            },
            password:{
                required:true,
                maxlength:16,
                minlength:6
            }
        },
        messages:{
            username:{
                required:"必填",
                maxlength:"最大长度为12",
                minlength:"最小长度为2"
            },
            password:{
                required:"必填",
                maxlength:"最大长度为16",
                minlength:"最小长度为6"
            }
        },
        errorPlacement:function(error,element){
            element.next().remove();
            element.after('<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>');
            element.closest(".form-group").append(error);
        },
        highlight : function(element) {
            $(element).closest(".form-group").addClass("has-error has-feedback");
        },
        success:function(label){
            var el=label.closest(".form-group").find("input");
            el.next().remove();
            el.after('<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>');
            label.closest(".form-group").removeClass("has-error").addClass("has-feedback has-success");
            label.remove();
        },
        submitHandler:function(form){
            alert("submit!");
        }
    });
});