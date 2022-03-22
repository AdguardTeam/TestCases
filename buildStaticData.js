import { writeFileSync } from 'fs';
import { parseCompatibility } from './src/helpers';
import testsData from './src/testsData';

const publicData = testsData
    .map((testData) => {
        const compatibleProducts = parseCompatibility(testData.compatibility);
        return {
            ...testData,
            compatibility: compatibleProducts.full,
        };
    });

writeFileSync('./public/data.json', JSON.stringify(publicData));
