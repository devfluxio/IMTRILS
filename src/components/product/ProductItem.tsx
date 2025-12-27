import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { BsStarFill } from 'react-icons/bs';
import { Product } from '@/types';
import { numberWithCommas } from '@/utils';

const shimmer = `relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/70 before:to-transparent`;

export const Skeleton = () => {
  return (
    <div className="rounded-2xl bg-white p-2">
      <div className={`h-[350px] rounded-2xl bg-neutral-200 ${shimmer}`} />
      <div className="my-3 space-y-3 px-1">
        <div className="flex gap-2">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className={`h-[40px] w-[40px] rounded-full bg-neutral-200 ${shimmer}`}
              ></div>
            ))}
        </div>
        <div className={`h-4 w-full rounded-lg bg-neutral-200 ${shimmer}`} />
        <div className={`h-4 w-1/2 rounded-lg bg-neutral-200 ${shimmer}`} />
        <div className="flex justify-between">
          <div className={`h-4 w-1/3 rounded-lg bg-neutral-200 ${shimmer}`} />
          <div className={`h-4 w-1/3 rounded-lg bg-neutral-200 ${shimmer}`} />
        </div>
      </div>
    </div>
  );
};

export const ProductItem = ({
  id,
  name,
  price,
  rate,
  images = [],
  collection,
  types = [],
  sizes = [],
  colors = [],
  }: Product & { types?: string[]; sizes?: string[]; colors?: string[] }) => {
  const hasImages = Array.isArray(images) && images.length > 0;
  // Determine gender folder
  const gender = (Array.isArray(types) && types[0]) ? types[0].toLowerCase() : '';
  // Always use the image URL as is (should be /uploads/men/... or /uploads/women/...)
  const getImagePath = (url: string) => url;
  const firstImage = hasImages
    ? typeof images[0] === 'string'
      ? getImagePath(images[0])
      : getImagePath(images[0].imageURL)
    : '/assets/placeholder.png';
  const [currentImage, setCurrentImage] = useState(firstImage);

  const productLink = `/product/${id}`;

  return (
    <div className="group rounded-2xl bg-white p-2">
      <div className="relative h-[400px] overflow-hidden rounded-2xl transition sm:h-[330px]">
        <Link href={productLink} className="relative block h-full w-full">
          {hasImages ? (
            images.map((img) => {
              // Sanitize image URL
              const rawUrl = typeof img === 'string' ? img : img.imageURL;
              const imageURL = getImagePath(rawUrl ? rawUrl.trim().replace(/\s/g, '') : '');
              const imageBlur = typeof img === 'string' ? undefined : img.imageBlur;
              const isUploads = typeof imageURL === 'string' && imageURL.startsWith('/uploads/');
              console.log('Rendering image:', imageURL);
              return (
                <Image
                  key={imageURL}
                  src={imageURL}
                  alt={`${name} image`}
                  className={clsx('absolute h-full w-full duration-700 ', {
                    'opacity-100': currentImage === imageURL,
                    'opacity-0': currentImage !== imageURL,
                  })}
                  width={350}
                  height={350}
                  unoptimized={isUploads}
                  {...(imageBlur ? { placeholder: 'blur', blurDataURL: imageBlur } : {})}
                />
              );
            })
          ) : (
            <Image
              src={typeof firstImage === 'string' ? firstImage.trim().replace(/\s/g, '') : firstImage}
              alt={`${name} placeholder`}
              width={350}
              height={350}
              unoptimized={typeof firstImage === 'string' && firstImage.startsWith('/uploads/')}
            />
          )}
        </Link>
      </div>
      <div className="px-1">
        <div className="flex justify-between items-center mt-2">
          {/* SSR: Always render a Link, but intercept click on client for auth check */}
          <Link
            href={productLink}
            className="bg-black text-white px-3 py-1 rounded text-sm"
            onClick={e => {
              if (typeof window !== 'undefined') {
                const token = localStorage.getItem('authToken');
                if (!token) {
                  e.preventDefault();
                  window.location.href = '/signup';
                }
              }
            }}
          >
            Buy
          </Link>
          <Link href={productLink} className="text-sm text-neutral-500">View details</Link>
        </div>
      </div>
      <div className="mb-1 mt-2 space-y-4 px-1">
        <div className="flex gap-2">
          {hasImages && images.map((img, index) => {
            // Sanitize image URL
            const rawUrl = typeof img === 'string' ? img : img.imageURL;
            const imageURL = getImagePath(rawUrl ? rawUrl.trim().replace(/\s/g, '') : '');
            const imageBlur = typeof img === 'string' ? undefined : img.imageBlur;
            const isExternal = typeof imageURL === 'string' && imageURL.startsWith('http');
            return (
              <button
                key={index}
                className="h-[40px] w-[40px] overflow-hidden rounded-full"
                onClick={() => setCurrentImage(imageURL)}
              >
                <Image
                  src={imageURL}
                  alt={`${name} image ${index + 1}`}
                  className="object-cover"
                  width={40}
                  height={40}
                  unoptimized={isExternal}
                  {...(imageBlur ? { placeholder: 'blur', blurDataURL: imageBlur } : {})}
                />
              </button>
            );
          })}
        </div>



        <div>
          <h2 className="text-base font-medium">{name}</h2>
          <h3 className="text-xs font-normal capitalize text-neutral-400">
            {collection?.name || ''}
          </h3>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black">
            ₹{numberWithCommas((typeof price === 'number' ? price : Number(price || 0)).toFixed(2))}
          </h3>
          <div className="flex items-center justify-center text-xs font-medium text-neutral-500">
            <BsStarFill size="11px" className="mr-1 text-yellow-400" />
            <h4>{rate} (69 Reviews)</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
