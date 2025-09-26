import type { JSX } from "react"


export type Widget = {
    aspect: string,
    completion: number,
    text: string
}
export type GridItems = {
    icon?: JSX.Element | null ,
    aspect: string,
    lessons: number
}