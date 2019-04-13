({
    doInit : function(component, event, helper) {
        
        let mapItems = component.get("v.mapItems");
        
        let map = L.map (component.find('mapDiv').getElement(), {						// Create the Leaflet map itself
            zoomControl: true, 
            boxZoom: true, 
            trackResize: true, 
            doubleClickZoom: true
        });
        L.control.scale().addTo(map);													// Add a scale to the lower left-hand side
        
        component.set("v.tileLayer", L.tileLayer(										// Create the Leaflet TileLayer object and save it for use later
            helper.getMapTypeURL("street"),												// We show a street map by default
            { attribution: "Powered by Esri" }											// Need an attribution, see ESRI developer site for details
        ).addTo(map));
        
        let latlngArea = [];
        let polygonList = [];
        for (let mapItem = 0; mapItem < mapItems.length; mapItem++) {
            let thisMapItem = mapItems[mapItem];
            let polygonCoords = thisMapItem.Coordinates__c;
            let color = thisMapItem.Item_Color__c != null ? thisMapItem.Item_Color__c : "red";
            if (polygonCoords != null && polygonCoords != '') {
                let latlngs = [];
                let coordinates = JSON.parse('[' + polygonCoords + ']');
                for (let coord = 0; coord < coordinates.length; coord++)
                    latlngs.push(coordinates[coord]);
                let polygon = L.polygon(latlngs, {
                    color: color,
                    weight: component.get("v.borderWidth"),
                    fillColor: color,
                    fillOpacity: component.get("v.fillOpacity")
                }).addTo(map);
                polygon.bindPopup('<p><a href="' + thisMapItem.Formatted_Tab_URL__c + '">' + thisMapItem.Name + '</a></p>');
                polygonList.push({
                    claimId: thisMapItem.Id,
                    polygon: polygon
                });
                latlngArea.push(latlngs); 
            }
        }
        component.set("v.polygonList", polygonList);									// Save the list of Leaflet polygon objects so we can refer to them later
        component.set("v.map", map);													// Ditto for the Leaflet map object
        map.fitBounds(L.polygon(latlngArea).getBounds());		
    },
    
    drawSelected : function(component, event, helper) {
        
        let mapItems = event.getParam("arguments").mapItems;
        let map = component.get("v.map");
        let polygonList = component.get("v.polygonList");
        
        for (let polygon = 0; polygon < polygonList.length; polygon++)					// Remove the polygons from the map, does not delete the polygons themselves
            map.removeLayer(polygonList[polygon].polygon);
        
        if (mapItems.length != 0) {														// Need this check for the fitBounds() below so we don't barf on empty latlngs       
            let latlngArea = [];
            for (let mapItem = 0; mapItem < mapItems.length; mapItem++)
                for (let polygon = 0; polygon < polygonList.length; polygon++)
                    if (mapItems[mapItem].Id == polygonList[polygon].claimId) {
                        polygonList[polygon].polygon.addTo(map);
                        latlngArea.push(polygonList[polygon].polygon.getLatLngs());
                    }
            map.fitBounds(L.polygon(latlngArea).getBounds());							// Pans and zooms to show only the selected area
        }
    },
    
    setMapType : function(component, event, helper) {
        component.get("v.tileLayer").setUrl(helper.getMapTypeURL(event.getParam("arguments").mapType));
    }
})