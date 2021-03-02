$(function () {
    //给密码框设置校验规则
    layui.form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须是6到12位且不能有空格'],
        samePwd: function (val) {
            if (val === $('[name = oldPwd]').val()) {
                return '新旧密码不能相同'
            }
        },
        rePwd: function (val) {
            if (val !== $('[name=newPwd]').val()) {
                return '两次输入不一致'
            }
        }
    })
    //发起请求重置密码功能
    $('.layui-form').submit(function (e) {
        e.preventDefault();//阻止默认行为

        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0 && res.message !== "更新密码成功！") {
                    return layui.layer.msg(res.message);
                }
                layer.confirm('修改成功，请重新登录', { icon: 1, title: '提示' }, function (index) {
                    //do something
                    layer.close(index);
                    window.parent.location.href = '/login.html'
                });
            }
        });
    });
})