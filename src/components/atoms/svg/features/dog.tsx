import { SVGProps } from 'react'

export default function Dog(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="128"
      height="128"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="#000000"
        d="M16 22V7.5h1A2.5 2.5 0 0 0 19.5 5V3.5H14A2.5 2.5 0 0 1 11.5 1v3.894a6.74 6.74 0 0 1-3 5.606a6.74 6.74 0 0 0-3 5.606V21.5H5A2.5 2.5 0 0 1 2.5 19v-4m5.5.5h2.5v.5c0 1.5 0 2.5.75 4c0 0 .75 1.5 1.75 1.5"
      />
    </svg>
  )
}
