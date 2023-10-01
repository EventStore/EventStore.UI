/*jshint bitwise: false*/
define(['./_module'], function (app) {

    'use strict';
    return app.factory('Base64', [ 'MessageService', function (msg) {
        var utf8Encoder = new TextEncoder('utf-8');
        var utf8Decoder = new TextDecoder('utf-8');

        return {
            encode: function (input) {
                var utf8Bytes = utf8Encoder.encode(input);
                var binString = String.fromCodePoint(...utf8Bytes);
                return btoa(binString);
            },
            decode: function (input) {
                // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
                var base64test = /[^A-Za-z0-9\+\/\=]/g;
                if (base64test.exec(input)) {
                    msg.failure('There were invalid base64 characters in the input text.\n' +
                        'Valid base64 characters are A-Z, a-z, 0-9, \'+\', \'/\',and \'=\'\n' +
                        'Expect errors in decoding.');
                }

                var binString = atob(input);
                var utf8Bytes = Uint8Array.from(binString, (m) => m.codePointAt(0));
                return utf8Decoder.decode(utf8Bytes);
            }
        };
    }]);
});