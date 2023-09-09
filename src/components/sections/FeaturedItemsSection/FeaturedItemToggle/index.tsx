import * as React from 'react';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '../../../../utils/map-styles-to-class-names';
import Action from '../../../atoms/Action';
import PlusIcon from '../../../svgs/plus';
import CloseIcon from '../../../svgs/close';

export default function FeaturedItemToggle(props) {
    const { elementId, title, subtitle, text, actions = [], colors = 'bg-light-fg-dark', styles = {}, hasSectionTitle } = props;
    const [isActive, setIsActive] = React.useState(false);

    return (
        <div
            id={elementId}
            className={classNames(
                'sb-card',
                'h-full',
                colors,
                styles?.self?.margin ? mapStyles({ margin: styles?.self?.margin }) : undefined,
                styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : undefined,
                styles?.self?.borderWidth && styles?.self?.borderWidth !== 0 && styles?.self?.borderStyle !== 'none'
                    ? mapStyles({
                          borderWidth: styles?.self?.borderWidth,
                          borderStyle: styles?.self?.borderStyle,
                          borderColor: styles?.self?.borderColor ?? 'border-primary'
                      })
                    : undefined,
                styles?.self?.borderRadius ? mapStyles({ borderRadius: styles?.self?.borderRadius }) : undefined,
                styles?.self?.textAlign ? mapStyles({ textAlign: styles?.self?.textAlign }) : undefined,
                'overflow-hidden'
            )}
            data-sb-field-path={props['data-sb-field-path']}
        >
            {title &&
                (hasSectionTitle ? (
                    <h3 className="relative pr-8 cursor-pointer" onClick={() => setIsActive(!isActive)}>
                        <span data-sb-field-path=".title">{title}</span>
                        <span className="absolute right-0 top-1/2 -translate-y-1/2">
                            <PlusIcon className={classNames('w-6', 'h-6', 'fill-current', isActive ? 'hidden' : null)} />
                            <CloseIcon className={classNames('w-6', 'h-6', 'fill-current', !isActive ? 'hidden' : null)} />
                        </span>
                    </h3>
                ) : (
                    <h2 className="h3 cursor-pointer" onClick={() => setIsActive(!isActive)}>
                        <span data-sb-field-path=".title">{title}</span>
                    </h2>
                ))}
            {(subtitle || text || actions.length > 0) && (
                <div className={classNames('mt-6', !isActive ? 'hidden' : undefined)}>
                    {subtitle && (
                        <p
                            className={classNames('text-lg', {
                                'mt-2': title
                            })}
                            data-sb-field-path=".subtitle"
                        >
                            {subtitle}
                        </p>
                    )}
                    {text && (
                        <Markdown
                            options={{ forceBlock: true, forceWrapper: true }}
                            className={classNames('sb-markdown', {
                                'mt-4': title || subtitle
                            })}
                            data-sb-field-path=".text"
                        >
                            {text}
                        </Markdown>
                    )}
                    <ItemActions actions={actions} hasTopMargin={!!(title || subtitle || text)} />
                </div>
            )}
        </div>
    );
}

function ItemActions({ actions, hasTopMargin }) {
    if (actions.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('flex', 'flex-wrap', 'items-center', 'gap-4', {
                'mt-6': hasTopMargin
            })}
            data-sb-field-path=".actions"
        >
            {actions.map((action, index) => (
                <Action key={index} {...action} className="lg:whitespace-nowrap" data-sb-field-path={`.${index}`} />
            ))}
        </div>
    );
}
