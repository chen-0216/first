$(function () {
  function render() {
    $.ajax({
      type: 'get',
      url: bigevent.category_list,
      success: function (info) {
        if (info.code === 200) {
          var htmlStr = template('categoryList', info);
          $('tbody').html(htmlStr);
        }
      }
    });
  };

  render();
  var id;
  $('#myModal').on('shown.bs.modal', function (e) {
    id = $(e.relatedTarget).data('id');
    if (e.relatedTarget.id === 'xinzengfenlei') {
      $('#myModal h4').text('新增文章类别');
      $('#form')[0].reset();
    } else {
      $('#myModal h4').text('更新文章类别');
      $.ajax({
        type: 'get',
        url: bigevent.category_search,
        data: {
          id: id
        },
        success: function (info) {
          $('#myModal input[name=id]').val(info.data[0].id)
          $('#myModal input[name=name]').val(info.data[0].name)
          $('#myModal input[name=slug]').val(info.data[0].slug)
        }
      })
    }
  });
  $('#sureAdd').on('click', function () {
    $.ajax({
      type: 'post',
      url: id ? bigevent.category_edit : bigevent.category_add,
      data: $('#form').serialize(),
      success: function (info) {
        if (info.code === 200 || info.code === 201) {
          $('#myModal').modal('hide');
          render();
        }
      }
    })
  });
  $('#delModal').on('shown.bs.modal', function (e) {
    window.delId = $(e.relatedTarget).data('id');
  })
  $('#sureDel').on('click', function () {
    $.ajax({
      type: 'post',
      url: bigevent.category_delete,
      data: {
        id: delId,
      },
      success: function (info) {
        $('#delModal').modal('hide');
        render();
      }
    })
  })
})
