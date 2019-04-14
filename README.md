# Esri Map Areas

This package contains a Lightning component that draws polygons read from a Salesforce related list onto a map embedded in a record page. The component allows the user to choose between street, topological, and satellite views of the map.

![EsriMapAreas in Action](/images/EsriMapAreas-Animated.gif)


## Configuration

The component pulls coordinates from records in a related list. The related list object can be any Salesforce object, but must contain the following custom fields:

Field API Name | Description
-------------- | -----------
`Item_Color__c` | The color of the polygon to be drawn using standard HTML/CSS format. For example, `red` or `#f48723`.
`Coordinates__c` | A comma-separated list of two-member latitude/longitude arrays in JSON format that represent the polygon to be drawn on the map: `[lat-1,lon-1],[lat-2,lon-2],...[lat-n,lon-n]`
`Formatted_Tab_URL__c` | A string that should evaluate to a URL path name (without the "https" or server portion, for portability) that will take the user to this record's page. I use a formula field to generate this based on the object API name and ID field.

The package contains a sample object called `Property__c` which contains all of the required fields. You can either use it as a reference or as a starting point for your own custom object:

![Sample Related List Object](/images/Sample-Related-List.png)

From here, you can simply drag the component onto a Lightning App Builder page:

![Lightning App Builder Page](/images/Esri-Maps-Area-Configuration.png)

Most of the properties of the component default to reasonable values, but you must supply two:

- The API name of the related list object that contains the required fields described above.
- The API name of the lookup field on the related list object that looks up to this object.

You may also specify up to five additional fields to be displayed on the related list from the custom object you specify. The strings in the components properties must be a "|"-separated triple consisting of

- The column header for the field you would like to show.
- The API name of the field on the related object for that column.
- A type string that conforms to the `type` property of the [Lightning datatable](https://developer.salesforce.com/docs/component-library/bundle/lightning:datatable/documentation) specification; for example, `number`, `text`, `date`, etc.

You can optionally sort the related list based on any field in the related list object in either ascending or descending order.


## How to Deploy This Package to Your Org

I am a pre-sales Solutions Engineer for [Salesforce](https://www.salesforce.com) and I develop solutions for my customers to demonstrate the capabilities of the amazing Salesforce platform. *This package represents functionality that I have used for demonstration purposes and the content herein is definitely not ready for actual production use; specifically, it has not been tested extensively nor has it been written with security and access controls in mind. By installing this package, you assume all risk for any consequences and agree not to hold me or my company liable.*  If you are OK with that ...

Simply click the button below and log into your org:

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/src/main/webapp/resources/img/deploy.png">
</a>


## References

- I use the wonderful [Leaflet JavaScript library](https://leafletjs.com/) for all of the mapping magic.
- Generate map coordinates with the [Google Maps and KML shapes generator](https://www.doogal.co.uk/polylines.php). Click the "CSV" tab to get coordinates suitable for use with **Esri Map Areas**.


## Credits

This component was inspired by the work done by John Schillaci at [Salesforce](https://www.salesforce.com).