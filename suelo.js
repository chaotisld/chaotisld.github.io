var dataUsosSuelo = {
    "type": "FeatureCollection",
    "features": [
        {
            "geometry": {
                "type" : "Polygon",
                "coordinates": [
                    [

                    ]
                ]
            },
            "type": "Feature", 
      "properties": {
        "Nom": "Unidad Territorial de Primer Orden", 
        "Shape_Area": 563477266.777, 
        "OBJECTID": 1, 
        "km2": 563.4772667769, 
        "FID": 0, 
        "Shape_Leng": 203978.807739, 
        "ha": 56347.72667768984, 
        "Id": 1
      }
    }
  ]
}
; var map = L.map('map');
    L.tileLayer('//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>'
    }).addTo(map);
    var markers = new L.markerClusterGroup();
    var geojson = L.geoJson(dataExtent);
    markers.addLayer(geojson);
    map.addLayer(markers);
    map.fitBounds(geojson.getBounds());