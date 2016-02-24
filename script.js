
var config = {
  cities: {
    0: {
      name: 'London',
      GMT: 0,
      zone: 'Europe/London'
    },
    1: {
      name: 'Berlin',
      GMT: 1,
      zone: 'Europe/Berlin'
    },
    2: {
      name: 'Kyiv',
      GMT: 2,
      zone: 'Europe/Kyiv'
    },
    3: {
      name: 'Victoria',
      GMT: 4,
      zone: 'Indian/Mahe'
    },
    4: {
      name: 'Bangkok',
      GMT: 7,
      zone: 'Asia/Bangkok'
    },
    5: {
      name: 'Hong Kong',
      GMT: 8,
      zone: 'Asia/Hong_Kong'
    },
    6: {
      name: 'Tokyo',
      GMT: 9,
      zone: 'Asia/Tokyo'
    }
  }
};

var zone = 3;

function setTime() {
  var time = moment();
  var zoneTime = time.tz(config.cities[zone].zone);
  $('#hour1').html(zoneTime.format('HH')[0]);
  $('#hour2').html(zoneTime.format('HH')[1]);
  $('#minute1').html(zoneTime.format('mm')[0]);
  $('#minute2').html(zoneTime.format('mm')[1]);
  $('#second1').html(zoneTime.format('ss')[0]);
  $('#second2').html(zoneTime.format('ss')[1]);
}

$(function() {
  setInterval(setTime, 100);
});

// London +0
// Berlin +1
// Kyiv +2
// Victoria +4
// Bangkok +7
// Hong Kong +8
// Tokyo +9

$( document ).ready(function(){

  $(setTime());

  $('.hexagon').click(function(){
    $('.active').removeClass('active');
    $(this).addClass('active');
    zone = $(this).attr('data-index');
    setTime();
    // console.log($(this).attr('data-index'));
  });

});
