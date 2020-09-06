$(function () {
  $.ajax({
    type: 'get',
    url: bigevent.category_list,
    success: function (info) {
      if (info.code === 200) {
        console.log(info);
        var htmlStr = template('category', info);
        $('#selCategory').html(htmlStr);
      }
    }
  })
})