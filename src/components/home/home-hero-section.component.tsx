'use client';

import { memo, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import cx from 'classix';

import { useParallax } from '#/hooks/use-parallax.hook';

import type { ComponentProps } from 'react';

import homeHeroLandscape1Png from '#/assets/images/home-hero-landscape-1.png';
import homeHeroLandscape2Png from '#/assets/images/home-hero-landscape-2.png';
import homeHeroLandscape3Png from '#/assets/images/home-hero-landscape-3.png';
import homeHeroSkyboxPng from '#/assets/images/home-hero-skybox.png';
import homeHeroGradient1Png from '#/assets/images/home-hero-gradient-1.png';
import homeHeroGradient2Png from '#/assets/images/home-hero-gradient-2.png';
import homeHeroCrystalPng from '#/assets/images/home-hero-crystal.png';
import homeHeroCrystalMonochromePng from '#/assets/images/home-hero-crystal-monochrome.png';
import homeHeroCrystalDustPng from '#/assets/images/home-hero-crystal-dust.png';
import homeHeroCrystalLensFlarePng from '#/assets/images/home-hero-crystal-lens-flare.png';
import homeHeroSunLensFlarePng from '#/assets/images/home-hero-sun-lens-flare.png';
import homeHeroTextBlurPng from '#/assets/images/home-hero-text-blur.png';

const imageWrapperBaseClassName = 'flex h-full w-full absolute top-0 left-0';

const imageWrapperStartClassName = `${imageWrapperBaseClassName} justify-start items-start`;

const imageWrapperEndClassName = `${imageWrapperBaseClassName} items-end`;

const imageProps = {
  quality: 100,
  loading: 'eager' as ComponentProps<typeof Image>['loading'],
  priority: true,
};

const textWrapperStyle = {
  backgroundImage: `url(${homeHeroTextBlurPng.src})`,
};

const SUN_SCROLL_Y_END = 315;

type ParallaxImageWrapperProps = ComponentProps<typeof motion.div> & {
  parallaxDistance: number;
};

function ParallaxImageWrapper({
  parallaxDistance,
  children,
  ...moreProps
}: ParallaxImageWrapperProps) {
  const { scrollYProgress } = useScroll();
  const y = useParallax(scrollYProgress, parallaxDistance);

  const style = useMemo(() => ({ y }), [y]);

  return (
    <motion.div style={style} {...moreProps}>
      {children}
    </motion.div>
  );
}

export const HomeHeroSection = memo(function ({
  className,
  ...moreProps
}: ComponentProps<'div'>) {
  const { scrollY } = useScroll();
  const [isSunVisible, setIsSunVisible] = useState(true);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsSunVisible(latest <= SUN_SCROLL_Y_END);
  });

  return (
    <div className={cx('w-fhd relative h-[915px]', className)} {...moreProps}>
      <ParallaxImageWrapper
        className={imageWrapperStartClassName}
        parallaxDistance={2200}
      >
        <Image
          src={homeHeroSkyboxPng}
          alt='home hero skybox'
          width={1920}
          height={511}
          {...imageProps}
        />
      </ParallaxImageWrapper>
      <ParallaxImageWrapper
        className='absolute left-0 top-[200px] flex w-full flex-col items-center gap-4'
        parallaxDistance={1300}
      >
        <h1 className='font-display text-base font-normal tracking-[5px]'>
          The Only Way to
        </h1>
        <div
          style={textWrapperStyle}
          className='flex h-[96px] w-[1080px] justify-center bg-no-repeat'
        >
          <h1 className='text-[130px] leading-[0.65]'>Tour the Red Planet</h1>
        </div>
      </ParallaxImageWrapper>
      <ParallaxImageWrapper
        className={imageWrapperEndClassName}
        parallaxDistance={2400}
      >
        <Image
          src={homeHeroLandscape3Png}
          alt='home hero landscape 3'
          width={1920}
          height={570}
          {...imageProps}
        />
      </ParallaxImageWrapper>
      <ParallaxImageWrapper
        className={imageWrapperStartClassName}
        parallaxDistance={2400}
      >
        <Image
          src={homeHeroGradient2Png}
          alt='home hero gradient 2'
          width={1382}
          height={563}
          {...imageProps}
        />
      </ParallaxImageWrapper>
      <ParallaxImageWrapper
        className={imageWrapperEndClassName}
        parallaxDistance={1600}
      >
        <Image
          src={homeHeroLandscape2Png}
          alt='home hero landscape 2'
          width={1920}
          height={631}
          {...imageProps}
        />
      </ParallaxImageWrapper>
      <div className={imageWrapperEndClassName}>
        <Image
          src={homeHeroLandscape1Png}
          alt='home hero landscape 1'
          width={1920}
          height={568}
          {...imageProps}
        />
      </div>
      <div className='absolute left-[388px] top-[601px]'>
        <div>
          <div className='absolute left-0 top-0 h-[163px] w-[188px]'>
            <Image
              src={homeHeroCrystalDustPng}
              alt='home hero crystal dust'
              width={188}
              height={163}
              {...imageProps}
            />
          </div>
        </div>
        <div className='relative'>
          <Image
            src={homeHeroCrystalMonochromePng}
            alt='home hero crystal monochrome'
            width={188}
            height={163}
            className='animate-fade absolute left-0 top-0'
            {...imageProps}
          />
          <Image
            src={homeHeroCrystalPng}
            alt='home hero crystal'
            width={188}
            height={163}
            className='animate-rainbow relative z-10'
            {...imageProps}
          />
        </div>
        <div className='absolute -left-[132px] top-[46px] h-[61px] w-[392px]'>
          <Image
            src={homeHeroCrystalLensFlarePng}
            alt='home hero crystal lens flare'
            width={392}
            height={61}
            className='animate-rainbow'
            {...imageProps}
          />
        </div>
      </div>
      <ParallaxImageWrapper
        className='absolute right-0 top-[411px]'
        parallaxDistance={2200}
      >
        <Image
          src={homeHeroSunLensFlarePng}
          alt='home hero sun lens flare'
          width={1256}
          height={142}
          className={cx(
            'transition-opacity duration-100',
            !isSunVisible ? 'opacity-0' : 'opacity-100',
          )}
          {...imageProps}
        />
      </ParallaxImageWrapper>
      <div className={imageWrapperEndClassName}>
        <Image
          src={homeHeroGradient1Png}
          alt='home hero gradient 1'
          width={1920}
          height={419}
          {...imageProps}
        />
        <div className='h-[47px] w-full bg-backdrop' />
      </div>
    </div>
  );
});