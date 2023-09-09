import * as React from 'react';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

export default function TitleBlock(props) {
    const { className, text = [], color = 'text-dark', styles = {} } = props;
    if (!text) {
        return null;
    }

    return (
        <h2
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-title',
                color,
                className,
                styles?.self ? mapStyles(styles?.self) : undefined
            )}
            data-sb-field-path={props['data-sb-field-path']}
        >
            <span data-sb-field-path=".text">{text}</span>
        </h2>
    );
}
