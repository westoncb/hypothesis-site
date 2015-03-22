$(document).ready(function(){

	function numberOnly(number) {
		if (typeof(number) === 'number')
			return number;

		var endIndex = 1;
		for (var i = 0; i < number.length; i++) {
			var character = number[i];
			if ((typeof(character) === 'number' && typeof(character) !== NaN) || character === '-' || character === '+' || character === '.') {
				endIndex++;
			} else
				break;
		}

		return parseInt(number.substring(0, endIndex));
	}

	var hypothesisModelString = '{"id": "0-0", \
					  "name": "The moon is made of cheese.", \
					  "author": "Sofia Chandler-Freed", \
					  "amplifiers": [ \
					  				{ \
					  				"<b>ID</b>": "1-0", \
					  				"<b>Type</b>": "justification", \
					  				"<b>Contents</b>": "If one looks to the moon, one will undeniably discover a range of hues therein; and, my reader will grant me, that upon observing these definite hues, if one ponders thusly, \'to what other material object could these hues correspond?\'&mdash;one will have no alternative but respond, \'to cheese these hues are related.\'", \
					  				"<b>Amplifiers</b>": "" \
					  			  }, \
					  			  { \
					  				"<b>ID</b>": "1-1", \
					  				"<b>Type</b>": "justification", \
					  				"<b>Contents</b>": "If one looks to the moon, one will undeniably discover a range of hues therein; and, my reader will grant me, that upon observing these definite hues, if one ponders thusly, \'to what other material object could these hues correspond?\'&mdash;one will have no alternative but respond, \'to cheese these hues are related.\'", \
					  				"<b>Amplifiers</b>": [ \
						  				{ \
						  				"<b>ID</b>": "2-0", \
						  				"<b>Type</b>": "justification", \
						  				"<b>Contents</b>": "If one looks to the moon, one will undeniably discover a range of hues therein; and, my reader will grant me, that upon observing these definite hues, if one ponders thusly, \'to what other material object could these hues correspond?\'&mdash;one will have no alternative but respond, \'to cheese these hues are related.\'", \
						  				"<b>Amplifiers</b>": [ \
							  				{ \
							  				"<b>ID</b>": "3-0", \
							  				"<b>Type</b>": "justification", \
							  				"<b>Contents</b>": "If one looks to the moon, one will undeniably discover a range of hues therein; and, my reader will grant me, that upon observing these definite hues, if one ponders thusly, \'to what other material object could these hues correspond?\'&mdash;one will have no alternative but respond, \'to cheese these hues are related.\'", \
							  				"<b>Amplifiers</b>": "" \
							  			  }, \
							  			  { \
							  				"<b>ID</b>": "3-1", \
							  				"<b>Type</b>": "justification", \
							  				"<b>Contents</b>": "If one looks to the moon, one will undeniably discover a range of hues therein; and, my reader will grant me, that upon observing these definite hues, if one ponders thusly, \'to what other material object could these hues correspond?\'&mdash;one will have no alternative but respond, \'to cheese these hues are related.\'", \
							  				"<b>Amplifiers</b>": [ \
								  				{ \
								  				"<b>ID</b>": "4-0", \
								  				"<b>Type</b>": "justification", \
								  				"<b>Contents</b>": "If one looks to the moon, one will undeniably discover a range of hues therein; and, my reader will grant me, that upon observing these definite hues, if one ponders thusly, \'to what other material object could these hues correspond?\'&mdash;one will have no alternative but respond, \'to cheese these hues are related.\'", \
								  				"<b>Amplifiers</b>": "" \
								  			  }, \
								  			  { \
								  				"<b>ID</b>": "4-1", \
								  				"<b>Type</b>": "justification", \
								  				"<b>Contents</b>": "If one looks to the moon, one will undeniably discover a range of hues therein; and, my reader will grant me, that upon observing these definite hues, if one ponders thusly, \'to what other material object could these hues correspond?\'&mdash;one will have no alternative but respond, \'to cheese these hues are related.\'", \
								  				"<b>Amplifiers</b>": "" \
								  			  }] \
							  			  }] \
						  			  }, \
						  			  { \
						  				"<b>ID</b>": "2-1", \
						  				"<b>Type</b>": "justification", \
						  				"<b>Contents</b>": "If one looks to the moon, one will undeniably discover a range of hues therein; and, my reader will grant me, that upon observing these definite hues, if one ponders thusly, \'to what other material object could these hues correspond?\'&mdash;one will have no alternative but respond, \'to cheese these hues are related.\'", \
						  				"<b>Amplifiers</b>": "" \
						  			  }] \
					  			  }] \
					 }';

	var hypothesisModel = jQuery.parseJSON(hypothesisModelString);
	var cellString = '<div class="cellborder"></div>';
	var cellLeftMarginString = '<div class="cellleftmargin"><div class="treeVertical"></div><div class="treeHorizontal"></div></div>'; 
	var cellContainerString = '<div class="cellcontainer"></div>';
	const subCellShiftWidth = 50;

	function buildComponentTree(json, root, parent, cells) {
		if (json instanceof Array) {
			for (var element in json) {
				buildComponentTree(json[element], root, parent, cells);	
			}
		} else {
			var thisCell = $(cellString);
			var thisContainer = $(cellContainerString);
			var thisCellLeftMargin = $(cellLeftMarginString);
			var atTheRoot = (root === parent);

			var node = {
				container: thisContainer,
				leftMargin: thisCellLeftMargin,
				cell: thisCell,
				parent: (atTheRoot ? 0 : parent),
				childSet: [],
				isOpen: function() {
					if (this.childSet.length == 0)
						return true;

					var isit = this.childSet[0].container.is(":visible");
					return isit;
				},

				recursiveHideChildren: function(func) {
					for (var i = 0; i < this.childSet.length; i++) {
						var child = this.childSet[i];
						// child.container.slideUp({progress: func,
						// 						 duration: 300});
						child.container.hide();
						child.recursiveHideChildren();
					};
				},

				recursiveShowChildren: function() {
					for (var i = 0; i < this.childSet.length; i++) {
						var child = this.childSet[i];
						child.container.show();
						child.recursiveShowChildren();
					};
				},

				showChildren: function(func) {
					for (var i = 0; i < this.childSet.length; i++) {
						var child = this.childSet[i];
							// child.container.slideDown({progress: func,
							// 						 duration: 300});
						child.container.show();
					};	
				},

				hideChildren: function() {
					for (var i = 0; i < this.childSet.length; i++) {
						var child = this.childSet[i];
						child.container.hide();
					};	
				}
			};

			if (node.parent.childSet)
				node.parent.childSet.push(node);

			thisContainer.append(thisCellLeftMargin);
			thisContainer.append(thisCell);
			root.append(thisContainer);
			cells.push(node);

			for (var key in json) {
	    		thisCell.append(key + ": ");

		    	var value = json[key]
		    	if (typeof(value) == "object") {
	    			var subCells = buildComponentTree(value, root, node, []);
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

	//func takes (node, depth)
	function walkCellsBreadthFirst(cells, depth, func) {
		var childrenStack = [];

		for (var i = 0; i < cells.length; i++) {
			if (cells[i] instanceof Array) {
				childrenStack.push(cells[i]);
			} else {
				func(cells[i], depth);
			}
		};

		for (var i = 0; i < childrenStack.length; i++) {
			walkCellsBreadthFirst(childrenStack.shift(), depth+1, func);
		}
	}

	var buildLeftMargin = function(node, depth) {
		if (depth > 0) {
			var x = (depth)*subCellShiftWidth
			var cellContainer = node.container;
			var cell = node.cell;
			var cellLeftMargin = node.leftMargin;
			var parent = node.parent.cell;
			var treeVertical = cellLeftMargin.find('.treeVertical');
			var treeHorizontal = cellLeftMargin.find('.treeHorizontal');

			var parentWidth = cellContainer.width();
			var cellContainerMarginTop = numberOnly(cellContainer.css('margin-top'));
			var cellHeight = cell.outerHeight() + cellContainerMarginTop;
			var distanceFromParent = cell.offset().top - (parent.offset().top + parent.outerHeight());

			cellLeftMargin.css('width', x);
			cell.css('width', parentWidth - x);
			cell.css('margin-left', x);
			cellLeftMargin.css('height', cellHeight);

			treeVertical.css('right', subCellShiftWidth/2);
			treeVertical.css('bottom', cellHeight/2);
			treeVertical.css('height', distanceFromParent + cellHeight/2 - cellContainerMarginTop);

			treeHorizontal.css('width', subCellShiftWidth/2 + treeVertical.width());
			treeHorizontal.css('top', cellHeight/2);
			treeHorizontal.css('right', 0);
		}
	}

	var hypothesisNode = $('<div class="cellborderroot" id="hyproot" style="position: relative; width: 80%; margin-left: auto; margin-right: auto;"></div>');
	$('body').append(hypothesisNode);
	hypothesisNode.append(buildHeader(hypothesisModel.name, hypothesisModel.author));

	var cells = buildComponentTree(hypothesisModel.amplifiers, $("#hyproot"), $("#hyproot"), []);

	var layoutCells = function() {
		walkCellsBreadthFirst(cells, 0, buildLeftMargin);
	}

	var attachClickFunction = function(node, depth) {
		node.cell.click(function(event) {
			
			if (node.isOpen())
				node.recursiveHideChildren(layoutCells);
			else
				node.showChildren(layoutCells);

			layoutCells();
		});
	}


	walkCellsBreadthFirst(cells, 0, attachClickFunction);
	walkCellsBreadthFirst(cells, 0, function(node, depth) {
		if (depth > 0) {
			node.container.hide();
		}
	})

	layoutCells(cells);

	$(window).resize(function() {
		layoutCells(cells);
	});
	$(window).load(function() {
		layoutCells(cells);
	});
});