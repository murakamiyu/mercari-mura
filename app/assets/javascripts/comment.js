$(function() {
  $(document).on('turbolinks:load', function() {

    function buildHTML(comment) {
      var html = `
                   <li class="clearfix">
                    <a href="https://www.mercari.com/jp/u/731864756/" class="message-user">
                      <figure>
                        <div>
                          <img src="https://static-mercari-jp-imgtr2.akamaized.net/thumb/members/731864756.jpg?1404728044" alt="">
                        </div>
                        <figcaption class="bold">
                          ${comment.user_name}
                        </figcaption>
                      </figure>
                    </a>
                    <div class="message-body">
                      <div id="hide-comment">
                        <div class="message-body-text">
                          ${comment.comment}
                        </div>
                        <div class="message-icons clearfix">
                          <time class="message-icon-left">
                            <i class="tiny material-icons">access_time</i>
                            <span>3 時間前</span>
                          </time>
                          <div class="message-icon-right">
                            <form action="https://www.mercari.com/jp/comment/report/m17702910592/1771592636/" method="POST">
                              <button type="submit">
                                <i class="far fa-flag"></i>
                              </button>
                              <input type="hidden" name="redirect_url_key" value="item_detail">
                            </form>
                          </div>
                          <div id="display-switch" class="message-icon-right margin-right">
                            <i class="material-icons">edit</i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
      `
      return html;
    }

　//新規投稿
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    console.log(url, formData);
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      console.log(data)
      var html = buildHTML(data);
      $('.message-items').append(html)
      $('#comment_send').val('')
    })
    .fail(function(){
      alert('error');
    })
    
  //編集機能　編集画面表示
  $('#edit-switch')

  });

  });
});

// $('#display-switch').on('click',function() {
//       $(this).parent().parent().parent().addClass('in-edit');
//       $('#hide-comment').css('display','none');
//       $('.in-edit > #showup-comment').removeClass('hidden-comment');
//     });

//     $('.in-edit > #display-switch').on('click',function() {
//       $(this).parent().parent().parent().addClass('hidden-comment');
//       $('#showup-comment').css('display','none');
//       $('.in-edit > #hide-comment').removeClass('in-edit');
//     });
 // 