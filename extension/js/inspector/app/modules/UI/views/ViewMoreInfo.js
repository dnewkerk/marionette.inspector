define([
  'marionette',
  'util/Radio',
  "text!templates/devTools/ui/moreInfo.html",
  'app/behaviors/SidebarPanes',
  'util/presenters/formatEL'
], function(Marionette, Radio, tpl, SidebarPanesBehavior, formatEL) {

  return Marionette.ItemView.extend({
    template: tpl,

    events: {
      'click @ui.uiElement': 'onClickUIElement',
      'click @ui.eventHandler': 'onClickEventHandler'
    },

    ui: {
      uiElement: '[data-ui-elem]',
      eventHandler: '[data-event]'
    },

    behaviors: {
      sidebarPanes: {
        behaviorClass: SidebarPanesBehavior,
      }
    },

    onClickPanelHeader: function(e) {
      var $target = $(e.currentTarget);
      $target.toggleClass('expanded');
      $target.next().toggleClass('visible');
    },

    onClickUIElement: function(e) {
      var $target = $(e.currentTarget);
      var uiElement = $target.data('ui-elem');

      Radio.command('ui', 'inspect:view-element', {
        viewPath: this.model.get('path'),
        viewPropPath: ['ui'].concat(uiElement).join('.')
      })
    },

    onClickEventHandler: function(e) {
      var $target = $(e.currentTarget);
      var eventHandler = $target.data('event');

      Radio.command('ui', 'inspect:view-function', {
        viewPath: this.model.get('path'),
        viewPropPath: eventHandler
      })
    },

    presentUI: function(ui) {
      var data = _.clone(ui);

      if (_.isEmpty(ui)) {
        return data;
      }

      data = _.map(data, function(_ui, i) {
        return {
          ui: _ui.ui,
          element: formatEL(_ui.element)
        }
      })

      return data;
    },

    presentEvents: function(viewModel) {
      var events = [];
      return events
        .concat(this._presentEvents(null, viewModel.get('events')))
        .concat(this._presentEvents('model', viewModel.get('modelEvents')))
        .concat(this._presentEvents('collection', viewModel.get('collectionEvents')))
    },

    _presentEvents: function(objName, events) {
      var data = _.clone(events);

      if (_.isEmpty(events)) {
        return data;
      }

      data = _.map(data, function(_event, i) {

        var handler;
        if (_event.isFunction) {
          if (_event.isNativeFunction) {
            handler = 'native function';
          } else {
            handler = 'inline function';
          }
        } else {
          handler = _event.eventHandler;
        }


        var eventName = (!!this.objName) ? (this.objName + " " + _event.eventName) : _event.eventName;

        return {
          event: eventName,
          handler: handler
        }
      }, {objName: objName});

      return data;
    },



    serializeData: function() {
      var data = this.serializeModel(this.model);
      data.events = this.presentEvents(this.model);
      data.ui = this.presentUI(this.model.get('ui'));
      return data;
    }
  });
});
