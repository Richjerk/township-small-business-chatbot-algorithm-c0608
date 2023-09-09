import * as React from 'react';
import classNames from 'classnames';

export default function TextareaFormControl(props) {
    const { name, label, hideLabel, isRequired, placeholder, width = 'full' } = props;
    const labelId = `${name}-label`;
    const attr: React.TextareaHTMLAttributes<HTMLTextAreaElement> = {};
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
            <textarea
                id={props.name}
                className="sb-textarea text-inherit bg-transparent border border-current w-full p-2 focus:outline-none"
                name={name}
                rows={5}
                {...attr}
                data-sb-field-path=".name#@id .name#@name"
            />
        </div>
    );
}
