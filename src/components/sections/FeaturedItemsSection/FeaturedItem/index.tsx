import * as React from 'react';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '../../../../utils/map-styles-to-class-names';
import Action from '../../../atoms/Action';
import ImageBlock from '../../../blocks/ImageBlock';

export default function FeaturedItem(props) {
    const { elementId, title, tagline, subtitle, text, image, actions = [], colors = 'bg-light-fg-dark', styles = {}, hasSectionTitle } = props;
    const flexDirection = styles?.self?.flexDirection ?? 'col';
    const hasTextContent = !!(tagline || title || subtitle || text || actions.length > 0);
    const hasImage = !!image?.url;

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
            <div className={classNames('w-full', 'flex', mapFlexDirectionStyles(flexDirection, hasTextContent, hasImage), 'gap-6')}>
                {hasImage && (
                    <ImageBlock
                        {...image}
                        className={classNames('flex', mapStyles({ justifyContent: styles?.self?.justifyContent ?? 'flex-start' }), {
                            'xs:w-[28.4%] xs:shrink-0': hasTextContent && (flexDirection === 'row' || flexDirection === 'row-reversed')
                        })}
                        data-sb-field-path=".image"
                    />
                )}
                {hasTextContent && (
                    <div
                        className={classNames('w-full', {
                            'xs:grow': hasImage && (flexDirection === 'row' || flexDirection === 'row-reversed')
                        })}
                    >
                        {tagline && (
                            <p className="text-sm" data-sb-field-path=".tagline">
                                {tagline}
                            </p>
                        )}
                        {title &&
                            (hasSectionTitle ? (
                                <h3
                                    className={classNames({
                                        'mt-2': tagline
                                    })}
                                    data-sb-field-path=".title"
                                >
                                    {title}
                                </h3>
                            ) : (
                                <h2
                                    className={classNames('h3', {
                                        'mt-2': tagline
                                    })}
                                    data-sb-field-path=".title"
                                >
                                    {title}
                                </h2>
                            ))}
                        {subtitle && (
                            <p
                                className={classNames('text-lg', {
                                    'mt-2': tagline || title
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
                                    'mt-4': tagline || title || subtitle
                                })}
                                data-sb-field-path=".text"
                            >
                                {text}
                            </Markdown>
                        )}
                        <ItemActions
                            actions={actions}
                            hasTopMargin={!!(tagline || title || subtitle || text)}
                            className={classNames(mapStyles({ justifyContent: styles?.self?.justifyContent ?? 'flex-start' }))}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}

function ItemActions({ actions, hasTopMargin, className }) {
    if (actions.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('flex', 'flex-wrap', className, 'items-center', 'gap-4', {
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

function mapFlexDirectionStyles(flexDirection: string, hasTextContent: boolean, hasImage: boolean) {
    switch (flexDirection) {
        case 'row':
            return hasTextContent && hasImage ? 'flex-col xs:flex-row xs:items-start' : 'flex-col';
        case 'row-reverse':
            return hasTextContent && hasImage ? 'flex-col xs:flex-row-reverse xs:items-start' : 'flex-col';
        case 'col':
            return 'flex-col';
        case 'col-reverse':
            return 'flex-col-reverse';
        default:
            return null;
    }
}
