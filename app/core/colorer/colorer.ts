import colorizeByRange from "./colorize"
import colorize from "./colorizeSelf";

type Schema = Record<string, (number | string)[]>

class Colorer {
    public schemes: Schema

    constructor(schemes: Schema) {
        this.schemes = schemes
    }

    replace(schema: Schema) {
        this.schemes = schema
    }

    paint(key: string, data: any) {
        const schema = this.schemes[key]

        if (schema) {
            const colored = colorizeByRange(data, schema);
            return colored
        }
    }

    paintSelf(key: string, value: number) {
        const schema = this.schemes[key]
        return colorize(value, schema)
    }

    paintObject(data: any) {
        const res: Record<string, { color: string, value: number }> = {}

        for (let key in data) {
            const value = data[key]
            res[key] = { color: colorize(value, this.schemes[key]), value }
        }

        return res
    }

    getScheme(key: string) {
        return this.schemes[key] || [0, "#ffffff"]
    }
}

export default Colorer