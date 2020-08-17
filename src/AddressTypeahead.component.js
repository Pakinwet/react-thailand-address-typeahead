// @flow
import { compose, withState, withProps, lifecycle, defaultProps } from 'recompose';
import React, { Component } from 'react';

import Typeahead from './Typeahead.component';
import { resolveResultbyField } from './finder';


type AddressInputType = {
    // local state
    searchStr: string,
    option: string[],

    // external props
    fieldType: string,
    labelName: string,
    isMaterialStyle: boolean,
    isRequired: boolean,
    value: string,
    onOptionSelected: (option: any) => void,
    onReference: (option: any) => void,
    renderResult: (data: any) => React.Component,
};
const AddressTypeaheadComponent = (props: AddressInputType) => {
  const {
      searchStr,
      setSearchStr,
      fieldType,
      labelName,
      isMaterialStyle,
      isRequired,
      options,
      onReference,
  } = props;
  if (!fieldType) {
    console.warn('No field type provide');
    return <div />;
  }
  return (
      <Typeahead
          displayOption={props.renderResult}
          filterOption={fieldType}
          labelName={labelName}
          isRequired={isRequired}
          isMaterialStyle={isMaterialStyle}
          options={options}
          maxVisible={5}
          value={searchStr}
          onChange={(e) => setSearchStr(e.target.value)}
          onOptionSelected={(option) => props.onOptionSelected(option)}
          onReference={onReference}
      />
  );
};

const AddressTypeahead: Component<AddressInputType> = compose(
  withState('searchStr', 'setSearchStr', ''),
  lifecycle({
    componentWillReceiveProps(nextProps) {
      if (nextProps.value !== this.props.value) {
        this.props.setSearchStr(nextProps.value);
      }
    },
  }),
  withProps(({ searchStr, fieldType }) => ({
    options: resolveResultbyField(fieldType, searchStr),
  })),
  defaultProps(({
    renderResult: data => (
      <span>{`${data.d} » ${data.a} » ${data.p} » `}{data.z || <li>{'ไม่มีรหัสไปรษณีย์'}</li>}</span>
    ),
    value: '',
  })),
)(AddressTypeaheadComponent);

export default AddressTypeahead;
