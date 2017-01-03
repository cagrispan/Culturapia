(function (angular) {
    'use strict';
    angular.module('culturapia.user')
        .controller('MyProfileCtrl', ['facebookAPI', '$location', 'webService', '$http', 'shareData', 'ModalService',
            function (facebookAPI, $location, webService, $http, shareData, ModalService) {

            var self = this;

            function init() {
                self.user = shareData.get('user');

                if (!self.user) {
                    ModalService.login().result.then(function () {
                        self.user = shareData.get('user');
                    });
                }
            }

            self.save = function () {
                self.user._save().then(function(){
                    $location.path('/my-home');
                });
            };

            self.getCep = function () {
                $http.get('https://viacep.com.br/ws/'+self.user.cep+'/json/', {})
                    .then(function(response){

                        if(response && response.data){
                            self.user.address = response.data.logradouro;
                            self.user.neighborhood = response.data.bairro;
                            self.user.city = response.data.localidade;
                            self.user.state = response.data.uf;
                        }else{
                            self.user.address = '';
                            self.user.neighborhood = '';
                            self.user.city = '';
                            self.user.state = '';
                        }

                    }, function (err) {
                        console.log(err);
                    });
            };

            init();

        }]);
})(angular);