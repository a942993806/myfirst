$(function () {

    //渲染用户头像

    //实现点击退出功能
    var layer = layui.layer
    $('#goOut').on('click', function () {
        //提示用户是否退出
        layer.confirm('确定要退出吗?', { icon: 3, title: '提示' }, function (index) {
            //点击确定，回到登陆页面
            //1，清空本地存储的token
            localStorage.removeItem('token')
            //2 重新跳转到登陆页面
            location.href = '/login.html'
            //3 清除询问框
            layer.close(index);
        });
    })
    getUserInfo()

})

//其他页面需要调用 所以 需要放在入口函数外部

function getUserHead(user) {
    //1 获取用户的名称
    var uname = user.nickname || user.username
    //2  设置欢迎文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + uname);
    // 3 设置头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.textName').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = uname[0].toUpperCase()

        $(".textName").html(first).show()
    }
}
//获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取数据失败');
            }
            getUserHead(res.data)
        }
    });
}