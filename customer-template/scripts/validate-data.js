#!/usr/bin/env node

/**
 * Data Validation Script
 * Validates all JSON data files against their schemas
 * Run: npm run validate
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

// Data files to validate
const dataFiles = [
  'business.json',
  'services.json',
  'hours.json',
  'contact.json',
  'social.json',
  'team.json',
  'cta.json'
];

let hasErrors = false;

console.log('🔍 Validating customer data files...\n');

for (const file of dataFiles) {
  try {
    const dataPath = join(process.cwd(), 'src', 'data', file);
    const schemaPath = join(process.cwd(), 'schemas', file);
    
    const data = JSON.parse(readFileSync(dataPath, 'utf-8'));
    const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
    
    const validate = ajv.compile(schema);
    const valid = validate(data);
    
    if (valid) {
      console.log(`✅ ${file} - Valid`);
    } else {
      console.log(`❌ ${file} - Invalid`);
      console.log('   Errors:');
      validate.errors.forEach(error => {
        console.log(`   - ${error.instancePath}: ${error.message}`);
      });
      hasErrors = true;
    }
  } catch (error) {
    console.log(`⚠️  ${file} - Error reading file`);
    console.log(`   ${error.message}`);
    hasErrors = true;
  }
}

console.log('\n' + (hasErrors ? '❌ Validation failed' : '✅ All data files valid'));
process.exit(hasErrors ? 1 : 0);
