(function () {
  angular
    .module('angtube', ['ngMaterial', 'ngAnimate', 'youtube-embed', 'videos'])
    .config(function ($mdThemingProvider, $mdIconProvider) {
      $mdIconProvider.icon("menu", "./assets/svg/menu.svg", 24)

      $mdThemingProvider.theme('default')
        .primaryPalette('orange')
        .accentPalette('yellow');
    });
})();
