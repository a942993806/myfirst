$(function () {
    var form = layui.form
    //表单验证
    form.verify({
        nickname: function (val) {
            if (val.length > 6) {
                return '昵称长度不得超过6个字符'
            }
        }
    })
    // 初始化用户信息
    initUserInfo()
    function initUserInfo() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取信息失败');
                }
                form.val('formUserInfo', res.data)
            }
        });
    }
    //设置重置功能
    $('#btnReset').click(function (e) {
        e.preventDefault();
        initUserInfo()
    })
    //监听form表单提交事件submit
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        //发送post请求
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),//快速提交表单数据的方法
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('信息修改失败');
                }
                // console.log(res);
                layui.layer.msg(res.message);
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息

                window.parent.getUserInfo();
            }
        });
    });


})