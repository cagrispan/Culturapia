'use strict';
angular.module('utils')
    .service('like', ['webService', function (webService) {

        var self = this;

        self.like = function (content, user) {

            var likedContent = {
                photoId: 0,
                videoId: 0,
                audioId: 0,
                noticeId: 0
            };

            for (var prop in content) {
                if (likedContent.hasOwnProperty(prop)) {
                    likedContent[prop] = content[prop];
                }
            }

            likedContent.userId = user.userId;

            return webService.post('/users/' + user.userId + '/likes', likedContent, {token:user.token})
                .catch(function (err) {
                    console.log('Like Service Error');
                    console.log(err);
                });

        };

        self.verifyLiked = function(itemArray, userId) {
            for (var i in itemArray) {
                itemArray[i].likedByUser = false;
                for (var j in itemArray[i].likes) {
                    if (itemArray[i].likes[j].userId === userId) {
                        itemArray[i].likedByUser = true;
                    }
                }
            }
        };

    }]);


