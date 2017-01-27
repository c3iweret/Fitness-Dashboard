/* ============================================================
 * File: config.js
 * Configure routing
 * ============================================================ */
var calendar = angular.module('app.calendar',[]);
calendar.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',

        function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
            $urlRouterProvider
                .otherwise('/calendar');

            $stateProvider
            //      .state('app', {
            //          abstract: true,
            //         url: "/app",
            //          templateUrl: "templates/app.html"
            //      })
            //     .state('app.dashboard', {
            //         url: "/home",
            //         templateUrl: "templates/home.html",
            //         controller: 'HomeCtrl',
            //         resolve: {
            //             deps: ['$ocLazyLoad', function($ocLazyLoad) {
            //                 return $ocLazyLoad.load([
                                     
            //                             Load any ocLazyLoad module here
            //                             ex: 'wysihtml5'
            //                             Open config.lazyload.js for available modules
                                    
            //                         'jquery-ui'
            //                     ], {
            //                         insertBefore: '#lazyload_placeholder'
            //                     })
            //                     .then(function() {
            //                         return $ocLazyLoad.load([
            //                             'js/controllers/home.js'
            //                         ]);
            //                     });
            //             }]
            //         }
            //     });
                .state('calendar', {
                    url: '/calendar',
                    templateUrl: 'templates/calendar.html',
                    resolve: {
                    deps: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load([
                                'switchery',
                                'jquery-ui',
                                'moment',
                                'hammer'
                            ], {
                                insertBefore: '#lazyload_placeholder'
                            })
                            .then(function() {
                                return $ocLazyLoad.load([
                                    'js/calendar.min.js',
                                    'js/apps/calendar/calendar.js'
                                ])
                            });
                    }]
                }
            });
        }
    ]);