/**
 * Created by Carlos on 28/07/2016.
 */

(function (angular) {
    'use strict';
    angular.module('culturapia.event').factory('Event', ['eventResource', function (eventResource) {

        Event.prototype.constructor = Event;

        function Event() {

            this.eventId = null;
            this.bandId = null;

            this.title = null;
            this.start = null;
            this.description = null;
            this.local = null;

            this.isReported = null;

            this._add = function (user) {
                var event = this;
                return eventResource.add(event, user)
                    .then(function (eventId) {
                        event.eventId = eventId;
                    });
            };

            this._loadByAdmin = function (admin) {
                var event = this;
                return eventResource.loadByAdmin(event, admin)
                    .then(function (response) {
                        event._set(response.event);
                    });
            };

            this._save = function (user) {
                var event = this;
                return eventResource.save(event, user)
                    .then(function (eventReturned) {
                        event._set(eventReturned);
                    });
            };

            this._remove = function (user) {
                var event = this;
                return eventResource.remove(event, user)
                    .then(function (eventReturned) {
                        event._set(eventReturned);
                    });
            };

            this._getLikes = function () {
                var event = this;
                return eventResource.getLikes(event)
                    .then(function (eventLikes) {
                        event.likes = eventLikes.likes;
                    });
            };

            this._set = function (data) {
                for (var ix in this) {
                    if (data && this.hasOwnProperty(ix)) {
                        if (data[ix] !== undefined) {
                            this[ix] = data[ix];
                        }
                    }
                }
                return this;
            }
        }

        Event.loadList = function (user) {
            return eventResource.getAll(user)
                .then(function (response) {
                    var eventList = [];

                    for (var i in response.events) {
                        var event = new Event();
                        event._set(response.events[i]);
                        event.start = setDate(event.start);
                        if (event.isReported === '0') {
                            eventList.push(event)
                        }
                    }

                    return eventList;
                });
        };

        Event.loadListByBand = function (band, user) {
            return eventResource.getAllByBand(band, user)
                .then(function (response) {

                    var eventList = [];

                    for (var i in response.events) {
                        var event = new Event();
                        event._set(response.events[i]);
                        event.start = setDate(event.start);
                        if (event.isReported === '0') {
                            eventList.push(event)
                        }
                    }

                    return eventList;
                });
        };

        var setDate = function (date) {
            if (date) {
                return new Date(date.replace(" ", "T") + '.000Z');
            }
            return null;
        };

        return Event;
    }]);
})(angular);

