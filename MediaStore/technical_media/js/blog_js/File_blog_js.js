//=== Toggle Blogs Overview	START =====================//



	function tagSelected(fs_id) {

		$("#tag-"+fs_id).toggleClass("active");

		let activeTags = [];
		$("div.tagcloud > a.active").each((index, tagAnchor) => activeTags.push($(tagAnchor).attr("data-id")));

		$(".news-listing >div").each((index, blogcontainer) => {
			if (activeTags.length == 0) {
				$(blogcontainer).addClass("visible");
				$(blogcontainer).removeClass("hidden");
			} else {			
				let containerTags = $(blogcontainer).attr("data-tags").split(" ");
				let intersect = containerTags.filter(value => activeTags.includes(value));
				//For OR: if(intersect.length > 0 ) { 
				if(intersect.length == activeTags.length ) {
					$(blogcontainer).addClass("visible");
					$(blogcontainer).removeClass("hidden");
				} else {
					$(blogcontainer).addClass("hidden");
					$(blogcontainer).removeClass("visible");	
				}
			}
		});

	}

	$(document).ready(function() {
		let regexpFilter = /\?filterBy=[0-9]+/;
		let regexpId = /[0-9]+/;
		
		let url = location.href;

		let filterParam = url.match(regexpFilter);
				
		if(filterParam != null) {
			let tagId = filterParam[0].match(regexpId);
			if(tagId != null) {
				tagSelected(tagId[0]);
			}
		}

	});

//=== Toggle Blogs Overview	END =====================//

