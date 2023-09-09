import * as React from 'react';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import Section from '../Section';
import TitleBlock from '../../blocks/TitleBlock';
import ImageBlock from '../../blocks/ImageBlock';
import { Action, Badge } from '../../atoms';

export default function FeaturedPeopleSection(props) {
    const { elementId, colors, backgroundImage, badge, title, subtitle, actions = [], people = [], variant, styles = {} } = props;

    return (
        <Section
            elementId={elementId}
            className="sb-component-featured-people-section"
            colors={colors}
            backgroundImage={backgroundImage}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className={classNames('w-full', 'flex', 'flex-col', mapStyles({ alignItems: styles?.self?.justifyContent ?? 'flex-start' }))}>
                {badge && <Badge {...badge} className="w-full max-w-sectionBody" data-sb-field-path=".badge" />}
                {title && <TitleBlock {...title} className={classNames('w-full', 'max-w-sectionBody', { 'mt-4': badge?.label })} data-sb-field-path=".title" />}
                {subtitle && (
                    <p
                        className={classNames(
                            'w-full',
                            'max-w-sectionBody',
                            'text-lg',
                            'sm:text-2xl',
                            styles?.subtitle ? mapStyles(styles?.subtitle) : undefined,
                            {
                                'mt-4': badge?.label || title?.text
                            }
                        )}
                        data-sb-field-path=".subtitle"
                    >
                        {subtitle}
                    </p>
                )}
                <FeaturedPeopleVariants
                    variant={variant}
                    people={people}
                    hasTopMargin={!!(badge?.label || title?.text || subtitle)}
                    hasSectionTitle={!!title?.text}
                />
                <FeaturedPeopleSectionActions actions={actions} hasTopMargin={!!(badge?.label || title?.text || subtitle || people.length > 0)} />
            </div>
        </Section>
    );
}

function FeaturedPeopleSectionActions({ actions, hasTopMargin }) {
    if (actions.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('flex', 'flex-wrap', 'items-center', 'gap-4', {
                'mt-12': hasTopMargin
            })}
            data-sb-field-path=".actions"
        >
            {actions.map((action, index) => (
                <Action key={index} {...action} className="lg:whitespace-nowrap" data-sb-field-path={`.${index}`} />
            ))}
        </div>
    );
}

function FeaturedPeopleVariants(props) {
    const { variant = 'three-col-grid', ...rest } = props;
    switch (variant) {
        case 'four-col-grid':
            return <FeaturedPeopleFourCol {...rest} />;
        case 'mixed-grid':
            return <FeaturedPeopleMixedCol {...rest} />;
        default:
            return <FeaturedPeopleThreeCol {...rest} />;
    }
}

function FeaturedPeopleThreeCol({ people = [], hasTopMargin, hasSectionTitle }) {
    if (people.length === 0) {
        return null;
    }
    return (
        <div className={classNames('grid', 'gap-10', 'sm:grid-cols-2', 'lg:grid-cols-3', { 'mt-12': hasTopMargin })} data-sb-field-path=".people">
            {people.map((person, index) => (
                <FeaturedPerson key={index} {...person} hasSectionTitle={hasSectionTitle} data-sb-field-path={`.${index}`} />
            ))}
        </div>
    );
}
function FeaturedPeopleFourCol({ people = [], hasTopMargin, hasSectionTitle }) {
    if (people.length === 0) {
        return null;
    }
    return (
        <div className={classNames('grid', 'gap-10', 'sm:grid-cols-2', 'lg:grid-cols-4', { 'mt-12': hasTopMargin })} data-sb-field-path=".people">
            {people.map((person, index) => (
                <FeaturedPerson key={index} {...person} hasSectionTitle={hasSectionTitle} data-sb-field-path={`.${index}`} />
            ))}
        </div>
    );
}

function FeaturedPeopleMixedCol({ people = [], hasTopMargin, hasSectionTitle }) {
    if (people.length === 0) {
        return null;
    }
    return (
        <div className={classNames('grid', 'gap-10', 'sm:grid-cols-2', 'lg:grid-cols-16', { 'mt-12': hasTopMargin })} data-sb-field-path=".people">
            {people.map((person, index) => (
                <FeaturedPerson
                    key={index}
                    {...person}
                    hasSectionTitle={hasSectionTitle}
                    data-sb-field-path={`.${index}`}
                    className={classNames('lg:col-span-4', {
                        'lg:col-start-3 lg:col-end-span4': (index + 3) % 7 === 0,
                        'lg:col-start-span4 lg:col-end-neg3': (index + 1) % 7 === 0
                    })}
                />
            ))}
        </div>
    );
}

function FeaturedPerson(props) {
    const { elementId, name, image, role, bio, colors = 'bg-light-fg-dark', styles = {}, className, hasSectionTitle } = props;
    return (
        <div
            id={elementId}
            className={classNames(
                'sb-card',
                'h-full',
                colors,
                className,
                'overflow-hidden',
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
                styles?.self?.textAlign ? mapStyles({ textAlign: styles?.self?.textAlign }) : undefined
            )}
            data-sb-field-path={props['data-sb-field-path']}
        >
            {image && (
                <ImageBlock
                    {...image}
                    className={classNames('flex', mapStyles({ justifyContent: styles?.self?.justifyContent ?? 'flex-start' }))}
                    data-sb-field-path=".image"
                />
            )}
            {name &&
                (hasSectionTitle ? (
                    <h3 data-sb-field-path=".name">{name}</h3>
                ) : (
                    <h2 className="h3" data-sb-field-path=".name">
                        {name}
                    </h2>
                ))}
            {role && (
                <p className="mt-2" data-sb-field-path=".role">
                    {role}
                </p>
            )}
            {bio && (
                <Markdown options={{ forceBlock: true, forceWrapper: true }} className="sb-markdown mt-4" data-sb-field-path=".bio">
                    {bio}
                </Markdown>
            )}
        </div>
    );
}
