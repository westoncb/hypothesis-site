$(document).ready(function(){

	function numberOnly(number) {
		if (typeof(number) === 'number')
			return number;

		var endIndex = 1;
		for (var i = 0; i < number.length; i++) {
			var character = number[i];
			if ((typeof(character) === 'number' && typeof(character) !== NaN) || character === '-') {
				console.log("asdfasdf");
				endIndex++;
			} else
				break;
		}

		return parseInt(number.substring(0, endIndex));
	}

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
							  				"amplifiers": [ \
								  				{ \
								  				"id": "4-0", \
								  				"type": "justification", \
								  				"contents": "Here is some more text. And it\'s not just any text, but THE very best text possible--especially since it\'s about how the moon\'s made out of some kinda weird ass soy-based Wallace and Grommit cheese.", \
								  				"amplifiers": "" \
								  			  }, \
								  			  { \
								  				"id": "4-1", \
								  				"type": "justification", \
								  				"contents": "catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscatscats catscatscatscatscatscatscatscatscatscatscatscatscatscats", \
								  				"amplifiers": "" \
								  			  }] \
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
	var cellLeftMarginString = '<div class="cellleftmargin"><div class="treeVertical"></div><div class="treeHorizontal"></div></div>'; 
	var cellContainerString = '<div class="cellcontainer"></div>';
	const subCellShiftWidth = 50;

	function walkJSON(json, depth, root, parent, cells) {
		if (json instanceof Array) {
			for (var element in json) {
				walkJSON(json[element], depth, root, parent, cells);	
			}
		} else {
			var thisCell = $(cellString);
			var thisContainer = $(cellContainerString); 
			var thisCellLeftMargin = $(cellLeftMarginString);

			var node = {
				container: thisContainer,
				leftMargin: thisCellLeftMargin,
				cell: thisCell,
				parent: parent
			};

			thisContainer.append(thisCellLeftMargin);
			thisContainer.append(thisCell);
			root.append(thisContainer);
			cells.push(node);

			for (var key in json) {
	    		thisCell.append(key + ": ");

		    	var value = json[key]
		    	if (typeof(value) == "object") {
	    			var subCells = walkJSON(value, depth+1, root, node, []);
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
			</div><div class="sep1"></div><br>';
	}

	// function setYPositions(y, index, cells) {
	// 	for (var i = 0; i < cells.length; i++) {
	// 		var cell = cells[i];
	// 		if (cell instanceof Array) {
	// 			y = setYPositions(y, index, cell);
	// 		} else {
	// 			index[0] += 1;
	// 			cell.css('top', y - (index[0] * 5));
	// 			y += cell.outerHeight();
	// 		}
	// 	};

	// 	return y;
	// }

	function setXPositions(x, depth, cells) {
		var childrenStack = [];
		for (var i = 0; i < cells.length; i++) {
			if (cells[i] instanceof Array) {
				childrenStack.push(cells[i]);
			} else {
				if (depth > 0) {
					var cellContainer = cells[i].container;
					var parentWidth = cellContainer.width();
					var cellContainerMarginTop = numberOnly(cellContainer.css('margin-top'));
					var cell = cells[i].cell;
					console.log(cellContainerMarginTop);
					var cellHeight = cell.outerHeight() + cellContainerMarginTop;
					var cellLeftMargin = cells[i].leftMargin;

					cellLeftMargin.css('width', x);
					cell.css('width', parentWidth - x);
					cell.css('margin-left', x);
					cellLeftMargin.css('height', cellHeight);

					var parent = cells[i].parent.cell;
					var treeVertical = cellLeftMargin.find('.treeVertical');
					var treeHorizontal = cellLeftMargin.find('.treeHorizontal');
					var distanceFromParent = cell.offset().top - (parent.offset().top + parent.outerHeight());

					treeVertical.css('right', subCellShiftWidth/2);
					treeVertical.css('bottom', cellHeight/2);
					treeVertical.css('height', distanceFromParent + cellHeight/2 - cellContainerMarginTop);

					treeHorizontal.css('width', subCellShiftWidth/2 + treeVertical.width());
					treeHorizontal.css('top', cellHeight/2);
					treeHorizontal.css('right', 0);
				}
			}
		};

		for (var i = 0; i < childrenStack.length; i++) {
			var xOffset = (depth+1)*subCellShiftWidth;
			setXPositions(xOffset, depth+1, childrenStack.pop());
		}
	}

	var hypothesisNode = $('<div class="cellborder" id="hyproot" style="position: relative; width: 80%; margin-left: auto; margin-right: auto;"></div>');
	$('body').append(hypothesisNode);
	hypothesisNode.append(buildHeader(hypothesisModel.name, hypothesisModel.author));
	var cells = walkJSON(hypothesisModel.amplifiers, 0, $("#hyproot"), $("#hyproot"), []);
	
	function layoutCells(cells) {
		setXPositions(0, 0, cells);
		// setYPositions(0, [0], cells);
	}

	layoutCells(cells);

	$(window).resize(function() {
		layoutCells(cells);
	});
	$(window).load(function() {
		layoutCells(cells);
	});
});