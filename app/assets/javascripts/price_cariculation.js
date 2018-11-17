$(function($){
  $('#input-price').keyup(function(){
    //入力値を変数に代入
    var numA = $('#input-price').val();
    //parseIntで文字列→数値
    numA = parseInt(numA);
    //左側の入力値が数値では無い場合の処理
    if(!numA){
      //計算結果表示のinput内を削除
      $('#input-price').val('');
      return false;
    };
    //計算結果
    var fee = Math.floor(numA*0.1)
    var benefit = Math.floor(numA*0.9)
    $('#sales-fee').text('¥'+fee);
    $('#sales-benefit').text('¥'+benefit);
  });
});