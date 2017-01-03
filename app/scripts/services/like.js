'use strict';
angular.module('utils')
    .service('like', ['webService', function (webService) {

        var self = this;

        self.like = function (content, user) {

            var likedContent = {
                photoId: -1,
                videoId: -1,
                audioId: -1,
                noticeId: -1
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


