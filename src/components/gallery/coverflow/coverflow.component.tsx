'use client'

import Image from 'next/image'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import { EffectCoverflow, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import './coverflow.styles.scss'

interface CoverflowProps {
  links: Array<string>
  title?: string
}

export function Coverflow({ title, links }: CoverflowProps) {
  return (
    <div className="overflow-y-hidden px-8">
      <h2 className="text-primary-midnight-blue-600 text-2xl">{title}</h2>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {links.map((i, index) => (
          <SwiperSlide key={index}>
            <Image
              src={i}
              alt={`Slide image ${index + 1}`}
              width={600}
              height={400}
              className="h-full w-full object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
