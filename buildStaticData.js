import { writeFileSync } from 'fs';
import testsData from './src/testsData';

writeFileSync('./public/data.json', JSON.stringify(testsData));
