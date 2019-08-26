export const getDeviceNameForApiCall = (tabIndex, deviceNameForApiCall) => {
    switch(deviceNameForApiCall) {
        case 'Q1':
            if(tabIndex === 'powerTab')
            {
                return 'TR1_15_min';
            }
            else if (tabIndex === 'THDUtab' || tabIndex === 'THDItab')
            {
                return 'TR1_1_min';
            }
            else {
                return 'TR1_1_s';
            }
        case 'Q2':
            if(tabIndex === 'powerTab')
            {
                return 'TR2_15_min';
            }
            else if (tabIndex === 'THDUtab' || tabIndex === 'THDItab')
            {
                return 'TR2_1_min';
            }
            else {
                return 'TR2_1_s';
            }
        case 'Q3':
            return tabIndex === 'powerTab'? 'GEN_15_min' : 'GEN_1_s'
        default:
            return tabIndex === 'powerTab'? `${deviceNameForApiCall}_15_min` :
            tabIndex === 'THDItab'? `${deviceNameForApiCall}_1_min` : 
            `${deviceNameForApiCall}_1_s`
    }
  }