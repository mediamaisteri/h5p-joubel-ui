var H5P = H5P || {};

H5P.JoubelTip = (function ($) {

  /**
   * Creates a new tip
   *
   * @param {string} text The text to display in the popup
   * @param {object} params Additional parameters
   * @param {string} [params.tipLabel] Tip label
   */
  function JoubelTip(text, params) {
    var speechBubble;

    params = $.extend({
      showSpeechBubble: true,
      helpIcon: false
    }, params);

    var parsedTitle = text;
    if ($.parseHTML($.trim(text)).length) {
      parsedTitle = $.parseHTML($.trim(text))[0].textContent;
    }

    var $tip = $('<div/>', {
      class: 'joubel-tip-container' + (params.showSpeechBubble ? '' : ' be-quiet'),
      title: parsedTitle,
      role: 'button',
      tabindex: 0,
      click: function () {
        toggleSpeechBubble();

        return false;
      },
      keydown: function (e) {
        // Space
        if (e.which === 32) {
          toggleSpeechBubble();
          e.preventDefault();
        }
        else {
          toggleSpeechBubble(true);
        }
      }
    }).append($('<span/>', {
      'class': 'joubel-icon-tip-normal' + (params.helpIcon ? ' help-icon': '')
    }).append($('<span/>', {
      'class': 'path1'
    })).append($('<span/>', {
      'class': 'path2'
    })).append($('<span/>', {
      'class': 'path3'
    })));

    /**
     * Add or remove a speech bubble
     * @private
     * @param {boolean} [close] Forces tip close
     * @return {boolean}
     */
    function toggleSpeechBubble(close) {
      if (speechBubble !== undefined && speechBubble.isCurrent($tip)) {
        speechBubble.remove();
        speechBubble = undefined;
      }
      else if (!close && params.showSpeechBubble) {
        speechBubble = H5P.JoubelSpeechBubble($tip, text);
      }
    }

    return $tip;
  }

  return JoubelTip;
})(H5P.jQuery);
