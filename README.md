# Esri Map Areas

This package contains a Lightning component that draws polygons read from a Salesforce object onto a map embedded in a record page. The component allows the user to choose between street, topological, and satellite views of the map.

![EsriMapAreas in Action](/images/EsriMapAreas-Animated.gif)


## Configuration

The component pulls coordinates from records in a related list. The related list object can be any Salesforce object, but must contain the following fields:

Field API Name | Description
-------------- | -----------
`Item_Color__c` | The color of the polygon to be drawn using standard HTML/CSS format. For example, `red` or `#f48723`.
`Coordinates__c` | A comma-separated list of two-member latitude/longitude arrays in JSON format that represent the polygon to be drawn on the map: `[lat-1,lon-1],[lat-2,lon-2],...[lat-n,lon-n]`
`Formatted_Tab_URL__c` | A string that should evaluate to a URL path name (without the "https" or server portion, for portability) that will take the user to this record's page. I use a formula field to generate this based on the object API name and ID field.

The package contains a sample object called `Property__c` which contains all of the required fields. You either use it as a reference or as a starting point for your own custom object.

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