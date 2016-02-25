var config = {
	cities: {
		0: {
			name: 'London',
			GMT: 0,
			zone: 'Europe/London',
			img: 'img/london-night.jpg'
		},
		1: {
			name: 'Berlin',
			GMT: 1,
			zone: 'Europe/Berlin',
			img: 'img/berlin-night.jpg'
		},
		2: {
			name: 'Kyiv',
			GMT: 2,
			zone: 'Europe/Kiev'
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

// London +0
// Berlin +1
// Kyiv +2
// Victoria +4
// Bangkok +7
// Hong Kong +8
// Tokyo +9

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
	setInterval(setTime, 1000);
});

function detectMacOS() {
	return navigator.userAgent.indexOf('Mac OS X') != -1;
}

$(document).ready(function() {

	if (detectMacOS()) $('.hexagon').addClass('mac');
	else $('.hexagon').addClass('win') ;
	
	$(setTime());

	$('.hexagon').click(function() {
		var hex = $(this);
		var index = hex.attr('data-index');
		var duration = 250;
		$('.active').removeClass('active');
		hex.addClass('active');
		$('#watch').parent().animate({
			'top': '-=50px',
			'opacity': 0
		}, duration, 'swing', function() {
			zone = hex.attr('data-index');
			setTime();
			$('#watch').parent().css({
				'top': '+=100px'
			});
			$('#watch').parent().animate({
				'top': '-=50px',
				'opacity': 1
			}, duration, 'swing');
		});
		console.log(config.cities[index].img);
		if (config.cities[index].img) {
			$('.background-image').css({
				'background-image': 'url(\'' + config.cities[index].img + '\')'
			});
		}
	});
		// console.log();
});
