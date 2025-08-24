var vital_signs = {
	wswm_vital_signs: null,
	unit: mb_utils.readCookie("wswm_cookie"),
	au_const: 149597870.691,
	mi_conversion: 0.621371,
	current_time: Math.floor(new Date().getTime() / 1000),
	init: function () {
		if (vital_signs.unit == null) {
			vital_signs.unit = "english";
			mb_utils.createCookie("wswm_cookie", vital_signs.unit, 1);
		} else if (vital_signs.unit == "english") {
			$(".slider_container").attr("aria-label", "Change table data from imperial to metric units")
		} else {
			$(".slider_container").attr("aria-label", "Change table data from metric to imperial units")
		}
		$(".unit_selection ." + vital_signs.unit).addClass("selected");
		setInterval('vital_signs.dist_controller()', 500);
		vital_signs.moveUnitSlider(false);
		vital_signs.initListeners();


	},
	initListeners: function () {
		var slides = [];
		var readouts = [];
		$('a').each(function () {
			slides.push($(this));
		})
		$('.readout').each(function () {
			readouts.push($(this));
		})
		console.log(slides);
		console.log(readouts);

		$('a').on("focus", function () {
			let currentSlide = $(".vital_signs_menu ul").slickCurrentSlide();
			$(this).parent().find('.readout').addClass("focused");
		})

		$('a').on("focusout", function () {
			let currentSlide = $(".vital_signs_menu ul").slickCurrentSlide();
			$(this).parent().find('.readout').removeClass("focused");
		})

		// change unit from english to metric
		$(".unit_selection").click(function () {
			vital_signs.unit = (vital_signs.unit == "english") ? "metric" : "english";
			vital_signs.changeUnit();
			vital_signs.moveUnitSlider();
		});
		$(".slider_container").on('keydown', function (e) {
			if (e.which == 13 || e.which == 32) {
				vital_signs.unit = (vital_signs.unit == "english") ? "metric" : "english";
				vital_signs.changeUnit();
				vital_signs.moveUnitSlider();
			}
		});
		//to fix issue with ul
		$(window).resize(function () {
			if ($(window).width() > 1360) {
				$(".vital_signs_menu ul").slickGoTo(0);
			}
			$('.vital_signs_menu ul')[0].slick.refresh();
		});
		$('a').on('keydown', function (e) {
			if (e.key === 'Tab' && e.shiftKey) {
				$(".vital_signs_menu ul").slickPrev();
			}
			else if (e.key === 'Tab') {
				if ($(window).width() <= 600) {
					if ($(".vital_signs_menu ul").slickCurrentSlide() < 7) {
						e.preventDefault();
						$(".vital_signs_menu ul").slickGoTo($(".vital_signs_menu ul").slickCurrentSlide() + 1);
						//console.log($(".vital_signs_menu ul").slickCurrentSlide());

						let nextSlide = slides[$(".vital_signs_menu ul").slickCurrentSlide()]
						console.log(nextSlide);
						nextSlide.trigger("focus");
					}
				}
				else {
					$(".vital_signs_menu ul").slickNext();
				}
			}
		});
	},
	display_controller: function () {
		document.getElementById('voy1_km').innerHTML = vital_signs.addCommas(Math.round(current_dist_km_v1) + display_unit);
		// document.getElementById('voy1_au').innerHTML = vital_signs.addCommas( current_dist_au_v1 ) + " AU";

		// document.getElementById('voy2_km').innerHTML = vital_signs.addCommas( Math.round(current_dist_km_v2) + display_unit );
		// document.getElementById('voy2_au').innerHTML = vital_signs.addCommas( current_dist_au_v2 ) + " AU";

		// document.getElementById('voy1_kms').innerHTML = vital_signs.addCommas( Math.round(current_dist_km_v1s) + display_unit );
		// document.getElementById('voy1_aus').innerHTML = vital_signs.addCommas( current_dist_au_v1s ) + " AU";

		// document.getElementById('voy2_kms').innerHTML = vital_signs.addCommas( Math.round(current_dist_km_v2s) + display_unit);
		// document.getElementById('voy2_aus').innerHTML = vital_signs.addCommas( current_dist_au_v2s ) + " AU";

		// document.getElementById('voy1_lt').innerHTML = vital_signs.formatSeconds(current_dist_lt_v1);
		// document.getElementById('voy2_lt').innerHTML = vital_signs.formatSeconds(current_dist_lt_v2);


		var v1SpeedElement = document.getElementById('voy1_speed');
		if (v1SpeedElement != null) {
			var v1Speed = current_speed_v1.toFixed(4);
			if (vital_signs.unit === "english") {
				v1Speed = current_speed_v1.toFixed(2);
			}
			v1SpeedElement.innerHTML = vital_signs.addCommas(v1Speed) + speed_display_unit;
		}

		var v2SpeedElement = document.getElementById('voy2_speed');
		if (v2SpeedElement != null) {
			var v2Speed = current_speed_v2.toFixed(4);
			if (vital_signs.unit === "english") {
				v2Speed = current_speed_v2.toFixed(2);
			}
			v2SpeedElement.innerHTML = vital_signs.addCommas(v2Speed) + speed_display_unit;
		}

	},
	dist_controller: function () {
		display_unit = " km";
		speed_display_unit = " kps";

		current_dist_km_v1 = (((vital_signs.current_time - epoch_0) / (epoch_1 - epoch_0)) * (dist_1_v1 - dist_0_v1)) + dist_0_v1;
		current_dist_au_v1 = (current_dist_km_v1 / vital_signs.au_const) + '';
		current_dist_au_v1 = current_dist_au_v1.split('.');
		current_dist_au_v1 = current_dist_au_v1[0] + '.' + current_dist_au_v1[1].substring(0, 8);

		current_dist_km_v2 = (((vital_signs.current_time - epoch_0) / (epoch_1 - epoch_0)) * (dist_1_v2 - dist_0_v2)) + dist_0_v2;
		current_dist_au_v2 = (current_dist_km_v2 / vital_signs.au_const) + '';
		current_dist_au_v2 = current_dist_au_v2.split('.');
		current_dist_au_v2 = current_dist_au_v2[0] + '.' + current_dist_au_v2[1].substring(0, 8);

		current_dist_km_v1s = (((vital_signs.current_time - epoch_0) / (epoch_1 - epoch_0)) * (dist_1_v1s - dist_0_v1s)) + dist_0_v1s;
		current_dist_au_v1s = (current_dist_km_v1s / vital_signs.au_const) + '';
		current_dist_au_v1s = current_dist_au_v1s.split('.');
		current_dist_au_v1s = current_dist_au_v1s[0] + '.' + current_dist_au_v1s[1].substring(0, 8);

		current_dist_km_v2s = (((vital_signs.current_time - epoch_0) / (epoch_1 - epoch_0)) * (dist_1_v2s - dist_0_v2s)) + dist_0_v2s;
		current_dist_au_v2s = (current_dist_km_v2s / vital_signs.au_const) + '';
		current_dist_au_v2s = current_dist_au_v2s.split('.');
		current_dist_au_v2s = current_dist_au_v2s[0] + '.' + current_dist_au_v2s[1].substring(0, 8);

		current_dist_lt_v1 = ((current_dist_km_v1 * 2 / 299792.458) / 2);
		current_dist_lt_v2 = ((current_dist_km_v2 * 2 / 299792.458) / 2);

		current_speed_v1 = 16.9995;
		current_speed_v2 = 15.3741;

		vital_signs.current_time += 0.5;
		vital_signs.display_controller();
	},
	addCommas: function (nStr) {
		nStr += '';
		x = nStr.split('.');

		x1 = x[0];
		x2 = x.length > 1 ? '.' + x[1] : '';

		var rgx = /(\d+)(\d{3})/;

		while (rgx.test(x1)) {
			x1 = x1.replace(rgx, '$1' + ',' + '$2');
		}
		return x1 + x2;
	},
	formatSeconds: function (num) {
		var hours = Math.floor(num / 3600);

		num -= (hours * 3600);

		var minutes = Math.floor(num / 60);

		num -= (minutes * 60);

		var seconds = Math.floor(num);

		if (hours < 10)
			hours = "0" + hours;
		if (minutes < 10)
			minutes = "0" + minutes;
		if (seconds < 10)
			seconds = "0" + seconds;

		return hours + ":" + minutes + ":" + seconds;
	},
	changeUnit: function () {
		$(".unit_selection > div").removeClass("selected");
		$(".unit_selection ." + vital_signs.unit).addClass("selected");
		mb_utils.createCookie("wswm_cookie", vital_signs.unit, 1);

		if (vital_signs.unit == "english") {
			$(".slider_container").attr("aria-label", "Table data is now in imperial units. Press again to switch back to metric units.")

			// Update screen reader values
			let voy1_val_earth = document.getElementById('voy1_km_sr').innerHTML.replace(/\D/g, "");
			let voy1_val_sun = document.getElementById('voy1_kms_sr').innerHTML.replace(/\D/g, "");
			let voy2_val_earth = document.getElementById('voy2_km_sr').innerHTML.replace(/\D/g, "");
			let voy2_val_sun = document.getElementById('voy2_kms_sr').innerHTML.replace(/\D/g, "");
			document.getElementById('voy1_km_sr').innerHTML = vital_signs.addCommas(Math.round(voy1_val_earth * vital_signs.mi_conversion) + " mi")
			document.getElementById('voy1_kms_sr').innerHTML = vital_signs.addCommas(Math.round(voy1_val_sun * vital_signs.mi_conversion) + " mi")
			document.getElementById('voy2_km_sr').innerHTML = vital_signs.addCommas(Math.round(voy2_val_earth * vital_signs.mi_conversion) + " mi")
			document.getElementById('voy2_kms_sr').innerHTML = vital_signs.addCommas(Math.round(voy2_val_sun * vital_signs.mi_conversion) + " mi")
		} else {
			$(".slider_container").attr("aria-label", "Table data is now in metric units. Press again to switch back to imperial units.")

			// Update screen reader values
			let voy1_val_earth = document.getElementById('voy1_km_sr').innerHTML.replace(/\D/g, "");
			let voy1_val_sun = document.getElementById('voy1_kms_sr').innerHTML.replace(/\D/g, "");
			let voy2_val_earth = document.getElementById('voy2_km_sr').innerHTML.replace(/\D/g, "");
			let voy2_val_sun = document.getElementById('voy2_kms_sr').innerHTML.replace(/\D/g, "");
			document.getElementById('voy1_km_sr').innerHTML = vital_signs.addCommas(Math.round(voy1_val_earth / vital_signs.mi_conversion) + " km")
			document.getElementById('voy1_kms_sr').innerHTML = vital_signs.addCommas(Math.round(voy1_val_sun / vital_signs.mi_conversion) + " km")
			document.getElementById('voy2_km_sr').innerHTML = vital_signs.addCommas(Math.round(voy2_val_earth / vital_signs.mi_conversion) + " km")
			document.getElementById('voy2_kms_sr').innerHTML = vital_signs.addCommas(Math.round(voy2_val_sun / vital_signs.mi_conversion) + " km")
		}
	},
	moveUnitSlider: function (animate) {
		if (animate == false) {
			if (vital_signs.unit == "english") {
				$(".slider_container .slider").css({
					"margin-left": "0"
				});
			} else if (vital_signs.unit == "metric") {
				$(".slider_container .slider").css({
					"margin-left": "14px"
				});
			}
			$(".slider_container").show();
			return false;
		}
		if (vital_signs.unit == "english") {
			$(".slider_container .slider").stop().animate({
				"margin-left": "0"
			});
		} else if (vital_signs.unit == "metric") {
			$(".slider_container .slider").stop().animate({
				"margin-left": "14px"
			});
		}
	}
};

$(function () {
	vital_signs.init();
});