angular.module('app', [])
   .controller('MainCtrl', function ($scope) {
      var data = $scope.data = [];
      (function () {
         var indent = 0;
         var parents = [];
         // prepare the data
         for (var i = 0; i < 1000; i++) {
            var d = (data[i] = {});
            var parent;
            if (Math.random() > 0.8 && i > 0) {
               indent++;
               parents.push(i - 1);
            } else if (Math.random() < 0.3 && indent > 0) {
               indent--;
               parents.pop();
            }

            if (parents.length > 0) {
               parent = parents[parents.length - 1];
            } else {
               parent = null;
            }
            d['id'] = 'id_' + i;
            d['indent'] = indent;
            d['parent'] = parent;
            d['title'] = 'Task ' + i;
            d['duration'] = '5 days';
            d['percentComplete'] = Math.round(Math.random() * 100);
            d['start'] = '01/01/2009';
            d['finish'] = '01/05/2009';
            d['effortDriven'] = (i % 5 == 0);
         }
      })();

      var TaskNameFormatter = function (row, cell, value, columnDef, dataContext) {
         value = value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
         var spacer = '<span style="display:inline-block;height:1px;width:" + (15 * dataContext["indent"]) + "px"></span>';
         var idx = $scope.dataView.getIdxById(dataContext.id);
         if (data[idx + 1] && data[idx + 1].indent > data[idx].indent) {
            if (dataContext._collapsed) {
               return spacer + ' <span class="toggle expand"></span>&nbsp;' + value;
            } else {
               return spacer + ' <span class="toggle collapse"></span>&nbsp;' + value;
            }
         } else {
            return spacer + ' <span class="toggle"></span>&nbsp;' + value;
         }
      };

      function requiredFieldValidator(value) {
         if (value == null || value == undefined || !value.length) {
            return {valid: false, msg: 'This is a required field'};
         } else {
            return {valid: true, msg: null};
         }
      }

      var columns = [
         {
            id: 'title',
            name: 'Title',
            field: 'title',
            width: 220,
            cssClass: 'cell-title',
            // formatter: TaskNameFormatter,
            editor: Slick.Editors.Text,
            validator: requiredFieldValidator
         },
         {id: 'duration', name: 'Duration', field: 'duration', editor: Slick.Editors.Text},
         {
            id: '%',
            name: '% Complete',
            field: 'percentComplete',
            width: 80,
            resizable: false,
            formatter: Slick.Formatters.PercentCompleteBar,
            editor: Slick.Editors.PercentComplete
         },
         {id: 'start', name: 'Start', field: 'start', minWidth: 60, editor: Slick.Editors.Date},
         {id: 'finish', name: 'Finish', field: 'finish', minWidth: 60, editor: Slick.Editors.Date},
         {
            id: 'effort-driven',
            name: 'Effort Driven',
            width: 80,
            minWidth: 20,
            maxWidth: 80,
            cssClass: 'cell-effort-driven',
            field: 'effortDriven',
            formatter: Slick.Formatters.Checkmark,
            editor: Slick.Editors.Checkbox,
            cannotTriggerInsert: true
         }
      ];
      var options = {
         editable: true,
         enableAddRow: true,
         enableCellNavigation: true,
         asyncEditorLoading: false
      };
      $scope.config = {
         columns: columns,
         options: options
      };
   })

   .
   directive('slickgrid', function () {
      return {
         restrict: 'EA',
         scope: {
            config: '=',
            data: '='
         },
         // priority: 0,
         templateUrl: 'slickgrid.tpl.html',
         link: function (scope, elem, attrs, ngModelCtrl) {


            var grid;
            var columns = scope.config.columns;
            var options = scope.config.options;


            // initialize the model
            scope.dataView = new Slick.Data.DataView({inlineFilters: true});
            scope.dataView.beginUpdate();
            scope.dataView.setItems(scope.data);
            // scope.dataView.setFilter(myFilter);
            scope.dataView.endUpdate();
            // initialize the grid
            grid = new Slick.Grid('#myGrid', scope.dataView, columns, options);
            grid.onCellChange.subscribe(function (e, args) {
               scope.dataView.updateItem(args.item.id, args.item);
            });

            grid.onClick.subscribe(function (e, args) {
               if ($(e.target).hasClass('toggle')) {
                  var item = scope.dataView.getItem(args.row);
                  if (item) {
                     if (!item._collapsed) {
                        item._collapsed = true;
                     } else {
                        item._collapsed = false;
                     }
                     scope.dataView.updateItem(item.id, item);
                  }
                  e.stopImmediatePropagation();
               }
            });
            // wire up model events to drive the grid
            scope.dataView.onRowCountChanged.subscribe(function (e, args) {
               grid.updateRowCount();
               grid.render();
            });
            scope.dataView.onRowsChanged.subscribe(function (e, args) {
               grid.invalidateRows(args.rows);
               grid.render();
            });

         }
      }
   });