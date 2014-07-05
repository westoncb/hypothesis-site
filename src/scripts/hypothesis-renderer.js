$(document).ready(function(){
	var hypothesisModelString = '{"id": 2503234, \
					  "name": "The moon is made of cheese. Here\'s some CHEESE for ya bra!", \
					  "author": "Sofia Chandler-Freed", \
					  "amplifiers": [ \
					  				{ \
					  				"id": 4568672, \
					  				"type": "justification", \
					  				"contents": "Here is some more text. And it\'s not just any text, but THE very best text possible--especially since it\'s about how the moon\'s made out of some kinda weird ass soy-based Wallace and Grommit cheese.catscatscatscatscats catscatscatscatscats catscatscatscatscat scatscatscatscatscatscats catscatscatscatscatscatscatscatsca tscatscatscatscat scatscatscatscatscatscatscatscatscatscats catscatscatscatscatsc atscatscatscatscat scatscatscatscatscat scatscatscatscatsca tscatscatscatscatsc atscats", \
					  				"amplifiers": "" \
					  			  }, \
					  			  { \
					  				"id": 4568672, \
					  				"type": "justification", \
					  				"contents": "catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscats", \
					  				"amplifiers": [ \
						  				{ \
						  				"id": 4568672, \
						  				"type": "justification", \
						  				"contents": "Here is some more text. And it\'s not just any text, but THE very best text possible--especially since it\'s about how the moon\'s made out of some kinda weird ass soy-based Wallace and Grommit cheese.", \
						  				"amplifiers": [ \
							  				{ \
							  				"id": 4568672, \
							  				"type": "justification", \
							  				"contents": "Here is some more text. And it\'s not just any text, but THE very best text possible--especially since it\'s about how the moon\'s made out of some kinda weird ass soy-based Wallace and Grommit cheese.", \
							  				"amplifiers": "" \
							  			  }, \
							  			  { \
							  				"id": 4568672, \
							  				"type": "justification", \
							  				"contents": "catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscats", \
							  				"amplifiers": "" \
							  			  }] \
						  			  }, \
						  			  { \
						  				"id": 4568672, \
						  				"type": "justification", \
						  				"contents": "catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscats", \
						  				"amplifiers": "" \
						  			  }] \
					  			  }] \
					 }';

	var hypothesisModel = jQuery.parseJSON(hypothesisModelString);
	var cellString = '<div class="cellborder"></div>';
	var cellCount = 0;
	var cells = [];

	function walkJSON(json, depth, parent) {
		if (json instanceof Array) {
			for (var element in json) {
				walkJSON(json[element], depth, parent);	
			}
		} else {
			var hasContent = false;
			var thisCell = createCell(depth, parent.outerWidth(), parent.css('left'));
			cellCount++;

			addCell(thisCell, parent, cells);

			for (var key in json) {
	    		thisCell.append(key + ": ");

		    	var value = json[key]
		    	if (typeof(value) == "object") {
		    		var subCells = [];
		    		cells.push(subCells);
	    			walkJSON(value, depth+1, parent, subCells);
		    	} else {
		    		hasContent = true;
		    		thisCell.append(value);
		    		thisCell.append("<br>");
		    	}
		    }
		}
	}

	function addCell(cell, parent, cells) {
		parent.append(cell);
		cells.push(cell);
	}

	function createCell(depth, parentWidth, parentLeft) {
		var thisCell = $(cellString);
		var space = depth*40;
		thisCell.css("left", space);
		thisCell.css("width", ((parentWidth - space) - (space)));

		return thisCell;
	}

	function buildHeader(title, author) {
		return '<div id="title-section"> \
				<span class="hypothesis-title-word">Hypothesis:</span> <span class="hypothesis-title">' + title + '</span> \
				<div id="author-text">by ' + author + '</div> \
			</div><div class="sep2"></div><br>';
	}

	function setYPositions(y, cells) {
		for (var i = 0; i < cells.length; i++) {
			if (cells[i] instanceof Array) {
				setYPositions(y, cells[i]);
			} else {
				cells[i].css('top', y);
				y += cells[i].height();
			}
		};
	}

	var hypothesisNode = $('<div class="cellborder" id="hyproot" style="position: relative; left: 0px; width: 80%;"></div>');
	$('body').append(hypothesisNode);
	hypothesisNode.append(buildHeader(hypothesisModel.name, hypothesisModel.author));

	walkJSON(hypothesisModel.amplifiers, 0, $("#hyproot"), cells);

	setYPositions(hypothesisNode.outerHeight(), cells);
});