'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Typeahead = (0, _recompose.compose)((0, _recompose.defaultProps)({
    onChange: function onChange() {},
    option: [],
    maxVisible: 10
}), (0, _recompose.withState)("open", "setOpen", false))(function (props) {
    return _react2.default.createElement(
        'div',
        { className: 'typeahead typeahead-input-wrap' },
        _react2.default.createElement('input', {
            onBlur: function onBlur() {
                return setTimeout(function () {
                    return props.setOpen(false);
                }, 400);
            },
            onFocus: function onFocus() {
                return props.setOpen(true);
            },
            type: 'text',
            value: props.value,
            onChange: props.onChange,
            required: props.isRequired,
            name: props.filterOption
        }),
        props.options.length && props.value.length ? _react2.default.createElement('input', {
            onChange: function onChange() {
                return null;
            },
            value: props.options[0][props.filterOption],
            type: 'text',
            className: 'typeahead-input-hint'
        }) : null,
        props.isMaterialStyle == true && _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement('i', { className: 'bar' }),
            _react2.default.createElement(
                'label',
                { className: 'label' },
                props.labelName
            )
        ),
        props.open && props.options.length && props.value.length ? _react2.default.createElement(
            'ul',
            { className: 'typeahead-selector' },
            props.options.filter(function (item, i) {
                return i < props.maxVisible;
            }).map(function (item, i) {
                return _react2.default.createElement(
                    'li',
                    {
                        key: i,
                        onClick: function onClick() {
                            props.onOptionSelected(item);
                            props.setOpen(false);
                        }
                    },
                    props.displayOption(item)
                );
            })
        ) : null
    );
});

exports.default = Typeahead;