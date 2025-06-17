(function () {
    const app = angular.module("app");

    app.controller("HomeController", function ($scope, $http, $mensagem, $rootScope) {

        $scope.iniciar = function () {
            $scope.novaPostagem = {
                "dataCriacao": null,
                "curtidas": 0
            };
            $scope.publicacoes = [];
            $scope.idUsuarioLogado = sessionStorage.getItem("usuarioId");
            console.log($scope.idUsuarioLogado);
            $scope.listarPostagens();
        };

        $scope.publicarPostagem = function () {
            $rootScope.carregando = true;

            $http.post(`http://localhost:8080/posts/create?userId=${$scope.idUsuarioLogado}`, $scope.novaPostagem)
                .then(function (response) {
                    location.reload();
                })
                .catch(function (error) {
                    $mensagem.error("Erro salvar publicação!");
                }).finally(function () {
                    $rootScope.carregando = false;
                });
        };

        $scope.curtirPostagem = function (item) {
            if (!item.curtido) item.curtido = true;
            else
                item.curtido = false;
        };
        $scope.excluirPostagem = function (item) {
            $scope.publicacoes = $scope.publicacoes.filter(q => q != item);
        };

        $scope.listarPostagens = function () {
            $rootScope.carregando = true;

            $http.get('http://localhost:8080/posts')
                .then(function (response) {
                    $scope.publicacoes = response.data;
                })
                .catch(function (error) {
                    $mensagem.error("Erro ao buscar publicações!");
                }).finally(function () {
                    $rootScope.carregando = false;
                });
        }
    });
})();