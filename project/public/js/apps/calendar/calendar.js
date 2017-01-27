

(function($) {

    'use strict';

    $(document).ready(function() {

        var selectedEvent;

        $('#calendarId').pagescalendar({
            //Loading EVENTS 
            events: [{
                title: 'Workout',
                class: 'bg-success-lighter',
                start: '2016-12-07T06:00:00',
                end: '2016-12-07T09:00:24',
                other: {}
            }, {
                title: 'Click to edit',
                class: 'bg-success-lighter',
                start: '2016-12-06T06:00:00'
            }, {
                title: 'Eat',
                class: 'bg-complete-lighter',
                start: moment().startOf('week').add(1, 'days').add(2, 'hours').format(),
                end: moment().startOf('week').add(1, 'days').add(6, 'hours').format(),
                other: {
                    //custom list of attributes here
                    note: 'test'
                }
            }, {
                title: "Click and 'Drag'",
                class: 'bg-success-lighter',
                start: moment().startOf('week').add(2, 'days').add(2, 'hours').format(),
                end: moment().startOf('week').add(2, 'days').add(3, 'hours').format(),
                other: {
                    //custom list of attributes here
                    note: 'test'
                }
            }, ],
            view:"week",
            onViewRenderComplete: function() {
                //AJAX here and update 
            },
            onEventClick: function(event) {
                //Open Pages Custom Quick View
                if (!$('#calendar-event').hasClass('open'))
                    $('#calendar-event').addClass('open');


                selectedEvent = event;
                setEventDetailsToForm(selectedEvent);
            },
            onEventDragComplete: function(event) {
                selectedEvent = event;
                setEventDetailsToForm(selectedEvent);

            },
            onEventResizeComplete: function(event) {
                selectedEvent = event;
                setEventDetailsToForm(selectedEvent);
            },
            onTimeSlotDblClick: function(timeSlot) {
                $('#calendar-event').removeClass('open');
                //Adding a new Event on Double Click
                var newEvent = {
                    title: 'New Event',
                    class: 'bg-success-lighter',
                    start: timeSlot.date,
                    end: moment(timeSlot.date).add(1, 'hour').format(),
                    allDay: false,
                    other: {
                        //custom list of attributes here
                        note: 'test'
                    }
                };
                selectedEvent = newEvent;
                $('#calendarId').pagescalendar('addEvent', newEvent);
                setEventDetailsToForm(selectedEvent);
            }
        });
        //console.log($('body').pagescalendar('getEvents'))
        //console.log($('body').pagescalendar('getDate','MMMM'));

        function setEventDetailsToForm(event) {
            $('#eventIndex').val();
            $('#txtEventName').val();
            $('#txtEventCode').val();
            $('#txtEventLocation').val();
            //Show Event date
            $('#event-date').html(moment(event.start).format('MMM, D dddd'));

            $('#lblfromTime').html(moment(event.start).format('h:mm A'));
            $('#lbltoTime').html(moment(event.end).format('H:mm A'));

            //Load Event Data To Text Field
            $('#eventIndex').val(event.index);
            $('#txtEventName').val(event.title);
            $('#txtEventCode').val(event.other.code);
            $('#txtEventLocation').val(event.other.location);
        }

        $('#eventSave').on('click', function() {
            selectedEvent.title = $('#txtEventName').val();

 
            selectedEvent.other.code = $('#txtEventCode').val();
            selectedEvent.other.location = $('#txtEventLocation').val();
            selectedEvent.other.description = $('#txtEventDesc').val();

            $('#calendarId').pagescalendar('updateEvent',selectedEvent);

            $('#calendar-event').removeClass('open');
        });

        $('#eventDelete').on('click', function() {
            $('#calendarId').pagescalendar('removeEvent', $('#eventIndex').val());
            $('#calendar-event').removeClass('open');
        });
    });

})(window.jQuery);