$(document).ready(function(){
	var hypothesisModelString = '{"id": "0-0", \
					  "name": "The moon is made of cheese. Here\'s some CHEESE for ya bra!", \
					  "author": "Sofia Chandler-Freed", \
					  "amplifiers": [ \
					  				{ \
					  				"id": "1-0", \
					  				"type": "justification", \
					  				"contents": "Here is some more text. And it\'s not just any text, but THE very best text possible--especially since it\'s about how the moon\'s made out of some kinda weird ass soy-based Wallace and Grommit cheese.catscatscatscatscats catscatscatscatscats catscatscatscatscat scatscatscatscatscatscats catscatscatscatscatscatscatscatsca tscatscatscatscat scatscatscatscatscatscatscatscatscatscats catscatscatscatscatsc atscatscatscatscat scatscatscatscatscat scatscatscatscatsca tscatscatscatscatsc atscats", \
					  				"amplifiers": "" \
					  			  }, \
					  			  { \
					  				"id": "1-1", \
					  				"type": "justification", \
					  				"contents": "catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscats", \
					  				"amplifiers": [ \
						  				{ \
						  				"id": "2-0", \
						  				"type": "justification", \
						  				"contents": "Here is some more text. And it\'s not just any text, but THE very best text possible--especially since it\'s about how the moon\'s made out of some kinda weird ass soy-based Wallace and Grommit cheese.", \
						  				"amplifiers": [ \
							  				{ \
							  				"id": "3-0", \
							  				"type": "justification", \
							  				"contents": "Here is some more text. And it\'s not just any text, but THE very best text possible--especially since it\'s about how the moon\'s made out of some kinda weird ass soy-based Wallace and Grommit cheese.", \
							  				"amplifiers": "" \
							  			  }, \
							  			  { \
							  				"id": "3-1", \
							  				"type": "justification", \
							  				"contents": "catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscats", \
							  				"amplifiers": "" \
							  			  }] \
						  			  }, \
						  			  { \
						  				"id": "2-1", \
						  				"type": "justification", \
						  				"contents": "catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscats", \
						  				"amplifiers": "" \
						  			  }] \
					  			  }] \
					 }';

	var hypothesisModel = jQuery.parseJSON(hypothesisModelString);
	var cellString = '<div class="cellborder"></div>';
	var cellCount = 0;

	function walkJSON(json, depth, parent, cells) {
		if (json instanceof Array) {
			for (var element in json) {
				walkJSON(json[element], depth, parent, cells);	
			}
		} else {
			var thisCell = $(cellString);
			parent.append(thisCell);
			cells.push(thisCell);
			cellCount++;

			for (var key in json) {
	    		thisCell.append(key + ": ");

		    	var value = json[key]
		    	if (typeof(value) == "object") {
	    			var subCells = walkJSON(value, depth+1, parent, []);
	    			cells.push(subCells);
		    	} else {
    				thisCell.append(value);
    				thisCell.append("<br>");
		    	}
		    }
		}

		return cells;
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
				// var top = numberOnly(cells[i].css('padding-top')) + numberOnly(cells[i].css('border-top'));
				// var bottom = numberOnly(cells[i].css('padding-bottom')) + numberOnly(cells[i].css('border-bottom'));
				// var total = top + bottom;
				// console.log("top: " + top + ", bottom: " + bottom + ", total: " + total);
				y += cells[i].outerHeight();
			}
		};
	}

	function setXPositions(x, depth, cells) {
		var childrenStack = [];
		for (var i = 0; i < cells.length; i++) {
			if (cells[i] instanceof Array) {
				childrenStack.push(cells[i]);
			} else {
				cells[i].css('left', x);
			}
		};

		for (var i = 0; i < childrenStack.length; i++) {
			setXPositions(x + ((depth+1)*40), depth+1, childrenStack[i]);
		}
	}

	function numberOnly(number) {
		if (typeof(number) === 'number')
			return number;

		var endIndex = 1;
		for (var i = 0; i < number.length; i++) {
			var character = number[i];
			if (typeof(character) === 'number' && typeof(character) !== NaN) {
				console.log("asdfasdf");
				endIndex++;
			} else
				break;
		}

		return parseInt(number.substring(0, endIndex));
	}

	var hypothesisNode = $('<div class="cellborder" id="hyproot" style="position: absolute; width: 80%; margin-left: auto; margin-right: auto;"></div>');
	$('body').append(hypothesisNode);
	hypothesisNode.append(buildHeader(hypothesisModel.name, hypothesisModel.author));

	var cells = walkJSON(hypothesisModel.amplifiers, 0, $("#hyproot"), []);

	// console.log(cells);

	setXPositions(0, 0, cells);
	setYPositions(hypothesisNode.outerHeight(), cells);
});