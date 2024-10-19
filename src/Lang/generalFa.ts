import {studentsFa} from "./students";
import {dashboardFa} from "./dashboard";
import {navbarFa} from "./navbar";
import {settingsFa} from "./settings";


export const faDictionary = {
    students: {
        ...studentsFa
    },
    dashboard: {
        ...dashboardFa
    },
    navbar: {
        ...navbarFa
    },
  settings : {
      ...settingsFa
  }
}
export default faDictionary
