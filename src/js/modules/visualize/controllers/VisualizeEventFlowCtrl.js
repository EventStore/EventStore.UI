define(['./_module'], function (app) {
    'use strict';

    return app.controller('VisualizeEventFlowCtrl', ['$scope','d3','StreamsService','MessageService',
		function VisualizeEventFlowCtrl($scope,d3,streamsService,msg) {
            $scope.causedByProperty = "$causedBy";
            $scope.tree = new CollapsibleTree(d3, "canvas", $scope);
            
            $scope.go = function(){
                $scope.tree.clearEvents();

                var streamDetails = {
                    streamId: "$bc-"+$scope.correlationId,
                    position: "0",
                    type: "forward",
                    count: "1000"
                }

                streamsService.streamEvents(streamDetails)
				.success(function (data) {
                    $scope.tree.addEvents(data.entries.reverse());
				})
				.error(function (err) {
					msg.failure('Correlation Id stream ('+streamDetails.streamId+') does not exist, please make sure that the $by_correlation_id projection is running');
				});
            }

		}]);
});

function CollapsibleTree(d3, div_id, scope){
    //Based on d3 collapsible tree: https://bl.ocks.org/mbostock/4339083
    var svg, root, tree;
    var collapsibleTree = this;

    var id = 0;
    var duration = 750;
    var canvas_id = div_id;
    var margin = {top: 20, right: 120, bottom: 20, left: 120};
    var canvasWidth = document.getElementById(canvas_id).clientWidth;
    var canvasHeight = document.getElementById(canvas_id).clientHeight;

    var width = canvasWidth - margin.right - margin.left;
    var height = canvasHeight - margin.top - margin.bottom;

    var allEvents = {};
    this.path = [];
    
    //Public functions
    this.draw = function(){
        d3.select("#"+canvas_id+" > *").remove();        
        tree = d3.layout.tree()
            .size([height, width]);

        svg = d3.select("#"+canvas_id).append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        root.x0 = height / 2;
        root.y0 = 0;

        d3.select(self.frameElement).style("height", "600px");
        this.makeRootNode(root);
    }

    this.collapseAll = function(){
        collapse(1,0);
    }

    this.expandAll = function(){
        collapse(Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER);
    }

    this.collapseReset = function(){
        collapse(40, 7);
    }

    this.makeRootNode = function(d){
        root = d;
        newpath = [];
        newpath.push(d);
        while(d._parent){
            d = d._parent;
            newpath.push(d);
        }
        this.path = newpath.reverse();
        collapsibleTree.collapseReset();
    }

    this.addEvents = function(events){
        for(var i in events){
            var event = events[i];
            allEvents[event.eventId] = {};
            allEvents[event.eventId].event = event;
            allEvents[event.eventId].name = event.eventType;
            allEvents[event.eventId]._children = [];
            allEvents[event.eventId]._parent = null;

            if(event.positionEventNumber == 0){
                root = allEvents[event.eventId];
                collapsibleTree.draw();
            }
            else{
                try{
                    var obj = JSON.parse(event.metaData);
                    var causedByProperty = scope.causedByProperty;
                    if(obj[causedByProperty]){
                        if(obj[causedByProperty] in allEvents){
                            allEvents[event.eventId]._parent = allEvents[obj[causedByProperty]];
                            allEvents[obj[causedByProperty]]._children.push(allEvents[event.eventId]);
                        }
                        else{
                            console.log("parent node not found: "+JSON.stringify(event));
                        }
                    }
                    else{
                        console.log("no $causedBy property: "+JSON.stringify(event));
                    }
                }
                catch(err){
                    console.log(err);
                }
            }
        }

        if(root){
            update(root);
        }
        else{
            console.log("root does not exist: "+JSON.stringify(event));
        }

        collapsibleTree.collapseReset();
    }

    this.clearEvents = function(){
        allEvents = {};
    }

    //Private functions
    var collapse = function(maxNodesPerLayer, maxDepth){
        var nodesPerLayer = {};
        function countNodesPerLayer(d, depth){
            if(!(depth in nodesPerLayer))
                nodesPerLayer[depth] = 0;
            nodesPerLayer[depth]++;
            if (d._children) {
                for(var i in d._children){
                    countNodesPerLayer(d._children[i], depth+1);
                }
            }
        }
        countNodesPerLayer(root, 0);

        function collapseInternal(d, depth, maxNodesPerLayer, maxDepth, parentCollapsed) {
            if (d._children) {
                var collapsed = false;
                if(depth>=maxDepth || ((depth+1) in nodesPerLayer && nodesPerLayer[depth+1] > maxNodesPerLayer) || parentCollapsed)
                    collapsed = true;
                for(var i in d._children){
                    collapseInternal(d._children[i], depth+1, maxNodesPerLayer, maxDepth, collapsed);
                }

                if(collapsed){
                    d.children = null;
                }
                else{
                    d.children = d._children;
                }
            }
        }

        collapseInternal(root, 0, maxNodesPerLayer, maxDepth, false);
        update(root);
    }

    function update(source) {
        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function(d) { d.y = d.depth * 180; });

        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function(d) { return d.id || (d.id = ++id); });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .on("mousedown", function(d){
                d.clickInProcess = true;
                setTimeout(function(){
                    if(d.clickInProcess){
                        d.clickInProcess = false;
                        longclick(d);
                    }
                },1500);
            })
            .on("mouseup", function(d){
                if(d.clickInProcess){
                    d.clickInProcess = false;
                    click(d);
                }
            })
            .on("mouseover", function(d){

            })
            .on("mouseout", function(d){
                
            });                  

        // Toggle children on click.
        function click(d) {
            if(d.children)
                d.children = null;
            else
                d.children = d._children;
            update(d);
        }

        // Make root node on long click.
        function longclick(d) {
            collapsibleTree.makeRootNode(d);
        }

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function(d) { return d._children ? "#2E9625" : "#fff"; });

        nodeEnter.append("text")
            .attr("x", function(d) { return d._children ? -12 : 12; })
            .attr("dy", ".35em")
            .attr("text-anchor", function(d) { return d._children ? "end" : "start"; })
            .text(function(d) { return d.name; })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
            .attr("r", 7)
            .style("fill", function(d) { return (d._children && d._children.length>0) ? "#2E9625" : "#fff"; });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function(d) { return d.target.id; });

        var diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
            });

        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
        });
    }

  return this;
}