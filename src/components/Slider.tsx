import React, { useState } from 'react';
import styled from 'styled-components';
import { Carousel, CarouselItem, CarouselControl, CarouselIndicators } from 'reactstrap';
// 캐러셀 부트스트랩 사용
const items = [
    {
        src: 'https://assets.cdn.soomgo.com/images/banner/banner-exhibitions-exercise-web-main@2x.png',
        altText: 'Slide 1',
    },
    {
        src: 'https://assets.cdn.soomgo.com/images/banner/banner-exhibitions-interior-web-main@2x.png',
        altText: 'Slide 2',
    },
    {
        src: 'https://assets.cdn.soomgo.com/images/banner/banner-soomgoclass-web-main@2x.png',
        altText: 'Slide 3',
    },
    {
        src: 'https://assets.cdn.soomgo.com/images/banner/banner-bizlink-web-main@2x.png',
        altText: 'Slide 4',
    },
    {
        src: 'https://assets.cdn.soomgo.com/images/banner/banner-event-hello2022-web-main.png',
        altText: 'Slide 5',
    },
];

const WerowCarousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    };

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    };

    const goToIndex = (newIndex: number) => {
        if (animating) return;
        setActiveIndex(newIndex);
    };

    const slides = items.map((item) => {
        return (
            <CarouselItem
                onExiting={() => setAnimating(true)}
                onExited={() => setAnimating(false)}
                key={item.altText}
                interval={300}
            >
                <Img src={item.src} alt={item.altText} />
            </CarouselItem>
        );
    });

    return (
        <Carousel activeIndex={activeIndex} next={next} previous={previous}>
            <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
            <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
            <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
        </Carousel>
    );
};

const Img = styled.img`
    width: 100%;
    height: 400px;
    cursor: pointer;
`;

export default WerowCarousel;
