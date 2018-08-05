
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
	
	return item_div;

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
	col_div.classList.add("col-xl-2", "col-lg-3", "col-md-4", "col-sm-5");
	
	var a_div = document.createElement("a");
	a_div.href = "#lightbox";
	a_div.setAttribute("data-toggle", "modal");
	a_div.setAttribute("data-slide-to", count.toString());
	a_div.classList.add("d-block", "mb-4", "h-100");
	
	var hover_div = document.createElement("div");
	hover_div.classList.add("hover-container");
	
	var img_div = document.createElement("img");
	img_div.classList.add("img-fluid", "hover-zoom");
	img_div.src = url;
	img_div.alt = name;
	
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