var DealerMap = {
  constants: {
    MAP_ID: "map",
    SIDEBAR_ID: "sidebar",
    INFOBOX_CLASS: "info-box",
    ACTIVE_CLASS: "active",
  },
  data: {
    map: null,
    infoWindow: null,
    places: [],
    activePlaces: [],
  }
}

DealerMap.selectMarker = function (place) {
  DealerMap.deselectMarker();
  DealerMap.data.infoWindow.setContent(place.content);
  DealerMap.data.infoWindow.open(DealerMap.data.map, place.marker);
  place.listEntry.classList.add(DealerMap.constants.ACTIVE_CLASS)
  place.listEntry.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  place.marker.setIcon(place.icon_active);

}

DealerMap.deselectMarker = function () {
    DealerMap.data.infoWindow.close();
  
    DealerMap.data.activePlaces.forEach(item => {
      item.marker.setIcon(item.icon);
    })
  
    const activeElemets = document.getElementById(DealerMap.constants.SIDEBAR_ID).getElementsByClassName(DealerMap.constants.ACTIVE_CLASS);
  
    for (let index = 0; index < activeElemets.length; index++) {
      const element = activeElemets[index];
      element.classList.remove(DealerMap.constants.ACTIVE_CLASS);
    }
  },

DealerMap.initMap = function () {

  DealerMap.data.infoWindow = new google.maps.InfoWindow();

  let mapOptions = {
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: { lat: 50.935173, lng: 6.953101 },
    streetViewControl: false,
    mapTypeControl: false,
    styles:
        [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    { "color": "#e9e9e9" },
                    { "lightness": 17 }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    { "color": "#f5f5f5" },
                    { "lightness": 20 }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill", 
                "stylers": [
                  { "color": "#ffffff" }, 
                  { "lightness": 17 }
              ]
            }, 
            { 
              "featureType": "road.highway", 
              "elementType": "geometry.stroke", 
              "stylers": [
                { "color": "#ffffff" }, 
                { "lightness": 29 }, 
                { "weight": 0.2 }
              ] 
            }, 
            { 
              "featureType": "road.arterial", 
              "elementType": "geometry", 
              "stylers": [
                { "color": "#ffffff" }, 
                { "lightness": 18 }
              ]
            }, 
            
            { 
              "featureType": "road.local", 
              "elementType": "geometry", 
              "stylers": [
                { "color": "#ffffff" }, 
                { "lightness": 16 }
            ] 
            }, 
            { 
              "featureType": "poi", 
              "elementType": "geometry", 
              "stylers": [
                { "color": "#f5f5f5" }, 
                { "lightness": 21 }
              ]
            }, 
            { 
              "featureType": "poi.park", 
              "elementType": "geometry", 
              "stylers": [
                { "color": "#dedede" }, 
                { "lightness": 21 }
              ] 
            }, 
            { 
              "elementType": "labels.text.stroke", 
              "stylers": [
                { "visibility": "on" }, 
                { "color": "#ffffff" }, 
                { "lightness": 16 }
              ] 
            }, 
            { 
              "elementType": "labels.text.fill", 
              "stylers": [
                { "saturation": 36 }, 
                { "color": "#333333" }, 
                { "lightness": 40 }
              ] 
            }, 
            { 
              "elementType": "labels.icon", 
              "stylers": [
                { "visibility": "off" }
              ] 
            }, 
            { 
              "featureType": "transit", 
              "elementType": "geometry", 
              "stylers": [
                { "color": "#f2f2f2" }, 
                { "lightness": 19 }
              ] 
            }, 
            { 
              "featureType": "administrative", 
              "elementType": "geometry.fill", 
              "stylers": [
                { "color": "#fefefe" }, 
                { "lightness": 20 }
              ] 
            }, 
            { 
              "featureType": "administrative", 
              "elementType": "geometry.stroke", 
              "stylers": [
                { "color": "#fefefe" }, 
                { "lightness": 17 }, 
                { "weight": 1.2 }
              ] 
            }
    ]
  };

  DealerMap.data.map = new google.maps.Map(document.getElementById(DealerMap.constants.MAP_ID), mapOptions);
  // Create Data
  // DealerMap.initData();
  google.maps.event.addListener(DealerMap.data.map, 'click', function() { deselectMarker() });
  DealerMap.initMarkerForActivePlaces();

  let bounds = new google.maps.LatLngBounds();
  DealerMap.data.activePlaces.forEach(place => {
    bounds.extend(place.marker.getPosition());
  })

  DealerMap.data.map.fitBounds(bounds);
}


DealerMap.initMarkerForActivePlaces = function () {

  DealerMap.clearMarkers();

  DealerMap.data.activePlaces.forEach(place => {
    const marker = new google.maps.Marker({
      position: place.pos,
      map: DealerMap.data.map,
      title: place.title,
      icon: place.icon,
    });
    place.marker = marker;

    // EventListender For Selecting Maker
    google.maps.event.addListener(marker, 'click', function() {
      DealerMap.selectMarker(place);
    });

    // Sidebar entry for Marker
    const elem = document.createElement('div');
    elem.innerHTML = place.innerContent;
    elem.classList.add(DealerMap.constants.INFOBOX_CLASS);
    document.getElementById(DealerMap.constants.SIDEBAR_ID).appendChild(elem);
    elem.addEventListener('click', function() {
      DealerMap.selectMarker(place);
    });
    place.listEntry = elem;

  });


}

DealerMap.clearMarkers = function () {
  const sidebar = document.getElementById(DealerMap.constants.SIDEBAR_ID);
  while (sidebar.hasChildNodes()) {
    document.getElementById(DealerMap.constants.SIDEBAR_ID).firstChild.remove();
  }
  DealerMap.data.activePlaces.filter(place => place.marker).forEach(place => {
    place.marker.setMap(null);
  });
}