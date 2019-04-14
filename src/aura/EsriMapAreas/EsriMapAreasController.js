({
    doInit : function(component, event, helper) {               

		var queryFields = "";
        var columns = [{ label: 'Name', fieldName: 'Formatted_Tab_URL__c', type: 'url', typeAttributes: { label: { fieldName: 'Name' }, target: '_parent' } }];
		let fieldList = [];
        for (let specString = 2; specString <= 6; specString++) {
            let string = component.get("v.column" + specString + "SpecString");
            if (string != null && string != "") {
                let specArray = string.split('|', 5);
                columns.push({
                    label: specArray[0],
                    fieldName: specArray[1],
                    type: specArray[2],
                    cellAttributes: JSON.parse('{ ' + specArray[3] + ' }'),
                    typeAttributes: JSON.parse('{' + specArray[4] + '}')
                });
                queryFields += ", " + specArray[1];
                fieldList.push({ label: specArray[0], fieldName: specArray[1] });	// Experimental, not implemented
            }
        }
        component.set("v.columns", columns);
        component.set("v.fieldList", fieldList);									// Experimental, not implemented
        
        var action = component.get("c.getItemsFromRecord");
        var sortField = component.get("v.sortFieldAPIName");
        action.setParams({
            recordId: component.get("v.recordId"),
            objectName: component.get("v.itemObjectAPIName"),
            queryFields: queryFields,
            lookupField: component.get("v.lookupFieldAPIName"),
            sortString: sortField == null || sortField == "" ? "" : ' ORDER BY ' + sortField + (component.get("v.sortOrderDescending") ? " DESC" : " ASC") + " NULLS LAST"
        });
        action.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                let mapItems = response.getReturnValue();
                component.set("v.mapItems", mapItems);
                component.set("v.selectedItems", mapItems);							// Initialize all map polygons as selected
                let polygonIds = [];												// Mark all map polygons as initially selected in the Lightning datatable
                for (let mapItem = 0; mapItem < mapItems.length; mapItem++)
                    polygonIds.push(mapItems[mapItem].Id);
                component.set("v.selectedRows", polygonIds);
            }
        });
        $A.enqueueAction(action);
    },
    
    redrawMapWithSelection : function(component, event, helper) {        
        let selectedRows = component.find("mapItemsTable").getSelectedRows();
        let mapItems = component.get("v.mapItems");        
        let selectedItems = [];
        for (let row = 0; row < selectedRows.length; row++)							// Only draw those polygons associated with selected items
            for (let mapItem = 0; mapItem < mapItems.length; mapItem++)
                if (selectedRows[row].Id == mapItems[mapItem].Id)					// We found an item whose Id matches an Id in the selected list
                    selectedItems.push(mapItems[mapItem]);        
        component.set("v.selectedItems", selectedItems);
        component.find("baseMap").redraw(selectedItems);
    },
    
    changeMapType : function(component, event, helper) {
        let selectedMenuItemValue = event.getParam("value");
        let mapTypeMenuItems = component.find("mapTypeMenuItems");
        for (let menuItem = 0; menuItem < mapTypeMenuItems.length; menuItem++) {
            if (mapTypeMenuItems[menuItem].get("v.checked"))						// Uncheck all menu items
                mapTypeMenuItems[menuItem].set("v.checked", false);
            if (mapTypeMenuItems[menuItem].get("v.value") === selectedMenuItemValue) // Re-check only the selected one
                mapTypeMenuItems[menuItem].set("v.checked", true);
        };
        component.find("baseMap").setMapType(selectedMenuItemValue);
    }
})