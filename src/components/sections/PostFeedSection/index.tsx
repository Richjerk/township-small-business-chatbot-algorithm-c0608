import * as React from 'react';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import Section from '../Section';
import { Action, Badge } from '../../atoms';
import TitleBlock from '../../blocks/TitleBlock';
import PostFeedItem from './PostFeedItem';

export default function PostFeedSection(props) {
    const {
        elementId,
        colors,
        backgroundImage,
        badge,
        title,
        subtitle,
        posts = [],
        showThumbnail,
        showExcerpt,
        showDate,
        showAuthor,
        pageLinks,
        searchBox,
        actions = [],
        variant,
        styles = {}
    } = props;

    return (
        <Section
            elementId={elementId}
            className="sb-component-post-feed-section"
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
                {searchBox}
                <PostFeedVariants
                    variant={variant}
                    posts={posts}
                    showThumbnail={showThumbnail}
                    showExcerpt={showExcerpt}
                    showDate={showDate}
                    showAuthor={showAuthor}
                    hasTopMargin={!!(badge?.label || title?.text || subtitle)}
                    hasSectionTitle={!!title?.text}
                />
                <PostFeedSectionActions actions={actions} hasTopMargin={!!(badge?.label || title?.text || subtitle || posts.length > 0)} />
                {pageLinks}
            </div>
        </Section>
    );
}

function PostFeedSectionActions({ actions, hasTopMargin }) {
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

function PostFeedVariants(props) {
    const { variant = 'three-col-grid', ...rest } = props;
    switch (variant) {
        case 'two-col-grid':
            return <PostFeedTwoColGrid {...rest} />;
        case 'small-list':
            return <PostFeedSmallList {...rest} />;
        case 'big-list':
            return <PostFeedBigList {...rest} />;
        default:
            return <PostFeedThreeColGrid {...rest} />;
    }
}

function PostFeedThreeColGrid(props) {
    const { posts = [], showThumbnail, showExcerpt, showDate, showAuthor, hasTopMargin, hasSectionTitle, annotatePosts } = props;
    if (posts.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('w-full', 'grid', 'gap-10', 'sm:grid-cols-2', 'lg:grid-cols-3', { 'mt-12': hasTopMargin })}
            {...(annotatePosts ? { 'data-sb-field-path': '.posts' } : null)}
        >
            {posts.map((post, index) => (
                <PostFeedItem
                    key={index}
                    post={post}
                    showThumbnail={showThumbnail}
                    showExcerpt={showExcerpt}
                    showDate={showDate}
                    showAuthor={showAuthor}
                    hasSectionTitle={hasSectionTitle}
                />
            ))}
        </div>
    );
}

function PostFeedTwoColGrid(props) {
    const { posts = [], showThumbnail, showExcerpt, showDate, showAuthor, hasTopMargin, hasSectionTitle, annotatePosts } = props;
    if (posts.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('w-full', 'grid', 'gap-10', 'sm:grid-cols-2', { 'mt-12': hasTopMargin })}
            {...(annotatePosts ? { 'data-sb-field-path': '.posts' } : null)}
        >
            {posts.map((post, index) => (
                <PostFeedItem
                    key={index}
                    post={post}
                    showThumbnail={showThumbnail}
                    showExcerpt={showExcerpt}
                    showDate={showDate}
                    showAuthor={showAuthor}
                    hasSectionTitle={hasSectionTitle}
                />
            ))}
        </div>
    );
}

function PostFeedSmallList(props) {
    const { posts = [], showThumbnail, showExcerpt, showDate, showAuthor, hasTopMargin, hasSectionTitle, annotatePosts } = props;
    if (posts.length === 0) {
        return null;
    }
    return (
        <div
            className={classNames('w-full', 'max-w-3xl', 'grid', 'gap-10', { 'mt-12': hasTopMargin })}
            {...(annotatePosts ? { 'data-sb-field-path': '.posts' } : null)}
        >
            {posts.map((post, index) => (
                <PostFeedItem
                    key={index}
                    post={post}
                    showThumbnail={showThumbnail}
                    showExcerpt={showExcerpt}
                    showDate={showDate}
                    showAuthor={showAuthor}
                    hasSectionTitle={hasSectionTitle}
                />
            ))}
        </div>
    );
}

function PostFeedBigList(props) {
    const { posts = [], showThumbnail, showExcerpt, showDate, showAuthor, hasTopMargin, hasSectionTitle, annotatePosts } = props;
    if (posts.length === 0) {
        return null;
    }
    return (
        <div className={classNames('w-full', 'grid', 'gap-10', { 'mt-12': hasTopMargin })} {...(annotatePosts ? { 'data-sb-field-path': '.posts' } : null)}>
            {posts.map((post, index) => (
                <PostFeedItem
                    key={index}
                    post={post}
                    showThumbnail={showThumbnail}
                    showExcerpt={showExcerpt}
                    showDate={showDate}
                    showAuthor={showAuthor}
                    hasSectionTitle={hasSectionTitle}
                    hasBigThumbnail={true}
                />
            ))}
        </div>
    );
}
