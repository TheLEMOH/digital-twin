export default interface Indicator {
    id?: number,
    code: string,
    name?: string,
    units?: string
    value?: number | string | undefined | null
}