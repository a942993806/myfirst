$(function () {
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    //file 注册change事件
    $('#file').on('change', function (e) {
        var filelist = e.target.files
        if (filelist.length == 0) {
            return layui.layer.msg('请上传图片');
        }
        var file = e.target.files[0]
        var imgUrl = URL.createObjectURL(file)
        $image.cropper('destroy').attr('src', imgUrl).cropper(options)
    })
    $('#btnChooseImage').click(function (e) {
        e.preventDefault();
        $('#file').click()


    });
    $('#btnUpload').click(function () {
        var dataURL = $image.cropper('getCroppedCanvas', {
            // 创建一个 Canvas 画布
            width: 100,
            height: 100
        }).toDataURL('image/png,image/jpeg') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        $.ajax({
            type: "POST",
            url: "/my/update/avatar",
            data: {
                avatar: dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('头像上传失败');
                }
                layui.layer.msg('头像上传成功');
                window.parent.getUserInfo()
            }
        });
    })


})