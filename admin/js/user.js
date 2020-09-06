$(function () {
  $.ajax({
    type: 'get',
    url: bigevent.user_detail,
    success: function (info) {
      if (info.code === 200) {
        $('#form input[name=username]').val(info.data.username);
        $('#form input[name=nickname]').val(info.data.nickname);
        $('#form input[name=email]').val(info.data.email);
        $('#form .user_pic').attr('src', info.data.userPic);
        $('#form input[name=password]').val(info.data.password);
      }
    }
  });
  $('#exampleInputFile').on('change', function () {
    // console.log($(this));
    var file = this.files[0];
    var url = URL.createObjectURL(file);
    $('#form .user_pic').attr('src', url);
  });
  $('#form').on('submit', function (e) {
    e.preventDefault();
    var data = new FormData(this);
    $.ajax({
      type: 'post',
      url: bigevent.user_edit,
      data: data,
      contentType: false,
      processData: false,
      success: function (info) {
        if (info.code === 200) {
          $.ajax({
            type: 'get',
            url: bigevent.user_info,
            success: function (info) {
              if (info.code === 200) {
                console.log(info);
                parent.$('.user_info span').html('欢迎&nbsp;&nbsp;' + info.data.nickname);
                parent.$('.user_info img').attr('src', info.data.userPic);
                parent.$('.user_center_link img').attr('src', info.data.userPic);
              }
            }
          })
        }
      }
    })
  })
})