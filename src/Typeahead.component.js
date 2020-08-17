// @flow
import React from 'react';
import { defaultProps, withState, compose } from 'recompose';


type TypeaheadInputType = {
    displayOption: () => any,
    maxVisible: number,
    value: string,
    options: any[],
    filterOptions: string,
    labelName: string,
    isMaterialStyle: boolean,
    isRequired: boolean,
    onChange: (e: any) => void,
    onOptionSelected: (option: any) => void,
    onReference: (option: any) => void,

    // local props
    open: boolean,
    setOpen: (boolean) => void,
};

const Typeahead: React.Component<TypeaheadInputType> = compose(
    defaultProps({
        onChange: () => {},
        option: [],
        maxVisible: 10,
    }),
    withState("open", "setOpen", false)
)((props: TypeaheadInputType) => (
    <div className="typeahead typeahead-input-wrap">
        <input
            onBlur={() => setTimeout(() => props.setOpen(false), 400)}
            onFocus={() => props.setOpen(true)}
            type="text"
            value={props.value}
            onChange={props.onChange}
            required={props.isRequired}
            name={props.filterOption}
            ref={props.onReference}
        />
        {props.options.length && props.value.length ? (
            <input
                onChange={() => null}
                value={props.options[0][props.filterOption]}
                type="text"
                className="typeahead-input-hint"
            />
        ) : null}

        {props.isMaterialStyle == true && (
            <div>
                <i className="bar"></i>
                <label className="label">{props.labelName}</label>
            </div>
        )}

        {props.open && props.options.length && props.value.length ? (
            <ul className="typeahead-selector">
                {props.options
                    .filter((item, i) => i < props.maxVisible)
                    .map((item, i) => (
                        <li
                            key={i}
                            onClick={() => {
                                props.onOptionSelected(item);
                                props.setOpen(false);
                            }}
                        >
                            {props.displayOption(item)}
                        </li>
                    ))}
            </ul>
        ) : null}
    </div>
));


export default Typeahead;
