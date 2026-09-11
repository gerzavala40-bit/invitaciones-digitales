import { promises as fs } from 'fs';
import path from 'path';

export async function getEventData(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'src', 'data', slug, 'event-data.json');
    const fileContents = await fs.readFile(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error loading event data for slug: ${slug}`, error);
    return null;
  }
}
