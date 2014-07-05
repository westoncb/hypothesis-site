$(document).ready(function(){
	var hypothesisModelString = '{"id": 2503234, \
					  "name": "The moon is made of cheese. Here\'s some CHEESE for ya bra!", \
					  "amplifiers": [ \
					  				{ \
					  				"id": 4568672, \
					  				"type": "justification", \
					  				"contents": "Here is some more text. And it\'s not just any text, but THE very best text possible--especially since it\'s about how the moon\'s made out of some kinda weird ass soy-based Wallace and Grommit cheese." \
					  			  }, \
					  			  { \
					  				"id": 4568672, \
					  				"type": "justification", \
					  				"contents": "catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscats" \
					  			  }] \
					 }';

	var hypothesisModel = jQuery.parseJSON(hypothesisModelString);
	const tab = "&nbsp;&nbsp&nbsp;&nbsp";

	var cellCSSString = 'position: relative; \
			margin-left: auto; \
			margin-right: auto; \
			border-style: solid; \
			border-width: 4px 17px 17px 7px; \
			-moz-border-image: url(\'./images/table2.png\') 4 17 17 7 fill; \
			-webkit-border-image: url(\'./images/table2.png\') 4 17 17 7 fill; \
			-o-border-image: url(\'./images/table2.png\') 4 17 17 7 fill; \
			border-image: url(\'./images/table2.png\') 4 17 17 7 fill; \
			background-color: c9cda7; \
			padding: 2px; \
			padding-right:0px;';

	document.writeln("<style>.cellborder {" + cellCSSString + "}</style>");

	var cellString = '<div class="cellborder"></div>';

	function walkJSON(json, depth, parent) {
		var thisCell = $(cellString);
		parent.append(thisCell);

		for (var key in json) {
    		
    		thisCell.append(key + ": ");

	    	var value = json[key]
	    	if (typeof(value) == "object") {
	    		thisCell.append("<br>");
	    		walkJSON(value, depth+1, thisCell);
	    	} else {
	    		thisCell.append(value);
	    	}
	    	thisCell.append("<br>");
	    }
	}

	document.writeln('<div id="test" style="position: absolute;"></div>');
	walkJSON(hypothesisModel, 0, $("#test"));
});