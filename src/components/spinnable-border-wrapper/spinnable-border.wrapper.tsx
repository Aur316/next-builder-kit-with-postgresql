import { PropsWithChildren } from 'react'

import { twJoin, twMerge } from 'tailwind-merge'

interface BaseSpinnableBorderWrapper {
  baseStyle?: string
  isSpinning?: boolean
  customGradient?: string
  variant?: 'auroraViolet' | 'cyberHeat' | 'oceanSignal' | 'electricPop'
}

type SpinnableBorderWrapper = PropsWithChildren<BaseSpinnableBorderWrapper>

export function SpinnableBorderWrapper({
  baseStyle,
  children,
  isSpinning,
  customGradient,
  variant,
}: SpinnableBorderWrapper) {
  const gradients: Record<
    NonNullable<BaseSpinnableBorderWrapper['variant']>,
    string
  > = {
    auroraViolet:
      'before:bg-[conic-gradient(transparent_90deg,#a995e3_130deg,#8d72d9_170deg,#704fd1_210deg,#ffffff_250deg,transparent_360deg)]',
    cyberHeat:
      'before:bg-[conic-gradient(transparent_90deg,#f4c8a1_140deg,#f5b57a_180deg,#e24b32_220deg,#ffffff_260deg,transparent_360deg)]',
    oceanSignal:
      'before:bg-[conic-gradient(transparent_90deg,#7fb4ff_130deg,#549bff_170deg,#60b377_210deg,#ffffff_250deg,transparent_360deg)]',
    electricPop:
      'before:bg-[conic-gradient(transparent_90deg,#fcd34d_120deg,#8d72d9_160deg,#a9cdff_200deg,#e24b32_240deg,#ffffff_280deg,transparent_360deg)]',
  }

  const gradient =
    customGradient ?? (variant ? gradients[variant] : gradients.auroraViolet)

  return (
    <div
      className={twMerge(
        baseStyle,
        isSpinning &&
          twJoin(
            'relative flex cursor-pointer items-center justify-center overflow-hidden p-px',
            'before:absolute before:h-[1000%] before:w-[1000%]',
            'before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2',
            'before:animate-[spin_4s_linear_infinite]',
            gradient,
          ),
      )}
    >
      {
        <div className="after:bg-primary-purple-100/10 relative after:absolute after:inset-0 after:opacity-0 hover:after:opacity-100">
          {children}
        </div>
      }
    </div>
  )
}
