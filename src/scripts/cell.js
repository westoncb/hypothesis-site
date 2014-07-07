$(document).ready(function() {

	var cellPattern = createElementPattern('cell');
	var cellShellPattern = createElementPattern('cellShell');
	var cellSkinPattern = createElementPattern('cellSkin');
	var cellUnderbellyPattern = createElementPattern('cellUnderbelly');
	var cellTopPattern = createElementPattern('cellTop');
	var cellBodyPattern = createElementPattern('cellBody');
	var cellBottomPattern = createElementPattern('cellBottom');
	var cellLeftMarginPattern = createElementPattern('cellLeftMargin');
	var branchVerticalPattern = createElementPattern('branchVertical');
	var branchHorizontalPattern = createElementPattern('branchHorizontal');

	Cell.borderTop = 2;
	Cell.borderRight = 15;
	Cell.borderBottom = 6;
	Cell.borderLeft = 5;
	Cell.topHeight = 14;
	Cell.bottomHeight = 25;
	Cell.shellMarginTop = -5;

	function Cell() {
		this.cellShell = $(cellShellPattern);
		this.cellSkin = $(cellSkinPattern);
		this.cellLeftMargin = $(cellLeftMarginPattern);
		this.cell = $(cellPattern);
		this.cellUnderbelly = $(cellUnderbellyPattern);
		this.cellTop = $(cellTopPattern);
		this.cellBody = $(cellBodyPattern);
		this.cellBottom = $(cellBottomPattern);

		//assemble the components
		this.cellShell.append(this.cellLeftMargin);
		this.cellShell.append(this.cellSkin);
		this.cellSkin.append(this.cell);
		this.cellSkin.append(this.cellUnderbelly);
		this.cell.append(this.cellTop);
		this.cell.append(this.cellBody);
		this.cell.append(this.cellBottom);

		//
		//set any properties that may need to be calculated dynamically in the future
		//
		this.cellShell.css('margin-top', Cell.shellMarginTop);
		this.cellTop.css('height', Cell.topHeight);
		this.cell.css('padding-top', Cell.topHeight);
		this.cellTop.append('testasdfadsf');

		this.cellBottom.css('height', Cell.bottomHeight);
		this.cell.css('padding-bottom', Cell.bottomHeight);
		this.cellBottom.append('testsf');

		this.cellBody.css('height', 100);

		this.cell.css('border-top-width', Cell.borderTop);
		this.cell.css('border-Right-width', Cell.borderRight);
		this.cell.css('border-Bottom-width', Cell.borderBottom);
		this.cell.css('border-Left-width', Cell.borderLeft);

		var borderImageSliceValue = ""+Cell.borderTop+" "+Cell.borderRight+" "+Cell.borderBottom+" "+Cell.borderLeft+" fill";
		this.cell.css('border-image-slice', borderImageSliceValue);
		this.cell.css('-moz-border-image-slice', borderImageSliceValue);
		this.cell.css('-webkit-border-image-slice', borderImageSliceValue);
		this.cell.css('-o-border-image-slice', borderImageSliceValue);
	}

	Cell.prototype = {
		getDOMNode: function() {
			return this.cellShell;
		},

		getHeight: function() {
			return this.cellSkin.outerHeight() + Cell.shellMarginTop;	
		},

		setLeftMarginWidth: function(width) {
			this.cell.css('margin-left', width);
			this.cellLeftMargin.css('width', width);
			this.cellLeftMargin.css('height', this.getHeight());
		}
	}

	var cell = new Cell();

	var aTableOrSomething = $("<div style='background-color: white; width: 60%; height: 500px;'></div>");
	aTableOrSomething.append(cell.getDOMNode());
	getRootElement().append(aTableOrSomething);
	cell.setLeftMarginWidth(10);
	
	function createElementPattern(className, display, id) {
		var idPart = id ? ('id="' + id + '" ') : '';
		var displayPart = display ? ('style="display: ' + display + ';"') : '';
		var pattern = '<div class="' + className + '" ' + idPart + displayPart + "></div>";

		return pattern;
	}

	function getRootElement() {
		return $('body');
	}
});