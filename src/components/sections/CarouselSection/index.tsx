import * as React from 'react';
import classNames from 'classnames';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperClass from 'swiper';
import { EffectFade } from 'swiper';
import 'swiper/css';
import 'swiper/css/effect-fade';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import { getComponent } from '../../components-registry';
import Section from '../Section';
import Badge from '../../atoms/Badge';
import TitleBlock from '../../blocks/TitleBlock';
import ChevronBigLeftIcon from '../../svgs/chevron-big-left';
import ChevronBigRightIcon from '../../svgs/chevron-big-right';

export default function CarouselSection(props) {
    const { elementId, colors, backgroundImage, badge, title, subtitle, items = [], variant, styles = {} } = props;

    return (
        <Section
            elementId={elementId}
            className="sb-component-carousel-section"
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
                {items.length > 0 && (
                    <CarouselVariants
                        variant={variant}
                        items={items}
                        hasTopMargin={!!(badge?.label || title?.text || subtitle)}
                        hasSectionTitle={!!title?.text}
                    />
                )}
            </div>
        </Section>
    );
}

function CarouselVariants(props) {
    const { variant = 'next-prev-nav', ...rest } = props;
    switch (variant) {
        case 'dots-nav':
            return <CarouselWithPagination {...rest} />;
        case 'tabs-nav':
            return <CarouselWithTabs {...rest} />;
        default:
            return <CarouselWithNavigation {...rest} />;
    }
}

function CarouselWithNavigation({ items = [], hasTopMargin, hasSectionTitle }) {
    const FeaturedItem = getComponent('FeaturedItem');
    const [swiperRef, setSwiperRef] = React.useState<SwiperClass>();

    return (
        <div className={classNames('w-full', 'relative', { 'mt-12': hasTopMargin })} data-sb-field-path=".items">
            <Swiper effect={'fade'} fadeEffect={{ crossFade: true }} speed={500} loop={true} autoHeight={true} modules={[EffectFade]} onSwiper={setSwiperRef}>
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="w-full max-w-5xl mx-auto">
                            <FeaturedItem {...item} hasSectionTitle={hasSectionTitle} data-sb-field-path={`.${index}`} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={classNames('sb-carousel-nav', items.length > 1 ? 'flex justify-center mt-8 xl:mt-0' : 'hidden')}>
                <button
                    className="sb-carousel-prev mx-2 w-10 h-10 rounded-full inline-flex justify-center items-center cursor-pointer xl:absolute xl:left-0 xl:top-1/2 xl:-translate-y-1/2 xl:z-50"
                    aria-label="Previous"
                    onClick={() => {
                        swiperRef?.slidePrev();
                    }}
                >
                    <ChevronBigLeftIcon className="fill-current h-6 w-6" />
                </button>
                <button
                    className="sb-carousel-next mx-2 w-10 h-10 rounded-full inline-flex justify-center items-center cursor-pointer xl:absolute xl:right-0 xl:top-1/2 xl:-translate-y-1/2 xl:z-50"
                    aria-label="Next"
                    onClick={() => {
                        swiperRef?.slideNext();
                    }}
                >
                    <ChevronBigRightIcon className="fill-current h-6 w-6" />
                </button>
            </div>
        </div>
    );
}

function CarouselWithPagination({ items = [], hasTopMargin, hasSectionTitle }) {
    const FeaturedItem = getComponent('FeaturedItem');
    const [swiperRef, setSwiperRef] = React.useState<SwiperClass>();
    const [activeDot, setActiveDot] = React.useState(0);

    return (
        <div className={classNames('w-full', { 'mt-12': hasTopMargin })} data-sb-field-path=".items">
            <Swiper effect={'fade'} fadeEffect={{ crossFade: true }} speed={500} autoHeight={true} modules={[EffectFade]} onSwiper={setSwiperRef}>
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="w-full max-w-5xl mx-auto">
                            <FeaturedItem {...item} hasSectionTitle={hasSectionTitle} data-sb-field-path={`.${index}`} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className={classNames('sb-carousel-dots', items.length > 1 ? 'flex justify-center gap-3 mt-8' : 'hidden')}>
                {items.map((item, index) => (
                    <span
                        key={index}
                        className={classNames('sb-carousel-dot', activeDot === index ? 'sb-carousel-dot-active' : undefined)}
                        onClick={() => {
                            swiperRef?.slideTo(index);
                            setActiveDot(index);
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

function CarouselWithTabs({ items = [], hasTopMargin, hasSectionTitle }) {
    const FeaturedItem = getComponent('FeaturedItem');
    const [swiperRef, setSwiperRef] = React.useState<SwiperClass>();
    const [activeTab, setActiveTab] = React.useState(0);

    return (
        <div className={classNames('w-full', { 'mt-12': hasTopMargin })} data-sb-field-path=".items">
            <div className={classNames('sb-carousel-tabs-nav', items.length > 1 ? 'flex justify-center gap-5 mb-10' : 'hidden')}>
                {items.map((item, index) => (
                    <div key={index} data-sb-field-path={`.${index}`}>
                        <div
                            className={classNames('sb-carousel-tab-title', '', activeTab === index ? 'sb-carousel-tab-title-active' : undefined)}
                            data-sb-field-path=".tagline"
                            onClick={() => {
                                swiperRef?.slideTo(index);
                                setActiveTab(index);
                            }}
                        >
                            {item.tagline}
                        </div>
                    </div>
                ))}
            </div>
            <Swiper effect={'fade'} fadeEffect={{ crossFade: true }} speed={500} autoHeight={true} modules={[EffectFade]} onSwiper={setSwiperRef}>
                {items.map((item, index) => {
                    const tabItem = { ...item, tagline: undefined };
                    return (
                        <SwiperSlide key={index}>
                            <div className="w-full max-w-5xl mx-auto">
                                <FeaturedItem {...tabItem} hasSectionTitle={hasSectionTitle} data-sb-field-path={`.${index}`} />
                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
