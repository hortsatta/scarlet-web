'use client';

import { memo, useMemo } from 'react';
import cx from 'classix';

import { MarsLocation, WeatherType } from '#/models/base.model';
import { BaseIcon } from '../base/base-icon.component';
import {
  BaseTooltip,
  BaseTooltipTrigger,
  BaseTooltipContent,
} from '../base/base-tooltip.component';

import type { ComponentProps } from 'react';
import type { IconName, Weather } from '#/models/base.model';

type Props = ComponentProps<'article'> & {
  weather: Weather;
};

export const CoreWeatherCard = memo(function ({
  className,
  weather: { temp, type, location },
  ...moreProps
}: Props) {
  const typeIconName: IconName | null = useMemo(() => {
    switch (type) {
      case WeatherType.Foggy:
        return 'cloud-fog';
      case WeatherType.Snowy:
        return 'cloud-snow';
      case WeatherType.Sunny:
        return 'sun-horizon';
      case WeatherType.Windy:
        return 'wind';
    }

    return null;
  }, [type]);

  return (
    <article className={cx('flex flex-col', className)} {...moreProps}>
      <div className='flex items-center gap-1.5'>
        <span className='text-[26px]'>{temp}°F</span>
        <BaseTooltip>
          {typeIconName && (
            <BaseTooltipTrigger>
              <BaseIcon name={typeIconName} size={30} />
            </BaseTooltipTrigger>
          )}
          <BaseTooltipContent>
            <span>{WeatherType[type]}</span>
          </BaseTooltipContent>
        </BaseTooltip>
      </div>
      <span className='text-xs uppercase opacity-70'>
        {MarsLocation[location]}
      </span>
    </article>
  );
});