angular.module('starter.controllers', []).controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //$scope.$on('$ionicView.enter', function(e) {
    //});
    // Form data for the login modal
    $scope.loginData = {};
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });
    // Triggered in the login modal to close it
    $scope.closeLogin = function() {
        $scope.modal.hide();
    };
    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };
    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
}).controller('PlaylistsCtrl', function($scope) {
    $scope.playlists = [{
        title: 'Reggae',
        id: 1
    }, {
        title: 'Chill',
        id: 2
    }, {
        title: 'Dubstep',
        id: 3
    }, {
        title: 'Indie',
        id: 4
    }, {
        title: 'Rap',
        id: 5
    }, {
        title: 'Cowbell',
        id: 6
    }];
}).controller('PlaylistCtrl', function($scope) {}).controller('PedidoCtrl', function($scope) {}).controller('DetalleCtrl', function($scope, $state) {
    $scope.model = {};
    //datos
    $scope.model.litrosList = [{
        label: "5 Lts",
        value: 5
    }, {
        label: "10 Lts",
        value: 10
    }, {
        label: "15 Lts",
        value: 15
    }, {
        label: "20 Lts",
        value: 20
    }];
    $scope.model.cantidadList = [{
        label: "1 Un.",
        value: 1
    }, {
        label: "2 Uns.",
        value: 2
    }, {
        label: "3 Uns.",
        value: 3
    }, {
        label: "4 Uns.",
        value: 4
    }, ];
    //valores por defecto
    var detalle_pedido = JSON.parse(window.localStorage['detalle_pedido'] || null);
    if (detalle_pedido) {
        $scope.model.litros = detalle_pedido.litros;
        $scope.model.cantidad = detalle_pedido.cantidad;
    } else {
        $scope.model.litros = $scope.model.litrosList[0];
        $scope.model.cantidad = $scope.model.cantidadList[0];
    }
    //metodo que guarda los datos en local antes de la confirmacion
    $scope.siguiente = function() {
        window.localStorage['detalle_pedido'] = JSON.stringify({
            litros: $scope.model.litros,
            cantidad: $scope.model.cantidad
        });
        $state.go('app.confirmar');
    };
}).controller('ConfirmarCtrl', function($scope, $ionicPopup, $state) {
    $scope.model = {};

    //obtiene detalle pedido guardado en local
    var detalle_pedido = JSON.parse(window.localStorage['detalle_pedido'] || null);
    if (detalle_pedido) {
        $scope.model.detalle_pedido = detalle_pedido;
    } else {
        $scope.model.litros = {
            label: "5 Lts",
            value: 5
        };
        $scope.model.cantidad = {
            label: "1 Un.",
            value: 1
        };
    }
    //metodo para confirmar datos
    $scope.confirmar = function() {
        var historico_pedido = JSON.parse(window.localStorage['historico_pedido'] || null);
        if (historico_pedido) {
            historico_pedido.push($scope.model.detalle_pedido);
            window.localStorage['historico_pedido'] = JSON.stringify(historico_pedido);
        } else {
            window.localStorage['historico_pedido'] = JSON.stringify([$scope.model.detalle_pedido]);
        }
        $scope.showAlert();
    };
    // An elaborate, custom popup
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Pedido confirmado!',
            template: '<h3><strong>Felicidades!</strong></h3><h3>Tu pedido ha sido enviado exitosamente.</h3><br><h4 class="text-right">Gracias por preferirnos!</h4>'
        }).then(function(res) {
            $state.go('app.pedido');
        });
    };
}).controller('LlamameCtrl', function($scope, $ionicPopup, $state) {
    $scope.llamame = function() {
        $ionicPopup.alert({
            title: 'Listo!',
            template: '<h3><strong>Felicidades!</strong></h3><p>Tu solicitud ha sido recepcionada por nuestros ejecutivos, en breve serás contactado!.</p><br><h4 class="text-right">Gracias por preferirnos!</h4>'
        }).then(function(res) {
            $state.go('app.pedido');
        });
    };
}).controller('PerfilCtrl', function($scope, $ionicPopup, $state) {
    $scope.model = {};
    $scope.model.perfil = {};
    var perfil = JSON.parse(window.localStorage['perfil'] || null);
    if (perfil) {
      $scope.model.perfil = perfil;
    }
    $scope.editar = function() {
        window.localStorage['perfil'] = JSON.stringify($scope.model.perfil);
        $ionicPopup.alert({
            title: 'Listo!',
            template: '<h3><strong>Felicidades!</strong></h3><p>Tus datos han sido modificados exitosamente!</p><br><h4 class="text-right">Gracias por preferirnos!</h4>'
        });
    };
});