$(function () {
    //切换到注册页面
    $('#goZhu').click(function () {
        $('.login_login').hide()
        $('.login_zc').show()
    })
    //切换到 登录页面
    $('#goLogin').click(function (e) {
        $('.login_zc').hide()
        $('.login_login').show()
    });
    //验证 注册 填写密码两次是否一致
    var form = layui.form
    var layer = layui.layer
    // 通过 form.verify() 函数自定义校验规则
    form.verify({
        // 自定义了一个叫做 pwd 校验规则
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $('.login_zc [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })


    //提交注册

    // $('#login2').submit(function (e) {
    //     e.preventDefault();
    //     var data = {
    //         username: $('.login_zc name[username]').val(),
    //         password: $('.login_zc name[password]').val()

    //     }
    //     $.post("http://ajax.frontend.itheima.net/api/reguser",
    //         data,
    //         function (res) {
    //             if (res.status !== 0) {
    //                 return layer.msg(res.message)
    //             }
    //             layer.msg(res.message)
    //             $('#goLogin').click()
    //         },

    //     );
    // });
    $('#login2').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('.login_zc [name=username]').val(),
            password: $('.login_zc [name=password]').val()

        }
        $.post("/api/reguser",
            data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#goLogin').click()
            },

        );
    });
    //用户 登录
    $('#logins').on('submit', function (e) {
        e.preventDefault();
        var data = $(this).serialize()
        $.post("/api/login",
            data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功！')
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            },

        );
    })

})