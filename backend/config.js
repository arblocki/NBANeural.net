
function getConfig (string) {
    switch (string) {
        case 'mongoWebUser':
            return 'web';
            break;
        case 'mongoWebPW':
            return 'NBAMachineLearning';
            break;
    }
}

export default getConfig;