'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _recompose = require('recompose');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Typeahead = require('./Typeahead.component');

var _Typeahead2 = _interopRequireDefault(_Typeahead);

var _finder = require('./finder');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddressTypeaheadComponent = function AddressTypeaheadComponent(props) {
  var searchStr = props.searchStr,
      setSearchStr = props.setSearchStr,
      fieldType = props.fieldType,
      options = props.options;

  if (!fieldType) {
    console.warn('No field type provide');
    return _react2.default.createElement('div', null);
  }
  return _react2.default.createElement(_Typeahead2.default, {
    displayOption: props.renderResult,
    filterOption: fieldType,
    options: options,
    maxVisible: 5,
    value: searchStr,
    onChange: function onChange(e) {
      return setSearchStr(e.target.value);
    },
    onOptionSelected: function onOptionSelected(option) {
      return props.onOptionSelected(option);
    }
  });
};

var AddressTypeahead = (0, _recompose.compose)((0, _recompose.withState)('searchStr', 'setSearchStr', ''), (0, _recompose.lifecycle)({
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.props.setSearchStr(nextProps.value);
    }
  }
}), (0, _recompose.withProps)(function (_ref) {
  var searchStr = _ref.searchStr,
      fieldType = _ref.fieldType;
  return {
    options: (0, _finder.resolveResultbyField)(fieldType, searchStr)
  };
}), (0, _recompose.defaultProps)({
  renderResult: function renderResult(data) {
    return _react2.default.createElement(
      'span',
      null,
      data.d + ' \xBB ' + data.a + ' \xBB ' + data.p + ' \xBB ',
      data.z || _react2.default.createElement(
        'li',
        null,
        'ไม่มีรหัสไปรษณีย์'
      )
    );
  },
  value: ''
}))(AddressTypeaheadComponent);

exports.default = AddressTypeahead;