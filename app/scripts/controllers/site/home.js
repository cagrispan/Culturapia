(function (angular) {
    'use strict';
    angular.module('culturapia')
        .controller('HomeCtrl', ['lists', 'ModalService', 'like', '$location', 'shareData', 'report', 'facebookAPI',
            function (lists, ModalService, like, $location, shareData, report, facebookAPI) {

            var self = this;

            function init(){
                self.user = shareData.get('user');

                self.states = lists.getStates();
                self.styles = lists.getStyles();
                self.getVideos();

                self.search = {};
                self.search.isDeleted = "0";
                self.search.isReported = "0";

                self.default = {
                    value: '',
                    state: '--Todos os Estados--',
                    city: '--Todas as Cidades--',
                    style: '--Todos os Estilos--'
                };
            }

            self.setState = function () {
                if (self.state) {
                    self.cities = self.states[self.state].cities;
                    self.search.state = self.state;
                } else {
                    self.cities = {};
                    self.search.state = '';
                }

            };

            self.openVideo = function (video) {
                ModalService.video(video).result
                    .then(function () {
                        init();
                    });
            };

            self.getVideos = function () {
                lists.getVideos()
                    .then(function (resolve) {
                        self.videos = resolve.data;
                        verifyLikedVideos();
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
            };

            function verifyLikedVideos() {
                for (var i in self.videos) {
                    self.videos[i].likedByUser = false;
                    for (var j in self.videos[i].likes) {
                        if (self.user && self.videos[i].likes[j].userId === self.user.userId) {
                            self.videos[i].likedByUser = true;
                        }
                    }
                }
            }

            self.feed = function (content) {
                facebookAPI.feed(content);
            };

            self.likedContent = function (content) {
                if (self.user) {
                    like.like(content, self.user)
                        .then(function () {
                            self.getVideos();
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                } else {
                    ModalService.login().result
                        .then(function () {
                            init();
                        });
                }
            };

            self.reportedContent = function (content) {
                if (self.user) {
                    report.report(content, self.user)
                        .then(function () {
                            self.getVideos();
                        })
                        .catch(function (err) {
                            console.log(err);
                        });
                } else {
                    ModalService.login().result
                        .then(function () {
                            init();
                        });
                }
            };

            init();


        }]);
})(angular);