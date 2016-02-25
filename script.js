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
			zone: 'Europe/Kiev',
			img: 'img/kiev-night.jpg'
		},
		3: {
			name: 'Victoria',
			GMT: 4,
			zone: 'Indian/Mahe'
		},
		4: {
			name: 'Bangkok',
			GMT: 7,
			zone: 'Asia/Bangkok',
			img: 'img/bangkok-night.jpg'
		},
		5: {
			name: 'Hong Kong',
			GMT: 8,
			zone: 'Asia/Hong_Kong',
			img: 'img/hong_kong-night.jpg'
		},
		6: {
			name: 'Tokyo',
			GMT: 9,
			zone: 'Asia/Tokyo',
			img: 'img/tokyo-night.jpg'
		}
	},
	zone: 3,
	duration: 250,
	cityBG: setDefaults(lsGet('cityBG'), true)
};

// London +0
// Berlin +1
// Kyiv +2
// Victoria +4
// Bangkok +7
// Hong Kong +8
// Tokyo +9

function lsGet(string) {
	var temp = localStorage.getItem(string);
	if (temp === 'true') return true;
	else if (temp === 'false') return false;
	else return temp;
}

function setDefaults(val, def) {
	if (def === undefined) def = true;
	if (val === null) return def;
	else return val;
}

function setTime() {
	var time = moment();
	var zoneTime = time.tz(config.cities[config.zone].zone);
	// $('#hour1').html(zoneTime.format('HH')[0]);
	increment('#hour1', 'HH', 0);
	// $('#hour2').html(zoneTime.format('HH')[1]);
	increment('#hour2', 'HH', 1);
	// $('#minute1').html(zoneTime.format('mm')[0]);
	increment('#minute1', 'mm', 0);
	// $('#minute2').html(zoneTime.format('mm')[1]);
	increment('#minute2', 'mm', 1);
	// $('#second1').html(zoneTime.format('ss')[0]);
	increment('#second1', 'ss', 0);
	// $('#second2').html(zoneTime.format('ss')[1]);
	increment('#second2', 'ss', 1);
}

$(function() {
	setInterval(setTime, 1000);
});

function increment(id, format, index) {
	var time = moment();
	var zoneTime = time.tz(config.cities[config.zone].zone);

	$(id).clearQueue();
	if ($(id).html() != zoneTime.format(format)[index] && !$(id).is(':animated'))
		$(id).animate({
			'top': '+=50px',
			'opacity': 0
		}, config.duration, 'swing', function() {
			// config.zone = hex.attr('data-index');
			$(id).html(zoneTime.format(format)[index]);
			$(id).css({
				'top': '-=100px'
			});
			$(id).animate({
				'top': '+=50px',
				'opacity': 1
			}, config.duration, 'swing', function() {
				$(id).css({
					'top': '0'
				});
			});
		});
}

function detectMacOS() {
	return navigator.userAgent.indexOf('Mac OS X') != -1;
}

function changeBackground(index) {
	if (index === undefined) index = config.zone;
	setTimeout(function() {
		if (config.cities[index].img) {
			$('#background').css({
				'background-image': 'url(\'' + config.cities[index].img + '\')'
			});
		} else {
			$('#background').css({
				'background-image': 'url(\'' + 'img/default1.jpg' + '\')'
			});
		}
	}, config.duration - 50);
}

$(document).ready(function() {

	if (detectMacOS()) {
		$('.hexagon').addClass('mac');
		$('.name-separator').addClass('mac');
	} else {
		$('.hexagon').addClass('win');
		$('.name-separator').addClass('win');
	}

	$(setTime());
	if (config.cityBG !== null) {
		$('#cityBG').prop('checked', config.cityBG);
	}

	$('.hexagon').click(function() {
		if (!$(this).hasClass('active')) {
			var hex = $(this);
			var index = hex.attr('data-index');

			$('.active').removeClass('active');
			hex.addClass('active');
			config.zone = hex.attr('data-index');
			increment('#hour1', 'HH', 0);
			increment('#hour2', 'HH', 1);

			if (config.cityBG) {
				changeBackground(index);
			}

		}
	});

	$('#cityBG').click(function() {
		if ($(this).prop('checked')) {
			config.cityBG = true;
			localStorage.setItem('cityBG', true);
			changeBackground();
		} else {
			config.cityBG = false;
			localStorage.setItem('cityBG', false);
			$('#background').css({
				'background-image': 'url(\'' + 'img/default1.jpg' + '\')'
			});
		}

	});

	$(document).on("mousemove", function(event) {
		if (event.pageX < 20) {
			$('#drawer').addClass('open');
		} else if ($('#drawer').hasClass('open') && event.pageX > 250) {
			$('#drawer').removeClass('open');
		}
	});

	// console.log();
});