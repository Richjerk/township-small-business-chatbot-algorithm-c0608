import * as React from 'react';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

export default function Badge(props) {
    const { label, color = 'text-primary', styles, className } = props;
    if (!label) {
        return null;
    }

    return (
        <div
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-badge',
                color,
                className,
                styles?.self ? mapStyles(styles?.self) : undefined
            )}
            data-sb-field-path={props['data-sb-field-path']}
        >
            <span className="uppercase tracking-wider" data-sb-field-path=".label">
                {label}
            </span>
        </div>
    );
}
