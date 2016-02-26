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
	ticker: setDefaults(lsGet('ticker'), 100),
	zone: 3,
	duration: 250,
	cityBG: setDefaults(lsGet('cityBG'), false),
	hideNames: setDefaults(lsGet('hideNames'), false),
	hideTZ: setDefaults(lsGet('hideTZ'), false)
};

// London +0
// Berlin +1
// Kyiv +2
// Victoria +4
// Bangkok +7
// Hong Kong +8
// Tokyo +9

function lsSet(name, value) {
	localStorage.setItem(name, value);
}

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

	incrementDate('#dayOfWeek', 'dddd');
	incrementDate('#dayOfMonth', 'Do');
	incrementDate('#month', 'MMMM');
	incrementDate('#year', 'YYYY');
	// $('#dayOfWeek').html(zoneTime.format('dddd'));
	// $('#dayAndMonth').html(zoneTime.format('Mo' + ' of ') + zoneTime.format('MMMM'));
	// $('#dayOfMonth').html(zoneTime.format('Mo'));
	// $('#month').html(zoneTime.format('MMMM'));
	// $('#year').html(zoneTime.format('YYYY'));
}

var clockwork;

function resetClockwork() {
	clearInterval(clockwork);
	clockwork = setInterval(setTime, config.ticker);
}

$(function() {
	clockwork = setInterval(setTime, 100);
	setTimeout(function(){
		resetClockwork();
	}, 1100);
});

function increment(id, format, index) {
	var time = moment();
	var zoneTime = time.tz(config.cities[config.zone].zone);

	$(id).clearQueue();
	if ($(id).html() != zoneTime.format(format)[index] && !$(id).is(':animated'))
		$(id).animate({
			'top': '+=30px',
			'opacity': 0
		}, config.duration, 'swing', function() {
			// config.zone = hex.attr('data-index');
			$(id).html(zoneTime.format(format)[index]);
			$(id).css({
				'top': '-=60px'
			});
			$(id).animate({
				'top': '+=30px',
				'opacity': 1
			}, config.duration, 'swing', function() {
				$(id).css({
					'top': '0'
				});
			});
		});
}

function incrementDate(id, format) {
	var time = moment();
	var zoneTime = time.tz(config.cities[config.zone].zone);

	$(id).clearQueue();
	if ($(id).html() != zoneTime.format(format) && !$(id).is(':animated'))
		$(id).animate({
			'top': '+=15px',
			'opacity': 0
		}, config.duration, 'swing', function() {
			// config.zone = hex.attr('data-index');
			$(id).html(zoneTime.format(format));
			$(id).css({
				'top': '-=30px'
			});
			$(id).animate({
				'top': '+=15px',
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
		$('body').addClass('mac');
	} else {
		$('body').addClass('win');
	}

 // Apply settings to UI;

	$(setTime());
	if (config.cityBG !== null) {
		$('#cityBG').prop('checked', config.cityBG);
	}
	if (config.hideNames !== null) {
		if (config.hideNames) $('.names').css({ opacity: 0 });
		else  $('.names').css({ opacity: 1 });
		$('#hideNames').prop('checked', config.hideNames);
	}
	if (config.hideTZ !== null) {
		if (config.hideTZ) $('.zones').css({ opacity: 0 });
		else  $('.zones').css({ opacity: 1 });
		$('#hideTZ').prop('checked', config.hideTZ);
	}
	$('#ticker').val(config.ticker);

	for (var i in config.cities) {
		$('.name[data-index=' + i + ']').html(config.cities[i].name);
		if (config.cities[i].GMT === 0)
		$('.zone[data-index=' + i + ']').html('<span style="font-size: 14px">UTC</span>');
		else
		$('.zone[data-index=' + i + ']').html('<span style="font-size: 14px">GMT</span> +' + config.cities[i].GMT);
	}


	// click handlers

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
			lsSet('cityBG', true);
			changeBackground();
		} else {
			config.cityBG = false;
			lsSet('cityBG', false);
			$('#background').css({
				'background-image': 'url(\'' + 'img/default1.jpg' + '\')'
			});
		}
	});

	$('#hideNames').click(function(){
		if ($(this).prop('checked')) {
			config.hideNames = true;
			lsSet('hideNames', true);
			$('.names').css({ opacity: 0 });
		} else {
			config.hideNames = false;
			lsSet('hideNames', false);
			$('.names').css({ opacity: 1 });
		}
	});

	$('#hideTZ').click(function(){
		if ($(this).prop('checked')) {
			config.hideTZ = true;
			lsSet('hideTZ', true);
			$('.zones').css({ opacity: 0 });
		} else {
			config.hideTZ = false;
			lsSet('hideTZ', false);
			$('.zones').css({ opacity: 1 });
		}
	});

	// hover handlers

	$('.selector').hover(function(){
		$('.zones').addClass('opaque');
		$('.names').addClass('opaque');
	}, function(){
		$('.zones').removeClass('opaque');
		$('.names').removeClass('opaque');
	});

	$('#ticker').change(function(){
		config.ticker = $(this).val();
		lsSet('ticker', $(this).val());
		resetClockwork();
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
