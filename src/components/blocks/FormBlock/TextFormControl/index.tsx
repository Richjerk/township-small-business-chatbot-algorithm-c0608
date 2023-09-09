import * as React from 'react';
import classNames from 'classnames';

export default function TextFormControl(props) {
    const { name, label, hideLabel, isRequired, placeholder, width = 'full' } = props;
    const labelId = `${name}-label`;
    const attr: React.InputHTMLAttributes<HTMLInputElement> = {};
    if (label) {
        attr['aria-labelledby'] = labelId;
    }
    if (isRequired) {
        attr.required = true;
    }
    if (placeholder) {
        attr.placeholder = placeholder;
    }

    return (
        <div
            className={classNames('sb-form-control', 'w-full', {
                'sm:w-formField': width === '1/2'
            })}
            data-sb-field-path={props['data-sb-field-path']}
        >
            {label && (
                <label
                    id={labelId}
                    className={classNames('sb-label', 'inline-block', 'sm:mb-1.5', { 'sr-only': hideLabel })}
                    htmlFor={name}
                    data-sb-field-path=".label .name#@for"
                >
                    {label}
                </label>
            )}
            <input
                id={name}
                className="sb-input text-inherit bg-transparent border-b border-current w-full py-2 focus:outline-none"
                type="text"
                name={name}
                {...attr}
                data-sb-field-path=".name#@id .name#@name"
            />
        </div>
    );
}
