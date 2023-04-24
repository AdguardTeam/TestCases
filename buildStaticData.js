import { writeFileSync } from 'fs';
import { parseCompatibility } from './src/helpers';
import testsData from './src/testsData';

const publicData = testsData
    .map((testData) => {
        const publicTestData = {
            ...testData,
        };

        const { compatibility, exceptions } = parseCompatibility(testData.compatibility).publicData;

        publicTestData.compatibility = compatibility;

        if (exceptions.length > 0) {
            publicTestData.exceptions = exceptions;
        }

        return publicTestData;
    });

writeFileSync('./public/data.json', JSON.stringify(publicData, null, 2));
