import { twMerge as twOrigional } from 'tailwind-merge';
import clsx from 'clsx';

export function tw(...args) {
    return twOrigional(clsx(args))
}