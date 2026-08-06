import { calculateWind } from "~/core/wind/calculateWind";
import { from255 } from "./transform"

function pressureToAltitude(pressureHPa, seaLevelPressure = 1013.25) {
    const altitude = 44330 * (1 - Math.pow(pressureHPa / seaLevelPressure, 1 / 5.255));
    return Math.ceil(altitude);
}

export default function useDialog() {
    const gfsData = inject('gfsData')
    const chartData = shallowRef({})

    const indicators = computed(() => {
        return [
            {
                name: 'Температура'
            },
            {
                name: 'Давление'
            }
        ]
    })

    watch(gfsData, (data) => {
        const temp = { data: [], type: 'line', name: 'Температура', showSymbol: false }

        const uC = []
        const vC = []

        for (let i in data) {
            const value = data[i]
            const indicator = i.split("_")
            const h = pressureToAltitude(indicator[1].slice(0, -2))

            const transformvalue = from255(value, indicator[0])

            if (indicator[1].includes('mb'))
                switch (indicator[0]) {
                    case 'temp':
                        temp.data.push([transformvalue, h])
                        break;
                    case 'ugrd':
                        uC.push([transformvalue, h])
                        break;
                    case 'vgrd':
                        vC.push([transformvalue, h])
                        break;
                }
        }

        uC.map((u, i) => {
            const v = vC[i]

            const wind = calculateWind(u[0], v[0])

            return wind
        })


        chartData.value['temp'] = temp
    })

    return { chartData, indicators }
}