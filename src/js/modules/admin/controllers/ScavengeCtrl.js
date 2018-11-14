define(['./_module'], function (app) {

    'use strict';

    return app.controller('ScavengeCtrl', [
        '$scope', '$state', 'AdminService', 'MessageService', 'poller', 'constants',
        function ($scope, $state, adminService, msg, poller, constants) {
            $scope.pagination = {
                pageNumber: $state.params.page,
                fromEventNumber: $state.params.from,
                pageSize: 20,
                canGoForward: function() {
                    return $scope.pagination.lastEventPos > 0;
                },
                canGoBackward: function() {
                    return $scope.pagination.pageNumber > 0;
                }
            };
            $scope.scavengeInfo = [];
            $scope.scavengeId = $state.params.scavengeId;
            var scavengeInfoPoller = null;

            $scope.pageForward = function() {
                if(!$scope.pagination.canGoForward()) {
                    return;
                }
                var nextPage = $scope.pagination.pageNumber + 1;
                var fromEvent = $scope.pagination.lastEventPos - 1;
                $state.go('scavenge', {scavengeId: $scope.scavengeId, page: nextPage, from: fromEvent});
            };

            $scope.pageBackward = function() {
                if(!$scope.pagination.canGoBackward()) {
                    return;
                }
                var prevPage = $scope.pagination.pageNumber - 1;
                var fromEvent = $scope.pagination.firstEventPos + $scope.pagination.pageSize;
                $state.go('scavenge', {scavengeId: $scope.scavengeId, page: prevPage, from: fromEvent});
            };

            function getPage() {
                if($scope.pagination.pageNumber === 0) {
                    $scope.pagination.fromEventNumber = 'head';
                    scavengeInfoPoller = poller.create({
    			        interval: constants.scavengeStatus.pollInterval,
    			        action: adminService.scavengeInfo,
    			        params: [$scope.scavengeId, $scope.pagination.fromEventNumber, $scope.pagination.pageSize]
    			    });
    			    scavengeInfoPoller.start();
        			scavengeInfoPoller.promise.then(null, null, function(res) {
                        getScavengeInfo(res.entries);
                    });
                } else {
                    adminService.scavengeInfo($scope.scavengeId, $scope.pagination.fromEventNumber, $scope.pagination.pageSize).then(function(res) {
                        getScavengeInfo(res.data.entries);
                    });
                }
            }

            function getScavengeInfo(entries) {
                if(entries.length > 0) {
                    var lastEvent = entries[entries.length - 1];
                    var firstEvent = entries[0];
                    $scope.nodeEndpoint = JSON.parse(firstEvent.data).nodeEndpoint;
                    $scope.pagination.firstEventPos = firstEvent.positionEventNumber;
                    $scope.pagination.lastEventPos = lastEvent.positionEventNumber;
                }
                mapScavengeInfo(entries);
            }

            function mapScavengeInfo(entries) {
                var info = [];
                for(var i = 0; i < entries.length; i++) {
                    var entry = entries[i];
                    var result;
                    switch (entry.eventType) {
                        case '$scavengeStarted': {
                            info.push({
                                status: 'Started',
                                type: entry.EventType
                            });
                            break;
                        } 
                        case '$scavengeChunksCompleted': {
                            var indexData = JSON.parse(entry.data);
                            result = 'No chunks scavenged';
                            if(indexData.wasScavenged) {
                                var chunksScavenged = indexData.chunkEndNumber - indexData.chunkStartNumber + 1;
                                result = chunksScavenged + ' chunk(s) scavenged';
                            }
                            if (indexData.errorMessage) {
                                result = 'Error: ' + indexData.errorMessage;
                            }
                            info.push({
                                status: 'Scavenging chunks ' + indexData.chunkStartNumber + ' - ' +
                                            indexData.chunkEndNumber + ' complete',
                                timeTaken: indexData.timeTaken,
                                spaceSaved: indexData.spaceSaved,
                                type: entry.eventType,
                                result: result
                            });
                            break;
                        } 
                        case '$scavengeMergeCompleted': {
                            var indexData = JSON.parse(entry.data);
                            result = 'No chunks merged';
                            if(indexData.wasMerged) {
                                var chunksScavenged = indexData.chunkEndNumber - indexData.chunkStartNumber + 1;
                                result = chunksScavenged + ' chunk(s) merged';
                            }
                            if (indexData.errorMessage) {
                                result = 'Error: ' + indexData.errorMessage;
                            }
                            info.push({
                                status: 'Merging chunks ' + indexData.chunkStartNumber + ' - ' +
                                            indexData.chunkEndNumber + ' complete',
                                timeTaken: indexData.timeTaken,
                                spaceSaved: indexData.spaceSaved,
                                type: entry.eventType,
                                result: result
                            });
                            break;
                        } 
                        case '$scavengeIndexCompleted': {
                            var indexData = JSON.parse(entry.data);
                            result = 'Index table not scavenged';
                            if(indexData.wasScavenged) {
                                result = indexData.entriesDeleted + ' index entries scavenged';
                            }
                            if (indexData.errorMessage) {
                                result = 'Error: ' + indexData.errorMessage;
                            }
                            var tableIndexId = '(' + indexData.level + ',' + indexData.index + ')';
                            info.push({
                                status: 'Scavenging index table ' + tableIndexId + ' complete',
                                timeTaken: indexData.timeTaken,
                                spaceSaved: indexData.spaceSaved,
                                type: entry.eventType,
                                result: result
                            });
                            break;
                        } 
                        case '$scavengeCompleted': {
                            var data = JSON.parse(entry.data);
                            result = data.result;
                            if(data.result === 'Failed') {
                                result += ': ' + data.error;
                            }
                            info.push({
                                status: 'Completed',
                                timeTaken: data.timeTaken,
                                spaceSaved: data.spaceSaved,
                                type: entry.EventType,
                                result: result
                            });
                        }
                    }
                $scope.scavengeInfo = info;
                }
            }

            getPage();

            $scope.$on('$destroy', function() {
                if(scavengeInfoPoller) {
                    scavengeInfoPoller.stop();
                }
            });
        }
    ]);
});
