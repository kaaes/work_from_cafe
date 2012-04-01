(function(){
	var textKeys = {
			internet:'Internet',
			power_outlets : 'Power outlets',
			seating : 'Seating',
			service : 'Service',
			provision : 'Provision',
			hours : 'Opening time'
		},
		mapLinkTemplate = '<a href="http://maps.google.com/maps?q={{coords}}">See on map</a>',
		itemTemplate = '<h3>{{name}}, {{address}} {{{mapLink}}}</h3><ul>{{#description}}{{{.}}}{{/description}}</ul>',
		description = '<li><strong>{{key}}:</strong> {{value}}</li>',
		cityHeader = '<h2>{{city}}</h2>';

	function renderPage(items) {
		var container = byId('list'),
			html = getItemsHtml(items),
			currentCity = '',
			toRender = [];	
			
		html.forEach(function(item) {
			if(currentCity !== item.city) {
				toRender.push(Mustache.to_html(cityHeader, {city: item.city}));
				currentCity = item.city;
			}
			toRender.push(item.html);			
		})	
			
		container.innerHTML = toRender.join('');	
	}
	
	function getItemsHtml(items) {
		var i = 0, 
			len = items.length,
			item, desc, keys, list,
			cityList = [],
			itemsHtml = [],
			coordinates;
		
		for(;i<len; i++) {
			list = [];
			item = items[i];
			desc = item.description;
			keys = Object.keys(desc);
			coordinates = '';
			
			if(cityList.indexOf(item.city) === -1) {
				cityList.push(item.city);
			}
			
			keys.forEach(function(el){
				list.push(Mustache.to_html(description, {key: textKeys[el], value: desc[el]}));
			});
			
			if(item.coordinates) {
			  if(typeof item.coordinates === 'string') {
			    corrdinates = item.coordinates;
			  } else if(item.coordinates.constructor === Array) {
			    coordinates = item.coordinates.join(',');
			  }
			}

			itemsHtml.push({
				html : Mustache.to_html(itemTemplate, {
					name : item.name,
					address : item.address,
					mapLink : coordinates ? Mustache.to_html(mapLinkTemplate, {coords : coordinates}) : '',
					description: list
				}),
				city : item.city,
				country : item.country
			});
		}
		itemsHtml.sort(byCountryAndCity);
		
		return itemsHtml;
	}
	
	function byCountryAndCity(a, b) {
		var country = byCountry(a, b)
		return country ? country : byCity(a, b); 
	}
	
	function byCity(a, b) {
		return a.city < b.city ? -1 : a.city > b.city ? 1 : 0;
	}
	
	var byCountry = (function(){
		var countryOrder = ['pl', 'se', 'gb', 'lt'];
		return function(a, b) {
			var aCode = a.country.toLowerCase(), 
				bCode = b.country.toLowerCase(),
				aIndex = countryOrder.indexOf(aCode), 
				bIndex = countryOrder.indexOf(bCode);
				
			return aIndex < bIndex ? -1 : aIndex > bIndex ? 1 : 0;
		}
	})()
	
	function byId(id) {
		return document.getElementById(id);
	}	
	
	(function fetchData(callbackFn){
		var d=document,
			h=d.getElementsByTagName('head')[0], 
			s=d.createElement('script'),
			t=new Date();
			
		s.type='text/javascript';
		s.src='index.json?' + t.getTime();
		//places będą jsonem nie obiektem - JSON.parse tu będzie
		s.onload=function(){callbackFn(places)};
		s.onreadystatechange=function(){if(this.readyState=='loaded'){callbackFn(places)}};
		h.appendChild(s);
	})(renderPage);
})()