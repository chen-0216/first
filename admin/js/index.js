$(function () {
  $('.logout').on('click', function () {
    localStorage.removeItem('token');
    location.href = './login.html';
  });
  $.ajax({
    type: 'get',
    url: bigevent.user_info,
    success: function (info) {
      // console.log(info);
      if (info.code === 200) {
        $('.user_info span').html('欢迎&nbsp;&nbsp;' + info.data.nickname);
        $('.user_info img').attr('src', info.data.userPic);
        $('.user_center_link img').attr('src', info.data.userPic)
      }
    }
  });
  $('.level01').on('click', function () {
    // $('.level02').slideUp();
    $(this).addClass('active').siblings('div').removeClass('active');
    if ($(this).index() === 1) {
      $('.level02').slideToggle();
      $(this).find('b').toggleClass('rotate0');
      $('.level02 li:eq(0)').click();
    } else {
      $('.level02').slideUp();
    }
  });
  $('.level02 li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
  });
  $('#selfCenter').click(function () {
    $('.level01').eq(3).addClass('active').siblings('div').removeClass('active');
  })
})
