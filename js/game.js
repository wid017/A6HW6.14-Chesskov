const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let secondHitTime = 0;

function round() {
  $(".game-field").removeClass("target");// FIXME: надо бы убрать "target" прежде чем искать новый
  deleteText ();//MY: удалить текст на всех полях, кроме "target"
  let divSelector = randomDivId();
  $(divSelector).removeClass('miss');//MY убрать "miss" на выбранном рандомно поле
  $(divSelector).addClass("target");
  $(divSelector).text(hits + 1);// TODO: помечать target текущим номером
  if (hits === maxHits) {
    endGame();
  }
}

function endGame() {
  $('.line').addClass('off');// FIXME: спрятать игровое поле сначала
  let totalPlayedMillis = getTimestamp()- firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  $(".game-field").removeClass("miss");
  $(event.target).text('');// FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hits = hits + 1;
  } else {
      $(event.target).addClass('miss')// TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
      hits = hits - 1;
    }
  round();
}

function deleteText () {
 if(!$(".game-field").hasClass('target')) {
  $(".game-field").text('');
  }
}


function buttonStart (event) {
  firstHitTime = getTimestamp(); // FIXME: тут надо определять при первом клике firstHitTime
  round();
  $(".game-field").click(handleClick);
  $('#button-start').prop('disabled', true);
}

function init() {
  $('#button-start').click(buttonStart);// TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  $("#button-reload").click(function() {
    location.reload();
  });
}


$(document).ready(init);