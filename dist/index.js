'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _finder = require('./finder');

var _AddressTypeahead = require('./AddressTypeahead.component');

var _AddressTypeahead2 = _interopRequireDefault(_AddressTypeahead);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AddressForm = function (_React$Component) {
  _inherits(AddressForm, _React$Component);

  function AddressForm(props) {
    _classCallCheck(this, AddressForm);

    var _this = _possibleConstructorReturn(this, (AddressForm.__proto__ || Object.getPrototypeOf(AddressForm)).call(this, props));

    _this.state = {
      addressObj: undefined
    };
    _this.setAddressObj = _this.setAddressObj.bind(_this);
    return _this;
  }

  _createClass(AddressForm, [{
    key: 'setAddressObj',
    value: function setAddressObj(addressObj) {
      this.setState({ addressObj: addressObj });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var addressObj = this.state.addressObj;

      return _react2.default.createElement(
        'div',
        null,
        Object.keys(_finder.fieldsEnum).map(function (key) {
          var name = void 0;
          var isMaterialStyle = _this2.props.isMaterialStyle || false;
          var isRequired = _this2.props.isRequired || false;
          switch (_finder.fieldsEnum[key]) {
            case 'd':
              name = _this2.props.districtLabel || 'ตำบล';break;
            case 'a':
              name = _this2.props.amphoeLabel || 'อำเภอ';break;
            case 'p':
              name = _this2.props.provinceLabel || 'จังหวัด';break;
            case 'z':
              name = _this2.props.zipcodeLabel || 'รหัสไปรษณีย์';break;
            default:
              name = '';break;
          }
          return _react2.default.createElement(
            'div',
            { key: key, className: 'typeahead-address-container' },
            !isMaterialStyle && _react2.default.createElement(
              'label',
              { className: 'typeahead-address-label', htmlFor: 'district' },
              name
            ),
            _react2.default.createElement(_AddressTypeahead2.default, {
              renderResult: _this2.props.renderResult,
              onOptionSelected: function onOptionSelected(result) {
                _this2.setAddressObj(result);
                _this2.props.onAddressSelected(result);
              },
              value: addressObj ? addressObj[_finder.fieldsEnum[key]] : '',
              fieldType: _finder.fieldsEnum[key],
              labelName: name,
              isMaterialStyle: isMaterialStyle,
              isRequired: isRequired
            })
          );
        })
      );
    }
  }]);

  return AddressForm;
}(_react2.default.Component);

exports.default = AddressForm;