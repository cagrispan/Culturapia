'use strict';
angular.module('utils')
    .service('like', ['webService', function (webService) {

        var self = this;

        self.like = function (content, user) {

            var likedContent = {
                photoId: -1,
                videoId: -1,
                audioId: -1,
                noticeId: -1,
                eventId: -1,                
                bandId: -1
            };

            for (var prop in content) {
                if (likedContent.hasOwnProperty(prop)) {
                    likedContent[prop] = content[prop];
                }
            }

            likedContent.userId = user.userId;
            likedContent.city = user.city;
            likedContent.state = user.state;
            likedContent.neighborhood = user.neighborhood;

            return webService.post('/users/' + user.userId + '/likes', likedContent, {token:user.token})
                .catch(function (err) {
                    console.log('Like Service Error');
                    console.log(err);
                });

        };

        self.verifyLiked = function(itemArray, userId) {
            for (var i in itemArray) {
                itemArray[i].likedByUser = self.verifyItem(itemArray[i], userId);
            }
        };

        self.verifyItem = function (item, userId) {
            for (var j in item.likes) {
                if (item.likes[j].userId === userId) {
                    return true;
                }
            }
            return false;
        };

    }]);


