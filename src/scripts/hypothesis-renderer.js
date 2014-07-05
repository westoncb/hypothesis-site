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

	document.writeln('<link rel="stylesheet" type="text/css" href="css/hypothesis.css">');

	var cellString = '<div class="cellborder"></div>';

	function walkJSON(json, depth, parent) {
		for (var key in json) {
    		var thisCell = $(cellString);
			thisCell.css("left", depth*20);
			parent.append(thisCell);

    		thisCell.append(key + ": ");

	    	var value = json[key]
	    	if (typeof(value) == "object") {
	    		if (value instanceof Array) {
	    			console.log(value);
	    			for (var element in value) {
	    				thisCell.append("<br>");
	    				walkJSON(value[element], depth+1, parent);	
	    			}
	    		} else {
	    			thisCell.append("<br>");
	    			walkJSON(value, depth+1, parent);
	    		}
	    	} else {
	    		thisCell.append(value);
	    	}
	    	thisCell.append("<br>");
	    }
	}

	document.writeln('<div id="test" style="position: absolute;"></div>');
	walkJSON(hypothesisModel, 0, $("#test"));
});