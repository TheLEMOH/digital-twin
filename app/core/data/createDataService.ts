import DataService from "./dataService"
import SetDataService from "./setDataService"
import SetService from "./setService"
import type { DataSourceConfig } from "~/types/dataSource"

export default function createDataService(config: DataSourceConfig): DataService {
    const setService = new SetService(config)
    const setDataService = new SetDataService(config)

    return new DataService({ config, setService, setDataService })
}
