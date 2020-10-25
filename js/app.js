"use strict";

var show = function show(state) {
  document.getElementById('log-in').style.display = state;
  document.getElementById('filter').style.display = state;
};

$(document).ready(function () {
  $('.header__burger').click(function (event) {
    $('.header__burger,.header__ul').toggleClass('active');
  });
});
var swiper = new Swiper('.swiper-container', {
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
    clichable: true
  }
});
$(document).ready(function () {
  $(".loader-wrap").addClass("hide"); //animation

  AOS.init();
});