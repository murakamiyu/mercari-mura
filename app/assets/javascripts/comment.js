$(function() {
  $(document).on('turbolinks:load', function() {

    function buildNEW(comment) {
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
                    <div id="${comment.id}" class="message-body">
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
                          <div class="message-icon-right margin-right">
                            <%= link_to  "/items/${comment.item_id}/comments/${comment.id}/edit", id: "edit-switch", class: "edit-btn" do %>
                              <i class="material-icons">edit</i>
                            <% end %>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
      `
      return html;
    }

  function buildEDIT(comment) {
    var html = `
            <textarea id="comment-edit", class="edit-form-comment textarea-default", rows: "5", value: "" %>${comment.comment}</textarea>
            <a id="comment-cancel" class="edit-menu" href="/items/${comment.item_id}/comments/${comment.id}">戻る</a>
            <a id="comment-delete" class="edit-menu margin-edit" href="/items/${comment.item_id}/comments/${comment.id}">削除</a>
            <a id="comment-update" class="edit-menu margin-edit" href="/items/${comment.item_id}/comments/${comment.id}">更新</a>
            `
  return html;
  }

  function buildUPDATED(comment) {
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
                    <div id="${comment.id}" class="message-body">
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
                          <div class="message-icon-right margin-right">
                            <%= link_to  "/items/${comment.item_id}/comments/${comment.id}/edit", id: "edit-switch", class: "edit-btn" do %>
                              <i class="material-icons">edit</i>
                            <% end %>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
      `
      return html;
    }

    function buildBACK(comment) {
      var html = `
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
                      <div class="message-icon-right margin-right">
                        <a href="/items/${comment.item_id}/comments/${comment.id}/edit" id="edit-switch" class="edit-btn">
                          <i class="material-icons">edit</i>
                        </a>
                      </div>
                    </div>
                 `
      return html;
    }

　//新規投稿
  $('#new_comment').on('submit', function(e){
    e.preventDefault();
    var wordCount =  $('#comment_send').val().length
    if (wordCount != 0){
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
        var html = buildNEW(data);
        $('.message-items').append(html)
        $('#comment_send').val('')
      })
      .fail(function(){
        alert('error');
      })
    }
  });

  //編集機能　編集画面表示
  $(document).on('click', '#edit-switch', function(e){
    e.preventDefault();
    var url = $(this).attr('href');
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json'
      })
      .done(function(data){
        console.log(data)
        var comment_id = '#' + data.id
        var html = buildEDIT(data)
        console.log(html, comment_id)
        $(comment_id).html(html).hide().show('slide')
      })
      .fail(function(){
        alert('error');
      })
  });

  //編集機能　更新
  $(document).on('click', '#comment-update', function(e){
    e.preventDefault();
    var wordCount =  $('#comment-edit').val().length
    if (wordCount != 0){
    var url = $(this).attr('href')
    var commentContent = $('#comment-edit').val();
      $.ajax({
        url: url,
        type: 'PATCH',
        data: {comment: commentContent},
        dataType: 'json'
      })
      .done(function(){
        $.ajax({
          url: url,
          type: 'GET',
          dataType: 'json'
        })
        .done(function(data){
          var commentId = '#' + data.id
          var html = buildBACK(data)
          console.log(html, commentId)
          $(commentId).html(html).hide().show('slide')
        })
          .fail(function(){
          alert('error');
        })
      })
      .fail(function(){
        alert('error');
      })
    }
  });

  //編集機能　削除
  $(document).on('click', '#comment-delete', function(e){
    e.preventDefault();
    var url = $(this).attr('href')
      $.ajax({
        url: url,
        type: 'DELETE',
        dataType: 'json'
      })
      .done(function(){
        window.location.href = '/items';
      })
      .fail(function(){
        alert('error');
      })
  });

  //編集機能　戻る
  $(document).on('click', '#comment-cancel', function(e){
    e.preventDefault();
    var url = $(this).attr('href');
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json'
      })
      .done(function(data){
        console.log(data)
        var comment_id = '#' + data.id
        var html = buildBACK(data)
        console.log(html, comment_id)
        $(comment_id).html(html).hide().show('slide')
      })
      .fail(function(){
        alert('error');
      })
  });
  });
});
