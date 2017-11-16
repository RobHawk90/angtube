(function () {

  angular
    .module('videos')
    .controller('VideoController', [
      'youTubeAPI', '$scope', '$mdSidenav', '$mdMedia', '$sce', '$mdDialog',
      VideoController
    ]);

  function VideoController(youTubeAPI, $scope, $mdSidenav, $mdMedia, $sce, $mdDialog) {
    $scope.selected = null;
    $scope.videos = [];
    $scope.select = select;
    $scope.embedId = '';
    $scope.query = '';
    $scope.nextPageToken = '';
    $scope.searchFormPosition = 'center-screen';
    $scope.toggleList = toggleList;
    $scope.loadThumbnail = loadThumbnail;
    $scope.search = search;
    $scope.loadMore = loadMore;
    $scope.shouldOpenList = shouldOpenList;

    function toggleList() {
      $mdSidenav('left').toggle();
    }

    function select(video) {
      $scope.embedId = video.id.videoId;
      youTubeAPI.findVideoById(video.id.videoId)
        .then(function (selected) {
          
          $scope.selected = selected;
        })
        .catch(function (err) {
          showAlert(err);
        });
    }

    function loadThumbnail(video, size) {
      if (video) {
        size = size || 'default';
        return $sce.trustAsUrl(video.snippet.thumbnails[size].url);
      }
    }

    function search(query) {
      youTubeAPI.searchVideos(query)
        .then(function (res) {
          $scope.videos = res.items;
          $scope.nextPageToken = res.nextPageToken;
          $scope.searchFormPosition = 'original-position';
          $mdSidenav('left').open();
        })
        .catch(function (err) {
          showAlert(err);
        });
    }

    function loadMore(query, nextPageToken) {
      youTubeAPI.searchVideos(query, nextPageToken)
        .then(function (res) {
          $scope.videos = $scope.videos.concat(res.items);
          $scope.nextPageToken = res.nextPageToken;
        })
        .catch(function (err) {
          console.log(err);
        });
    }

    function shouldOpenList() {
      var larger = $mdMedia('gt-sm') && $scope.videos.length;
      var smaller = ($mdMedia('xs') || $mdMedia('sm')) && $scope.videos.length && !$scope.selected;
      return larger || smaller;
    }

    function showAlert(message) {
      var alert = $mdDialog.alert({
        title: '',
        textContent: message,
        ok: 'OK'
      });

      $mdDialog
        .show(alert)
        .finally(function () {
          alert = undefined;
        });
    }
  }

})();
