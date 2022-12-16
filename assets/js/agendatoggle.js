"use strict";

var unilyAgendaToggle = {

    agendaToggleSelector: '[data-agenda-toggle]',
    agendaToggleOptionSelector: '.agenda-toggle-option',
    agendaToggleSlideSelector: '.agenda-toggle-slide',
    agendaToggleOptionSelectedClass: 'agenda-toggle-option-selected',
    agendaSelector: '.toggled-agenda',
    init: function init() {

        $(unilyAgendaToggle.agendaToggleSelector + ' a.agenda-toggle-option').on('click', function () {

            var selectedOption = $(this);
            $(unilyAgendaToggle.agendaSelector).hide();
            $(unilyAgendaToggle.agendaToggleOptionSelector).removeClass(unilyAgendaToggle.agendaToggleOptionSelectedClass);
            selectedOption.siblings(unilyAgendaToggle.agendaToggleSlideSelector).css('left', selectedOption[0].offsetLeft);
            selectedOption.addClass(unilyAgendaToggle.agendaToggleOptionSelectedClass);
            $('[data-toggled-agenda-id="' + selectedOption.attr('data-agenda-toggle-target-id') + '"]').show();
        });
    }
}

unilyAgendaToggle.init();