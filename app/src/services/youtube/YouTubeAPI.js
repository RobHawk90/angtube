(function () {
  'use strict';

  angular.module('youTube')
    .service('youTubeAPI', ['API_KEY', '$http', '$q', YouTubeAPI]);

  function YouTubeAPI(API_KEY, $http, $q) {
    var api = {};

    api.searchVideos = function (query, pageToken) {
      var queryBuilder = new QueryBuilder(API_KEY).search(query).withMaxResults(5);

      if (pageToken)
        queryBuilder.withPageToken(pageToken);

      return $q(function (resolve, reject) {
        $http.get(queryBuilder.build())
          .then(function (res) {
            if (res.data.items.length)
              resolve(res.data);
            else
              reject('Não foi possível encontrar vídeos sobre "' + query + '"');
          }, function (err) {
            var reasons = err.data.error.errors.reduce(function (prev, next) {
              return prev + ' ' + next.reason + ',';
            }, '');
            reject("Ocorreu um erro ao tentar buscar vídeos:" + reasons);
          });
      });
    };

    api.findVideoById = function (id) {
      var queryBuilder = new QueryBuilder(API_KEY).videos(id);

      return $q(function (resolve, reject) {
        $http.get(queryBuilder.build())
          .then(function (res) {
            var selected = res.data.items[0];
            selected.snippet.description = selected.snippet.description.replace(/\n/g, '<br>');
            resolve(selected);
          }, function (err) {
            reject(err);
          });
      });
    };

    return api;
  }

  function QueryBuilder(apiKey) {
    var self = this;

    self.baseUrl = 'https://www.googleapis.com/youtube/v3/';
    self.param = '';
    self.maxResults = '';
    self.pageToken = '';

    self.search = function (query) {
      self.param = 'search?part=id,snippet&q=' + query;
      return self;
    };

    self.videos = function (id) {
      self.param = 'videos?part=snippet,statistics&id=' + id;
      return self;
    };

    self.withMaxResults = function (num) {
      self.maxResults = '&maxResults=' + num;
      return self;
    };

    self.withPageToken = function (pageToken) {
      self.pageToken = '&pageToken=' + pageToken;
      return self;
    };

    self.build = function () {
      return self.baseUrl + self.param + self.maxResults + self.pageToken + '&key=' + apiKey;
    };
  }

})();
