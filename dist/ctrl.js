'use strict';

System.register(['app/plugins/sdk', 'lodash', 'app/core/utils/kbn', 'app/core/time_series', './external/d3.v3.min', './css/groupedBarChart.css!'], function (_export, _context) {
    "use strict";

    var MetricsPanelCtrl, _, kbn, TimeSeries, d3, _createClass, panelDefaults, GroupedBarChartCtrl;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }

    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }

    return {
        setters: [function (_appPluginsSdk) {
            MetricsPanelCtrl = _appPluginsSdk.MetricsPanelCtrl;
        }, function (_lodash) {
            _ = _lodash.default;
        }, function (_appCoreUtilsKbn) {
            kbn = _appCoreUtilsKbn.default;
        }, function (_appCoreTime_series) {
            TimeSeries = _appCoreTime_series.default;
        }, function (_externalD3V3Min) {
            d3 = _externalD3V3Min;
        }, function (_cssGroupedBarChartCss) {}],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            panelDefaults = {
                legend: {
                    show: true,
                    position: 'On graph'
                },
                chartType: 'stacked bar chart',
                labelOrientation: 'horizontal',
                orientation: 'vertical',
                avgLineShow: true,
                labelSpace: 40,
                links: [],
                datasource: null,
                interval: null,
                targets: [{}],
                cacheTimeout: null,
                nullPointMode: 'connected',
                aliasColors: {},
                format: 'short',
                valueName: 'current',
                strokeWidth: 1,
                fontSize: '80%',
                fontColor: '#fff',
                colorSet: [],
                colorSch: []
            };

            _export('GroupedBarChartCtrl', GroupedBarChartCtrl = function (_MetricsPanelCtrl) {
                _inherits(GroupedBarChartCtrl, _MetricsPanelCtrl);

                function GroupedBarChartCtrl($scope, $injector, $rootScope) {
                    _classCallCheck(this, GroupedBarChartCtrl);

                    var _this = _possibleConstructorReturn(this, (GroupedBarChartCtrl.__proto__ || Object.getPrototypeOf(GroupedBarChartCtrl)).call(this, $scope, $injector));

                    _this.hiddenSeries = {};
                    _this.data = null;

                    _.defaults(_this.panel, panelDefaults);

                    _this.events.on('init-edit-mode', _this.onInitEditMode.bind(_this));
                    _this.events.on('data-received', _this.onDataReceived.bind(_this));
                    _this.events.on('data-snapshot-load', _this.onDataReceived.bind(_this));
                    _this.events.on('data-error', _this.onDataError.bind(_this));
                    return _this;
                }

                _createClass(GroupedBarChartCtrl, [{
                    key: 'onInitEditMode',
                    value: function onInitEditMode() {
                        this.addEditorTab('Options', 'public/plugins/banburybill-groupedbarchart-panel/partials/editor.html', 2);
                        this.addEditorTab('Colors', 'public/plugins/banburybill-groupedbarchart-panel/partials/colors.html', 3);
                    }
                }, {
                    key: 'setUnitFormat',
                    value: function setUnitFormat(subItem) {
                        this.panel.format = subItem.value;
                        this.render();
                    }
                }, {
                    key: 'onDataError',
                    value: function onDataError() {
                        this.render();
                    }
                }, {
                    key: 'updateColorSet',
                    value: function updateColorSet() {
                        var _this2 = this;

                        this.panel.colorSch = [];
                        this.panel.colorSet.forEach(function (d) {
                            return _this2.panel.colorSch.push(d.color);
                        });
                        this.render();
                    }
                }, {
                    key: 'onDataReceived',
                    value: function onDataReceived(dataList) {
                        if (dataList && dataList.length) {
                            var res = [];
                            var attribs = {};
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = dataList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var l = _step.value;
                                    var _iteratorNormalCompletion3 = true;
                                    var _didIteratorError3 = false;
                                    var _iteratorError3 = undefined;

                                    try {
                                        for (var _iterator3 = l.rows[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                            var r = _step3.value;

                                            var e = {};
                                            e["label"] = r[0];
                                            var _iteratorNormalCompletion4 = true;
                                            var _didIteratorError4 = false;
                                            var _iteratorError4 = undefined;

                                            try {
                                                for (var _iterator4 = r[1][Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                                    var a = _step4.value;

                                                    e[a[0]] = +a[1];
                                                    attribs[a[0]] = true;
                                                }
                                            } catch (err) {
                                                _didIteratorError4 = true;
                                                _iteratorError4 = err;
                                            } finally {
                                                try {
                                                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                                        _iterator4.return();
                                                    }
                                                } finally {
                                                    if (_didIteratorError4) {
                                                        throw _iteratorError4;
                                                    }
                                                }
                                            }

                                            res.push(e);
                                        }
                                    } catch (err) {
                                        _didIteratorError3 = true;
                                        _iteratorError3 = err;
                                    } finally {
                                        try {
                                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                                _iterator3.return();
                                            }
                                        } finally {
                                            if (_didIteratorError3) {
                                                throw _iteratorError3;
                                            }
                                        }
                                    }
                                }
                            } catch (err) {
                                _didIteratorError = true;
                                _iteratorError = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion && _iterator.return) {
                                        _iterator.return();
                                    }
                                } finally {
                                    if (_didIteratorError) {
                                        throw _iteratorError;
                                    }
                                }
                            }

                            var _iteratorNormalCompletion2 = true;
                            var _didIteratorError2 = false;
                            var _iteratorError2 = undefined;

                            try {
                                for (var _iterator2 = res[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                    var _r = _step2.value;

                                    for (var _a in attribs) {
                                        if (!(_a in _r)) {
                                            _r[_a] = 0;
                                        }
                                    }
                                }
                            } catch (err) {
                                _didIteratorError2 = true;
                                _iteratorError2 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                        _iterator2.return();
                                    }
                                } finally {
                                    if (_didIteratorError2) {
                                        throw _iteratorError2;
                                    }
                                }
                            }

                            this.data = res;
                        } else {
                            this.data = [{ label: "Machine001", "Off": 15, "Down": 50, "Run": 0, "Idle": 40 }, { label: "Machine002", "Off": 15, "Down": 5, "Run": 40, "Idle": 15 }, { label: "Machine003", "Off": 15, "Down": 30, "Run": 40, "Idle": 15 }, { label: "Machine004", "Off": 15, "Down": 30, "Run": 80, "Idle": 15 }];
                        }

                        this.render();
                    }
                }, {
                    key: 'formatValue',
                    value: function formatValue(value) {
                        var decimalInfo = this.getDecimalsForValue(value);
                        var formatFunc = kbn.valueFormats[this.panel.format];
                        if (formatFunc) {
                            return formatFunc(value, decimalInfo.decimals, decimalInfo.scaledDecimals);
                        }
                        return value;
                    }
                }, {
                    key: 'link',
                    value: function link(scope, elem, attrs, ctrl) {
                        this.elem = elem;
                        this.panelContent = elem.find('.panel-content');

                        var groupedBarChart = function () {
                            function groupedBarChart(opts) {
                                var _this3 = this;

                                _classCallCheck(this, groupedBarChart);

                                this.data = opts.data;
                                this.margin = opts.margin;
                                this.panel = opts.panel;
                                this.showLegend = opts.legend;
                                this.legendType = opts.position;
                                this.chartType = opts.chartType;
                                this.orientation = opts.orientation;
                                this.labelSpace = opts.labelSpace;
                                this.fontColor = opts.fontColor;
                                this.labelOrientation = opts.labelOrientation;
                                this.avgLineShow = opts.avgLineShow;
                                this.axesConfig = [];
                                this.element = elem.find(opts.element)[0];
                                this.options = d3.keys(this.data[0]).filter(function (key) {
                                    return key !== 'label';
                                });
                                this.avgList = {};
                                this.options.forEach(function (d) {
                                    _this3.avgList[d] = 0;
                                });
                                this.options = this.options.filter(function (d) {
                                    return d !== 'valores';
                                });
                                this.data.forEach(function (d) {
                                    var stackVal = 0;
                                    d.valores = _this3.options.map(function (name, i, o) {
                                        if (i !== 0) stackVal = stackVal + +d[o[i - 1]];
                                        _this3.avgList[name] = _this3.avgList[name] + d[name];
                                        return { name: name, value: +d[name], stackVal: stackVal };
                                    });
                                });
                                this.options.forEach(function (d) {
                                    _this3.avgList[d] /= _this3.data.length;
                                });
                                if (opts.color.length == 0) {
                                    this.color = d3.scale.ordinal().range(d3.scale.category20().range());
                                } else {
                                    this.color = d3.scale.ordinal().range(opts.color);
                                }

                                this.draw();
                            }

                            _createClass(groupedBarChart, [{
                                key: 'draw',
                                value: function draw() {
                                    this.width = this.panel.width();
                                    this.height = this.panel.height();
                                    this.graphwidth = this.width / 1.5 - this.margin.left - this.margin.right;
                                    this.graphheight = this.height / 1.5 - this.margin.top - this.margin.bottom;
                                    d3.select(this.element).html("");
                                    this.svg = d3.select(this.element).append('svg');
                                    this.svg.attr('width', this.width).attr('height', this.height)
                                    //.attr('viewBox', `0, 0, ${this.width}, ${this.height}`)
                                    //.attr('preserveAspectRatio', 'xMinYMin meet')
                                    //.style('padding', '10px')
                                    .attr('transform', 'translate(0, ' + this.margin.top + ')');

                                    this.createScales();
                                    this.addAxes();
                                    this.addTooltips();
                                    this.addBar();
                                    if (this.showLegend) this.addLegend(this.legendType);
                                }
                            }, {
                                key: 'createScales',
                                value: function createScales() {
                                    switch (this.orientation) {
                                        case 'horizontal':
                                            this.y0 = d3.scale.ordinal().rangeRoundBands([+this.graphheight, 0], .2, 0.5);

                                            this.y1 = d3.scale.ordinal();

                                            this.x = d3.scale.linear().range([0, +this.graphwidth]);
                                            this.axesConfig = [this.x, this.y0, this.y0, this.y1, this.x];
                                            break;
                                        case 'vertical':
                                            this.x0 = d3.scale.ordinal().rangeRoundBands([0, +this.graphwidth], .2, 0.5);

                                            this.x1 = d3.scale.ordinal();

                                            this.y = d3.scale.linear().range([0, +this.graphheight]);

                                            this.axesConfig = [this.x0, this.y, this.x0, this.x1, this.y];
                                            break;
                                    }
                                }
                            }, {
                                key: 'addAxes',
                                value: function addAxes() {
                                    this.xAxis = d3.svg.axis().scale(this.axesConfig[0]).tickSize(-this.graphheight).orient('bottom');

                                    this.yAxis = d3.svg.axis().scale(this.axesConfig[1]).orient('left');

                                    this.axesConfig[2].domain(this.data.map(function (d) {
                                        return d.label;
                                    }));
                                    this.axesConfig[3].domain(this.options).rangeRoundBands([0, this.axesConfig[2].rangeBand()]);

                                    var chartScale = this.chartType === 'bar chart' ? 0 : 1;
                                    var domainCal = this.orientation === 'horizontal' ? [0, d3.max(this.data, function (d) {
                                        return d3.max(d.valores, function (d) {
                                            return d.value + chartScale * d.stackVal;
                                        });
                                    })] : [d3.max(this.data, function (d) {
                                        return d3.max(d.valores, function (d) {
                                            return d.value + chartScale * d.stackVal;
                                        });
                                    }), 0];
                                    this.axesConfig[4].domain(domainCal);

                                    var xAxisConfig = this.svg.append('g').attr('class', 'x axis').attr('transform', 'translate(' + this.margin.left + ', ' + (this.graphheight + this.margin.top) + ')').call(this.xAxis).selectAll('text').style('fill', '' + this.fontColor);

                                    switch (this.labelOrientation) {
                                        case 'horizontal':
                                            break;
                                        case '45 degrees':
                                            xAxisConfig.style('text-anchor', 'end').style('transform', 'rotate(-45deg)');
                                            break;
                                        case 'vertical':
                                            xAxisConfig.style('text-anchor', 'end').style('transform', 'rotate(-90deg)');
                                            break;
                                    }

                                    var yAxisConfig = this.svg.append('g').attr('class', 'y axis').attr('transform', 'translate(' + this.margin.left + ', ' + this.margin.top + ')').style('fill', '' + this.fontColor).call(this.yAxis);

                                    yAxisConfig.selectAll('text').style('fill', '' + this.fontColor);
                                    yAxisConfig.selectAll('path').style('stroke', '' + this.fontColor);
                                }
                            }, {
                                key: 'addBar',
                                value: function addBar() {
                                    var _this4 = this;

                                    var scale = this.chartType === 'bar chart' ? 1 : this.options.length;
                                    switch (this.orientation) {
                                        case 'horizontal':
                                            this.avgLineShow && this.options.forEach(function (d) {
                                                _this4.svg.append('line').attr('x1', _this4.x(_this4.avgList[d])).attr('y1', _this4.graphheight).attr('x2', _this4.x(_this4.avgList[d])).attr('y2', 0).attr('class', d + ' avgLine').attr('transform', 'translate(' + _this4.margin.left + ', ' + _this4.margin.top + ')').style('display', 'none').style('stroke-width', 2).style('stroke', _this4.color(d)).style('stroke-opacity', 0.7);
                                            });

                                            this.bar = this.svg.selectAll('.bar').data(this.data).enter().append('g').attr('class', 'rect').attr('transform', function (d) {
                                                return 'translate(' + _this4.margin.left + ', ' + (_this4.y0(d.label) + _this4.margin.top) + ')';
                                            });

                                            this.barC = this.bar.selectAll('rect').data(function (d) {
                                                return d.valores;
                                            }).enter();

                                            this.barC.append('rect').attr('height', this.y1.rangeBand() * scale).attr('y', function (d) {
                                                return _this4.chartType === 'bar chart' ? _this4.y1(d.name) : _this4.y0(d.label);
                                            }).attr('x', function (d) {
                                                return _this4.chartType === 'bar chart' ? 0 : _this4.x(d.stackVal);
                                            }).attr('value', function (d) {
                                                return d.name;
                                            }).attr('width', function (d) {
                                                return _this4.x(d.value);
                                            }).style('fill', function (d) {
                                                return _this4.color(d.name);
                                            });

                                            break;
                                        case 'vertical':
                                            this.avgLineShow && this.options.forEach(function (d) {
                                                _this4.svg.append('line').attr('x1', 0).attr('y1', _this4.y(_this4.avgList[d])).attr('x2', +_this4.graphwidth).attr('y2', _this4.y(_this4.avgList[d])).attr('class', d + ' avgLine').attr('transform', 'translate(' + _this4.margin.left + ', ' + _this4.margin.top + ')').style('display', 'none').style('stroke-width', 2).style('stroke', _this4.color(d)).style('stroke-opacity', 0.7);
                                            });

                                            this.bar = this.svg.selectAll('.bar').data(this.data).enter().append('g').attr('class', 'rect').attr('transform', function (d, i) {
                                                return 'translate(' + _this4.x0(d.label) + ', ' + (+_this4.graphheight + _this4.margin.top) + ')';
                                            });

                                            this.barC = this.bar.selectAll('rect').data(function (d) {
                                                return d.valores.map(function (e) {
                                                    e.label = d.label;return e;
                                                });
                                            }).enter();

                                            this.barC.append('rect').attr('id', function (d, i) {
                                                return d.label + '_' + i;
                                            }).attr('height', function (d) {
                                                return +_this4.graphheight - _this4.y(d.value);
                                            }).attr('y', function (d) {
                                                return _this4.chartType === 'bar chart' ? _this4.y(d.value) - _this4.graphheight : _this4.y(d.value) - 2 * +_this4.graphheight + _this4.y(d.stackVal);
                                            }).attr('x', function (d, i) {
                                                return _this4.chartType === 'bar chart' ? _this4.x1(d.name) + _this4.margin.left : _this4.x1(d.name) - _this4.x1.rangeBand() * i + _this4.margin.left;
                                            }).attr('value', function (d) {
                                                return d.name;
                                            }).attr('width', this.x1.rangeBand() * scale).style('fill', function (d) {
                                                return _this4.color(d.name);
                                            });

                                            break;
                                    }

                                    this.chartType === 'bar chart' && this.barC.append('text').attr('x', function (d) {
                                        return _this4.orientation === 'horizontal' ? _this4.x(d.value) + 5 : _this4.x1(d.name) + _this4.x1.rangeBand() / 4 + _this4.margin.left;
                                    }).attr('y', function (d) {
                                        return _this4.orientation === 'horizontal' ? _this4.y1(d.name) + _this4.y1.rangeBand() / 2 : _this4.y(d.value) - _this4.graphheight - 8;
                                    }).attr('dy', '.35em').style('fill', '' + this.fontColor).text(function (d) {
                                        return d.value ? d.value : '';
                                    });

                                    this.bar.on('mouseover', function (d) {
                                        _this4.tips.style('left', 10 + 'px');
                                        _this4.tips.style('top', 15 + 'px');
                                        _this4.tips.style('display', "inline-block");
                                        var elements = d3.selectAll(':hover')[0];
                                        var elementData = elements[elements.length - 1].__data__;
                                        _this4.tips.html(d.label + ' , ' + elementData.name + ' ,  ' + elementData.value);
                                        if (_this4.avgLineShow) d3.selectAll('.' + elementData.name)[0][0].style.display = '';
                                    });

                                    this.bar.on('mouseout', function (d) {
                                        _this4.tips.style('display', "none");
                                        d3.selectAll('.avgLine')[0].forEach(function (d) {
                                            d.style.display = 'none';
                                        });
                                    });
                                }
                            }, {
                                key: 'addLegend',
                                value: function addLegend(loc) {
                                    var _this5 = this;

                                    var labelSpace = this.labelSpace;
                                    switch (loc) {
                                        case 'On graph':
                                            var defaultOptions = this.chartType == 'bar chart' || this.orientation == 'horizontal' ? this.options.slice() : this.options.slice().reverse();
                                            this.legend = this.svg.selectAll('.legend').data(defaultOptions).enter().append('g').attr('class', 'legend').attr('transform', function (d, i) {
                                                return 'translate(50,' + (i * 20 + _this5.margin.top) + ')';
                                            });

                                            this.legend.append('rect').attr('x', this.graphwidth - 18).attr('width', 18).attr('height', 18).style('fill', this.color);

                                            this.legend.append('text').attr('x', this.graphwidth - 24).attr('y', 9).attr('dy', '.35em').style('text-anchor', 'end').style('fill', '' + this.fontColor).text(function (d) {
                                                return d;
                                            });
                                            break;
                                        case 'Under graph':
                                            this.legend = this.svg.selectAll('.legend').data(this.options.slice()).enter().append('g').attr('class', 'legend').attr('transform', function (d, i) {
                                                return 'translate(' + (+i * labelSpace - _this5.graphwidth) + ',' + (+_this5.graphheight + 24 + _this5.margin.top) + ')';
                                            });

                                            this.legend.append('rect').attr('x', function (d, i) {
                                                return i * labelSpace + _this5.margin.left + _this5.graphwidth * 1 + 0;
                                            }).attr('width', 18).attr('height', 18).style('fill', this.color);

                                            this.legend.append('text').attr('x', function (d, i) {
                                                return i * labelSpace + _this5.margin.left + _this5.graphwidth * 1 + 5;
                                            }).attr('dx', 18).attr('dy', '1.1em').style('text-anchor', 'start').style('fill', '' + this.fontColor).text(function (d) {
                                                return d;
                                            });
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }, {
                                key: 'addTooltips',
                                value: function addTooltips() {
                                    this.tips = d3.select(this.element).append('div').attr('class', 'toolTip');
                                }
                            }]);

                            return groupedBarChart;
                        }();

                        function onRender() {
                            if (!ctrl.data) return;
                            var Chart = new groupedBarChart({
                                data: ctrl.data,
                                margin: { top: 30, left: 80, bottom: 10, right: 10 },
                                panel: ctrl.panelContent,
                                element: '#chart',
                                legend: ctrl.panel.legend.show,
                                fontColor: ctrl.panel.fontColor,
                                position: ctrl.panel.legend.position,
                                chartType: ctrl.panel.chartType,
                                orientation: ctrl.panel.orientation,
                                labelOrientation: ctrl.panel.labelOrientation,
                                labelSpace: ctrl.panel.labelSpace,
                                avgLineShow: ctrl.panel.avgLineShow,
                                color: ctrl.panel.colorSch
                            });

                            ctrl.panel.colorSet = [];
                            Chart.options.forEach(function (d) {
                                ctrl.panel.colorSet.push({ text: d, color: Chart.color(d) });
                            });
                        }

                        this.events.on('render', function () {
                            onRender();
                        });
                    }
                }]);

                return GroupedBarChartCtrl;
            }(MetricsPanelCtrl));

            _export('GroupedBarChartCtrl', GroupedBarChartCtrl);

            GroupedBarChartCtrl.templateUrl = 'partials/module.html';
        }
    };
});
//# sourceMappingURL=ctrl.js.map
