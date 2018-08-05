
function pageLoader() {
	console.log( "ready!" );
	populateGallery();
	setInterval(function() {
		$('.preloader').animate({
			height: '0'
		}, 1000, function() {});
		$('.white-fill').animate({
			opacity: 0
		}, 800, function() {$('.white-fill').hide();});
	}, 500);
};

function detectIE() {
	//https://codepen.io/gapcode/pen/vEJNZN
	// Don't judge me I don't get paid for this
	
	var ua = window.navigator.userAgent;

	// Test values; Uncomment to check result …

	// IE 10
	// ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
  
	// IE 11
	// ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
  
	// Edge 12 (Spartan)
	// ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
  
	// Edge 13
	// ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

	var msie = ua.indexOf('MSIE ');
	if (msie > 0) {
	// IE 10 or older => return version number
	return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	}

	var trident = ua.indexOf('Trident/');
	if (trident > 0) {
	// IE 11 => return version number
	var rv = ua.indexOf('rv:');
	return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	}

	var edge = ua.indexOf('Edge/');
	if (edge > 0) {
	// Edge (IE 12+) => return version number
	return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	}

	// other browser
	return false;
}

function disableGallery(){	
	var js_carousel = document.getElementById("js_carousel_div");
	
}

function toggleProjectDescriptions(){
	
	console.log("toggle")
	
	var overlay = document.getElementsByClassName("hover-overlay");
	var zoom = document.getElementsByClassName("hover-zoom");
	console.log(overlay)
	
	var toggle_on = document.getElementById("description_toggle").checked;
	for (i = 0; i < zoom.length; i++){
		
		o = overlay.item(i);
		z = zoom.item(i);
		if (! toggle_on) {
			o.classList.remove("hover-overlay-toggled");
			z.classList.remove("hover-zoom-toggled");
		} else {
			o.classList.add("hover-overlay-toggled");
			z.classList.add("hover-zoom-toggled");
		}
	}
};


function toggleOverlay(caller){

	var overlay = caller.children[1];
	var title = overlay.children[0];

	if (overlay.classList.contains("hover-overlay-toggled")) {
		
		caller.classList.add("draw-border")
		caller.classList.remove("draw-border-toggled")
		
		overlay.classList.remove("hover-overlay-toggled");
		
		//title.classList.add("small-title");
		title.classList.remove("small-title-toggled");
		
	} else {
		
		caller.classList.add("draw-border-toggled")
		caller.classList.remove("draw-border")
		
		overlay.classList.add("hover-overlay-toggled");
		
		title.classList.add("small-title-toggled");
		//title.classList.remove("small-title");
	}
	console.log(caller)
	console.log(overlay)
	console.log(title)
}



function getAjaxFiles(project_id) {
	
	//return ["800x600-7E3.png", "1200x900-0E9.png", "1600x900-22E.png", "1600x900-808.png", "1920x1040-2B4.png"];

	return $.ajax({
		'async': false,
		'type': "POST",
		'global': false,
		'dataType': 'html',
		'url': "php/populate_gallery.php",
		'data': { 'project_id': project_id },
		'success': function (data) {
			console.log(data);
		},
        error: function(data) {
            console.log(data);
        }
	}).responseText;


};

function getFiles(project_id) {
	var JSONfiles = getAjaxFiles(project_id);		
	console.log(JSONfiles);
	var files = JSON.parse(JSONfiles);
	return files;
}

function createCarouselDiv(name, url, count) {
/* 	
	Create div to put into carousel_div
	
	<div class="carousel-item active">
		<img src="https://dummyimage.com/1600x900/988/fff" alt="First slide">
	</div> */
	
	var item_div = document.createElement("div");
	item_div.id = "small" + count;
	item_div.classList.add("carousel-item");
	
	if (count == 0){
		item_div.classList.add("active");
	}
	
	
	var item_img = document.createElement("img");
	item_img.src = url;
	item_img.alt = name;
	
	item_div.appendChild(item_img);
	
	//return item_div;
	return item_div
};

function createGalleryDiv(name, url, count){
	
/* 	
	Create div to put into gallery_div
	
	<div class="col-xl-2 col-lg-3 col-md-4 col-sm-5">
	  <a href="#lightbox" data-toggle="modal" data-slide-to="0" class="d-block mb-4 h-100">
		<div class="hover-container">
			<img class="img-fluid hover-zoom" src="img/project0/1600x900-22E.png" alt="">
		</div>
	  </a>
	</div> */
	
	var col_div = document.createElement("div");
	col_div.id = "grid_" + count;
	col_div.classList.add("col-xl-2");
	col_div.classList.add("col-lg-3");
	col_div.classList.add("col-md-4");
	col_div.classList.add("col-6");
	col_div.classList.add("px-1");
	col_div.classList.add("py-1");
	
	var a_div = document.createElement("a");
	a_div.href = "#lightbox";
	a_div.setAttribute("data-toggle", "modal");
	a_div.setAttribute("data-slide-to", count.toString());
	a_div.classList.add("d-flex");
	a_div.classList.add("w-100");
	a_div.classList.add("w-100");
	a_div.classList.add("h-50");
	a_div.classList.add("align-items-center");
	
	var hover_div = document.createElement("div");
	hover_div.classList.add("hover-container");
	
	var img_div = document.createElement("div");
	img_div.classList.add("hover-zoom");
	img_div.classList.add("gallery-img");
	urlstring = "url('"+url+"')";
	img_div.style.backgroundImage = urlstring;
	img_div.style.backgroundPosition = "center";
	img_div.style.backgroundSize = "cover";
	img_div.style.width = "100%";
	
	
	//console.log(img_div)
	//console.log(urlstring)
	
	hover_div.appendChild(img_div);
	a_div.appendChild(hover_div);
	col_div.appendChild(a_div);
	
	return col_div;
	
};



function createCarouselIndicator(count){
	var li_div = document.createElement("li");
	li_div.setAttribute("data-toggle", "modal");
	li_div.setAttribute("data-slide-to", count.toString());	
	
	return li_div;
	
};


function populateGallery(){
	
	js_carousel = document.getElementById("js_carousel_div");
	js_gallery = document.getElementById("js_gallery_div");
	js_indicator = document.getElementById("js_indicator_div");
	
	
	project_id = document.getElementById("project_id").innerHTML;
	
	//console.log(project_id);
	//console.log(js_carousel);
	
	files = getFiles(project_id);
	//console.log(files);
	for (i in files){
		// console.log(i);
		f = files[i]
		url = "img/" + project_id + "/" + f;
		
		c_div = createCarouselDiv("", url, i);
		g_div = createGalleryDiv("", url, i);
		l_div = createCarouselIndicator(i);
		
		js_carousel.appendChild(c_div);
		js_gallery.appendChild(g_div);
		js_indicator.appendChild(l_div);	
		// console.log(js_carousel);
	}
	
}


