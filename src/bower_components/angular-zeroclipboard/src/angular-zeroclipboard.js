angular.module('zeroclipboard', [])
  .provider('uiZeroclipConfig', function() {
    // default configs
    var _zeroclipConfig = {
        buttonClass: '',
        swfPath: "ZeroClipboard.swf",
        trustedDomains: [window.location.host],
        cacheBust: true,
        forceHandCursor: false,
        zIndex: 999999999,
        debug: true,
        title: null,
        autoActivate: true,
        flashLoadTimeout: 30000,
        hoverClass: "zeroclipboard-is-hover",
        activeClass: "zeroclipboard-is-active"
    };
    this.setZcConf = function(zcConf) {
      angular.extend(_zeroclipConfig, zcConf);
    };
    this.$get = function() {
      return {
        zeroclipConfig: _zeroclipConfig
      };
    };
  })

  .directive('uiZeroclip', ['$document', '$window', 'uiZeroclipConfig',
      function($document, $window, uiZeroclipConfig) {
        var zeroclipConfig = uiZeroclipConfig.zeroclipConfig || {};
        var ZeroClipboard = $window.ZeroClipboard;

        return {
          scope: {
            onCopied: '&zeroclipCopied',
            onError: '&?zeroclipOnError',
            client: '=?uiZeroclip',
            value: '=zeroclipModel',
            text: '@zeroclipText'
          },
          link: function(scope, element, attrs) {
            // config
            ZeroClipboard.config(zeroclipConfig);
            var btn = element[0];

            if (angular.isFunction(ZeroClipboard)) {
              scope.client = new ZeroClipboard(btn);
            }

            scope.$watch('value', function(v) {
              if (v === undefined) {
                return;
              }
              element.attr('data-clipboard-text', v);
            });

            scope.$watch('text', function(v) {
              element.attr('data-clipboard-text', v);
            });

            scope.client.on('aftercopy', _completeHnd = function(e) {
              scope.$apply(function() {
                scope.onCopied({$event: e});
              });
            });

            scope.client.on('error', function(e) {
              if (scope.onError) {
                scope.$apply(function() {
                  scope.onError({$event: e});
                });
              }
              ZeroClipboard.destroy();
            });

            scope.$on('$destroy', function() {
              scope.client.off('complete', _completeHnd);
            });
          }
        };
      }
  ]);
