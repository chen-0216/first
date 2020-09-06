$(function () {
  $('.login_form').on('submit', function (e) {
    e.preventDefault();
    var $user = $('.input_txt').val().trim();
    var $psw = $('.input_pass').val().trim();
    $.ajax({
      type: 'post',
      url: bigevent.user_login,
      data: $('.login_form').serialize(),
      beforeSend: function () {
        if (!$user || !$psw) {
          $('#myModal').modal('show');
          $('#myModal p').text('用户名和密码不能为空！！！')
        }
      },
      success: function (info) {
        $('#myModal').modal('show');
        $('#myModal p').text(info.msg)
        if (info.code === 200) {
          localStorage.setItem('token', info.token);
          $('#sureBtn').on('click', function () {
            location.href = './index.html';
          })
        } else {
          $('#sureBtn').on('click', function () {
            $('#myModal').modal('hide');
          })
        }
      }
    })
  })
})