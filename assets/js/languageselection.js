"use strict";

var unilyLanguageSelection = {

	languageSelectorElementSelector: '#language-selector',
	languagesListElementSelector: '#languages',
	languageElementSelector: '#languages-list li a',

	assignCloseLanguagesEvents: function () {
		setTimeout(function () {
			$(unilyLanguageSelection.languageSelectorElementSelector).unbind();
			$(document).on('click', unilyLanguageSelection.hideLanguagesList);
		}, 100);
	},

	assignOpenLanguagesEvents: function () {
		setTimeout(function () {
			unilyLanguageSelection.assignLanguageSelectorClick();
			$(document).off('click', unilyLanguageSelection.hideLanguagesList);
		}, 100);
	},

	showLanguagesList: function () {
		$(unilyLanguageSelection.languagesListElementSelector).fadeIn();
		unilyLanguageSelection.assignCloseLanguagesEvents();
	},

	hideLanguagesList: function () {
		$(unilyLanguageSelection.languagesListElementSelector).fadeOut();
		unilyLanguageSelection.assignOpenLanguagesEvents();
	},

	assignLanguageSelectorClick: function () {
		$(unilyLanguageSelection.languageSelectorElementSelector).on('click', function (e) {
			e.preventDefault();
			unilyLanguageSelection.showLanguagesList();
		});
	},

	init: function () {
		unilyLanguageSelection.assignLanguageSelectorClick();
	}
}

unilyLanguageSelection.init();