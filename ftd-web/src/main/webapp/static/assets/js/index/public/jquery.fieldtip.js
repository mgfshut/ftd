;(function ($, window, document, undefined) {
	var FieldTip = function (eles, opts, tipDb) {
		this.$elements = eles
		this.defaults = {
			"container": "#TipMessage",
			"icosrc": "assets/img/question-frame.png",
			"icotitle": "字段说明将在底部展示"
		}
		this.defaultsTipDb = {
			"defaults": "未说明的提示语"
		}
		this.options = $.extend({}, this.defaults, opts)
		this.ttipDb = $.extend({}, this.defaultsTipDb, tipDb)
 	}

	FieldTip.prototype.addIcon = function () {
		var $icon = $('<img class="tip" width="30px" height="30px" src="'+ this.defaults.icosrc +'">')
		$icon
			.prop('title', this.defaults.icotitle)
			.css('cursor', 'pointer')
			.on('click', function (e) {
				$(this.defaults.container).show().html(this.ttipDb[$(e.currentTarget).prev().prop('id')]||this.ttipDb['defaults'])
			}.bind(this))

		return this.$elements.after($icon)
	}

	$.fn.fieldtip = function (opts, tipDb) {
		var ft = new FieldTip(this, opts, tipDb)
		return ft.addIcon()
	}

})(jQuery, window, document)