'use strict';

/* Controllers */
// define calander controller
angular.module('app')
    .controller('CalendarCtrl', ['$scope', '$stateParams', '$rootScope', function($scope, $stateParams, $rootScope) {
        // Apply theme for Calendar
        $scope.app.layout.theme = 'css/themes/calendar.css';

        // For demo purposes only. Changes the theme back to default when switching the state. 
        // $rootScope.$on('$stateChangeSuccess',
        //     function(event, toState, toParams, fromState, fromParams) {
        //         $scope.app.layout.theme = 'css/main.css';
        //     })

    }]);

/* Directives */
// defining custom directives we can call inside our frontend
// much like the built-in ones such as " ngBind, ngModel, and ngClass "
angular.module('app')
    .directive('pgCalendar', function() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                var selectedEvent;
                $(element).calendar({
                    //Loading Dummy EVENTS for demo Purposes----TODO feed events attribute from server
                    events: [{
                        title: 'Call Dave',
                        class: 'bg-success-lighter',
                        start: '2014-10-07T06:00:00',
                        end: '2014-10-07T08:00:24',
                        other: {}
                    }, {
                        title: 'Meeting Roundup',
                        class: 'bg-success-lighter',
                        start: '2014-11-07T06:00:00'
                    }, {
                        title: 'Double click Any where',
                        class: 'bg-complete-lighter',
                        start: moment().startOf('week').add(1, 'days').add(2, 'hours').format(),
                        end: moment().startOf('week').add(1, 'days').add(6, 'hours').format(),
                        other: {
                            //You can have your custom list of attributes here
                            note: 'test'
                        }
                    }, {
                        title: 'Drag Me',
                        class: 'bg-success-lighter',
                        start: moment().startOf('week').add(2, 'days').add(2, 'hours').format(),
                        end: moment().startOf('week').add(2, 'days').add(3, 'hours').format(),
                        other: {
                            //You can have your custom list of attributes here
                            note: 'test'
                        }
                    }, {
                        title: 'Click me',
                        class: 'bg-danger-lighter',
                        start: moment().startOf('week').add(2, 'days').add(5, 'hours').format(),
                        end: moment().startOf('week').add(2, 'days').add(6, 'hours').format(),
                        other: {
                            //You can have your custom list of attributes here
                            note: 'test'
                        }
                    }, ],
                    view: "week",
                    onViewRenderComplete: function() {
                        //You can Do a Simple AJAX here and update 
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
                        //Adding a new Event on Slot Double Click
                        $('#calendar-event').removeClass('open');
                        var newEvent = {
                            title: 'my new event',
                            class: 'bg-success-lighter',
                            start: timeSlot.date,
                            end: moment(timeSlot.date).add(1, 'hour').format(),
                            allDay: false,
                            other: {
                                //custom list of attributes here
                                note: 'testTTTT kappa123 lol PogChamp xD'
                            }
                        };
                        selectedEvent = newEvent;
                        $(element).calendar('addEvent', newEvent);
                        setEventDetailsToForm(selectedEvent);
                    }
                });

                // Other public methods that can be used :
                //console.log($('body').calendar('getEvents'))
                //get the value of a property
                //console.log($('body').calendar('getDate','MMMM'));

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

                    //You can add Any thing inside "other" object and it will get save inside the plugin.
                    //Refer it back using the same name other.your_custom_attribute

                    selectedEvent.other.code = $('#txtEventCode').val();
                    selectedEvent.other.location = $('#txtEventLocation').val();

                    $(element).calendar('updateEvent', selectedEvent);

                    $('#calendar-event').removeClass('open');
                });

                $('#eventDelete').on('click', function() {
                    $(element).calendar('removeEvent', $('#eventIndex').val());
                    $('#calendar-event').removeClass('open');
                });


            }
        }
    })