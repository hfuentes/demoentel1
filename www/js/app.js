// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers']).run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
}).config(function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'AppCtrl'
    })
    //pagina inicio con opciones
    .state('app.inicio', {
        url: '/inicio',
        views: {
            'menuContent': {
                templateUrl: 'templates/inicio.html',
                controller: 'InicioCtrl'
            }
        }
    })
    //controlador detalle pedido
    .state('app.detalle', {
        url: '/detalle',
        views: {
            'menuContent': {
                templateUrl: 'templates/detalle.html',
                controller: 'DetalleCtrl'
            }
        }
    })
    //controlador confirmar pedido
    .state('app.confirmar', {
        url: '/confirmar',
        views: {
            'menuContent': {
                templateUrl: 'templates/confirmar.html',
                controller: 'ConfirmarCtrl'
            }
        }
    })
    //controlador vista llamame
    .state('app.llamame', {
        url: '/llamame',
        views: {
            'menuContent': {
                templateUrl: 'templates/llamame.html',
                controller: 'LlamameCtrl'
            }
        }
    })
    //controlador vista perfil
    .state('app.perfil', {
        url: '/perfil',
        views: {
            'menuContent': {
                templateUrl: 'templates/perfil.html',
                controller: 'PerfilCtrl'
            }
        }
    })
    //controlador vista mapa sucursales
    .state('app.mapa', {
        url: '/mapa',
        views: {
            'menuContent': {
                templateUrl: 'templates/mapa.html',
                controller: 'MapaCtrl'
            }
        }
    });
    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/inicio');
});