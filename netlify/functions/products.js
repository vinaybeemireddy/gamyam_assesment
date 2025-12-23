import fs from 'fs';
import path from 'path';

export const handler = async (event) => {
  try {
    // Read db.json from the repository root
    const dbPath = path.join(process.cwd(), 'db.json');
    const data = fs.readFileSync(dbPath, 'utf-8');
    const products = JSON.parse(data);

    return {
      statusCode: 200,
      body: JSON.stringify(products),
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (err) {
    console.error('Error reading products:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load products' })
    };
  }
};
