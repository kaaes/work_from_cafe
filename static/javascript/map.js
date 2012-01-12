  $(document).ready(function(){
    geocoder = new google.maps.Geocoder();
    latlng = new google.maps.LatLng(50.06465, 19.94498);
    myOptions = {
      zoom: 14,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map($("#map")[0], myOptions);
    
    coordinates = [
        {lat : 50.063381, lng : 19.934095, title:"Bunkier Sztuki, Plac Szczepański 3a"},
        {lat : 50.049170, lng : 19.944650, title:"Cafe Młynek, Plac Wolnica 7"},
        {lat : 50.046077, lng : 19.949290, title:"Drukarnia, ul. Nadwiślańska 1"},
        {lat : 50.059883, lng : 19.936280, title:"Gazeta Cafe, ul. Bracka 14"},
        {lat : 50.057396, lng : 19.931253, title:"Indalo Cafe, ul. Tarłowska 15"},
        {lat : 50.063439, lng : 19.930681, title:"Karma, ul. Krupnicza 12"},
        {lat : 50.051932, lng : 19.945362, title:"Kolory, ul. Estery 10"},
        {lat : 50.052021, lng : 19.944696, title:"Le Scandale, Plac Nowy 9"}
    ];
    
    markers = [];
    
    $.each(coordinates, function(index, place){
        markers.push(
            new google.maps.Marker({
                map: map, 
                position: new google.maps.LatLng(place.lat, place.lng),
                title: place.title
            })
        );
    });
    
    var infowindow = null;
    
    $.each(markers, function(index, marker){
        google.maps.event.addListener(marker, 'click', function() {
            if (infowindow) {
                infowindow.close();
            }
            infowindow = new google.maps.InfoWindow();
            infowindow.setContent(marker.title);
            infowindow.open(map, marker);
        });
    });
    
    google.maps.event.addListener(map, 'click', function() {
        if(infowindow) {
            infowindow.close();
        }
    });
    
  });
