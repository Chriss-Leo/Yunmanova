'use client'

import Image from 'next/image'
import { useReducedMotion } from 'motion/react'

const videoSource = '/media/team-collaboration-source.mp4'

export function CinematicVideo() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <Image
        src="/media/enterprise-team.webp"
        alt="软件团队共同评审企业系统方案"
        fill
        sizes="100vw"
        className="cinema-media"
      />
    )
  }

  return (
    <video
      aria-hidden="true"
      autoPlay
      className="cinema-media"
      loop
      muted
      playsInline
      poster="/media/enterprise-team.webp"
      preload="metadata"
    >
      <source src={videoSource} type="video/mp4" />
    </video>
  )
}
