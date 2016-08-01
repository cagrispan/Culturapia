/**
 * Created by Carlos on 23/07/2016.
 */
angular.module('culturapia')
    .run(['$rootScope', '$window', 'faceAPI',
        function ($rootScope, $window, faceAPI) {

            $rootScope.user = {};

            $window.fbAsyncInit = function () {
                // Executed when the SDK is loaded

                FB.init({
                    appId: '221434191591128',
                    channelUrl: 'app/channel.html',
                    status: true,
                    cookie: true,
                    xfbml: true,
                    version: 'v2.7'
                });

                faceAPI.watchLoginChange();

            };

            (function (d) {

                var js,
                    id = 'facebook-jssdk',
                    ref = d.getElementsByTagName('script')[0];

                if (d.getElementById(id)) {
                    return;
                }

                js = d.createElement('script');
                js.id = id;
                js.async = true;
                js.src = "//connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v2.7&appId=221434191591128";

                ref.parentNode.insertBefore(js, ref);

            }(document));

        }]);