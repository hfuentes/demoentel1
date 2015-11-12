angular.module('starter.controllers', []).controller('AppCtrl', function($scope, $ionicModal, $timeout) {
    //nada
}).controller('InicioCtrl', function($scope) {
    //controlador seccion inicio
}).controller('DetalleCtrl', function($scope, $state) {
    $scope.model = {};
    //datos
    $scope.model.litrosList = [{
        label: "5 kilos",
        value: 5
    }, {
        label: "11 kilos",
        value: 11
    }, {
        label: "15 kilos",
        value: 15
    }, {
        label: "45 kilos",
        value: 45
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
    }, {
        label: "5 Uns.",
        value: 5
    }];
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
        //agregar a historico
        /*var historico_pedido = JSON.parse(window.localStorage['historico_pedido'] || null);
        if (historico_pedido) {
            historico_pedido.push($scope.model.detalle_pedido);
            window.localStorage['historico_pedido'] = JSON.stringify(historico_pedido);
        } else {
            window.localStorage['historico_pedido'] = JSON.stringify([$scope.model.detalle_pedido]);
        }*/
        $scope.showAlert();
    };
    // An elaborate, custom popup
    $scope.showAlert = function() {
        var alertPopup = $ionicPopup.alert({
            title: 'Pedido confirmado!',
            template: '<h3><strong>Felicidades!</strong></h3><h3>Tu pedido ha sido enviado exitosamente.</h3><br><h4 class="text-right">Gracias por preferirnos!</h4>'
        }).then(function(res) {
            $state.go('app.inicio');
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
}).controller('MapaCtrl', function($scope){
    $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
});
