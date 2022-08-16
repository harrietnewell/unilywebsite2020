"use strict";

var unilyLanguageSelection = {

	languageSelectorElementSelector: '#language-selector',
	languagesListElementSelector: '#languages',
	isLanguagesListFocussed: false,

	showLanguagesList: function () {
		$(unilyLanguageSelection.languagesListElementSelector).fadeIn();
	},

	hideLanguagesList: function () {
		$(unilyLanguageSelection.languagesListElementSelector).fadeOut();
	},

	assignLanguageSelectorOpenEvents: function () {

		setTimeout(function () {

			$(unilyLanguageSelection.languageSelectorElementSelector).unbind();

			// Show list
			$(unilyLanguageSelection.languageSelectorElementSelector).on('click', function (e) {
				e.preventDefault();
				unilyLanguageSelection.showLanguagesList();
				unilyLanguageSelection.assignLanguageSelectorCloseEvents();
			});

			$(unilyLanguageSelection.languageSelectorElementSelector).on('mouseenter', function () {
				unilyLanguageSelection.showLanguagesList();
				unilyLanguageSelection.assignLanguageSelectorCloseEvents();
			});

		}, 100);
	},

	assignLanguageSelectorCloseEvents: function () {

		setTimeout(function () {

			$(unilyLanguageSelection.languageSelectorElementSelector).unbind();

			// Hide List
			$(unilyLanguageSelection.languageSelectorElementSelector).on('click', function (e) {
				e.preventDefault();
				unilyLanguageSelection.hideLanguagesList();
				unilyLanguageSelection.assignLanguageSelectorOpenEvents();
			});

			$(unilyLanguageSelection.languageSelectorElementSelector).on('mouseleave', function () {
				setTimeout(function () {
					if (!unilyLanguageSelection.isLanguagesListFocussed) {
						unilyLanguageSelection.hideLanguagesList();
						unilyLanguageSelection.assignLanguageSelectorOpenEvents();
					}
				}, 100);
			});

		}, 100);
	},

	assignDocumentClickCloseEvent: function () {

		$(document).on('click', function (e) {
			// Only run document click close code if this was NOT a click of the language selector
			if (!$.contains($(unilyLanguageSelection.languageSelectorElementSelector)[0], e.target)) {
				unilyLanguageSelection.hideLanguagesList();
				unilyLanguageSelection.assignLanguageSelectorOpenEvents();
			}
		});
	},

	assignListMouseEnterEvent: function () {

		$(unilyLanguageSelection.languagesListElementSelector).on('mouseenter', function (e) {
			console.log('visy visy!');
			unilyLanguageSelection.isLanguagesListFocussed = true;
		});
	},

	assignListMouseLeaveEvent: function () {

		// if visible list loses mouse focus, close it
		$(unilyLanguageSelection.languagesListElementSelector).on('mouseleave', function (e) {
			unilyLanguageSelection.isLanguagesListFocussed = false;
			unilyLanguageSelection.hideLanguagesList();
			unilyLanguageSelection.assignLanguageSelectorOpenEvents();
		});
	},

	init: function () {
		unilyLanguageSelection.assignLanguageSelectorOpenEvents();
		unilyLanguageSelection.assignDocumentClickCloseEvent();

		unilyLanguageSelection.assignListMouseEnterEvent();
		unilyLanguageSelection.assignListMouseLeaveEvent();
	}
}

unilyLanguageSelection.init();