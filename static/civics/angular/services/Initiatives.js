angular.module('civics.initiatives_service', [])

.factory('initiatives_data', function($cacheFactory){
    return $cacheFactory('initiatives');
})

.factory('Initiatives', function($http, Settings, Categories, $rootScope, $q, meta, initiatives_data)
{
    var initiatives = {};

    initiatives.createCategories = function(){
        $http.get('/api/cities_with_initiatives', {
            ignoreLoadingBar: true,
        }).then(
            function(response){
                for(var i in response.data){
                  var city = response.data[i];
                  /** Update initiative cities category for the filters */
                  Categories.addInitiativeCity(city.country, city.name, city.id, city.coordinates);
                }
            }
        );
    };

    // Returns a list of events from cached data
    initiatives.createList = function(){
        var items = [];
        var initiatives = initiatives_data.get('initiatives');
        for(var i in initiatives){
            initiative = initiatives[i];
            var marker = {
                  name   : initiative.name,
                  pk     : initiative.pk,
                  topics : initiative.topic.toLowerCase(),
                  agents : initiative.agent.toLowerCase(),
                  spaces : initiative.space.toLowerCase(),
                  topicname : Categories.topics[ initiative.topic.toLowerCase() ],
                  agentname : Categories.agents[ initiative.agent.toLowerCase() ],
                  ods    : initiative.main_ods,
                  cities : initiative.city,
                  img    : initiative.image,
            };
            if(initiative.space)
                marker.spacename = Categories.spaces[ initiative.space.toLowerCase() ];
            if(initiative.activity)
                marker.activitiesname = Categories.activities[ initiative.activity.toLowerCase() ];
            items.push(marker);
        }
        meta.count = items.length;
        return items;
    };

    // Returns a list of clusters from cached data
    initiatives.createClusters = function(){
        PruneCluster.Cluster.ENABLE_MARKERS_LIST = true;
        meta.count = 0;

        var clusters = {};
        var initiatives = initiatives_data.get('initiatives');
        for(var i in initiatives){
            var marker = initiatives[i];
            var city = marker.city;
            if(!(city in clusters)){
                clusters[city] = new PruneClusterForLeaflet();
            }
            var pos = JSON.parse(marker.position);
            var m = new PruneCluster.Marker(pos.coordinates[1], pos.coordinates[0], {
                id     : marker.pk,
                cities : city,
                topics : marker.topic.toLowerCase(),
                spaces : marker.space.toLowerCase(),
                agents : marker.agent.toLowerCase(),
                ods    : '' + marker.main_ods,
            });
            clusters[city].RegisterMarker(m);
            meta.count++;
        }
        for(city in clusters){
            clusters[city].PrepareLeafletMarker = function(leafletMarker, data){
                leafletMarker.setIcon( L.divIcon({
                    'iconSize'    : [40, 60],
                    'iconAnchor'  : [20, 60],
                    'className'   : 'cm cm--' + data.id,
                    'html'        : "<i class='outer i-ods-" + data.ods + " i-to-" + data.topics + " i-ag-" + data.agents + "'></i>" +
                                    "<i class='inner i-sp-" + data.spaces + "'></i>",
                }) );
                leafletMarker.on('click', function(e){
                    $http.get('/api/initiative?id=' + data.id, {
                        ignoreLoadingBar: true,
                    }).then( function(response){
                        $rootScope.$broadcast('open-marker', response.data);
                    });
                });
            };
        }
        return clusters;
    };

    // Fetches data from API and caches it in service data
    // Returns data in the given format
    initiatives.setup = function(format){
        meta.showing = 'initiatives';
        this.createCategories();
        if( initiatives_data.get('initiatives') == null ) {
            return $http.get('/api/initiatives', { cache: true }).then( function(response){
                initiatives_data.put('initiatives', JSON.parse(response.data));
                if(format == 'map' ){
                    return initiatives.createClusters();
                } else {
                    return initiatives.createList();
                }
            }, function(error_response){
                console.log(error_response);
            });
        } else {
            return $q( function(resolve, reject){
                if(format == 'map' ){
                    resolve( initiatives.createClusters() );
                } else {
                    resolve( initiatives.createList() );
                }
            }).then( function(clusters) {
                return clusters;
            });
        }
    };

    // Get relations tree of a given initiatiave
    initiatives.getRelations = function(id){
        var items = initiatives_data.get('initiatives');
        var marker = items.filter(i=>i.pk==id)[0];
        var markers = [];
        var visited_ids = [];
        var relations = [];
        while(marker){
            visited_ids.push(marker.pk);
            var marker_relations = marker.initiatives;
            marker_relations.forEach(id=>{
                var related_marker = items.filter(i=>i.pk==id)[0];
                if( visited_ids.indexOf(id) == -1 ){
                    markers.push(related_marker);
                    relations.push([
                      JSON.parse(marker.position).coordinates.reverse(),
                      JSON.parse(related_marker.position).coordinates.reverse(),
                      marker.pk
                    ]);
                }
            });
            marker = markers.shift();
        }
        return relations;
    }

    return initiatives;

});
