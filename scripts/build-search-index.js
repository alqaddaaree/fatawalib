#!/usr/bin/env node
/**
 * scripts/build-search-index.js
 *
 * Reads all Markdown files from src/content/fatwas/, extracts frontmatter
 * and body text, and writes a JSON search index to public/search-index.json.
 *
 * Run automatically as part of `npm run build`, or manually with:
 *   node scripts/build-search-index.js
 */

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT      = join(__dirname, '..');
const CONTENT   = join(ROOT, 'src', 'content', 'fatwas');
const OUTPUT    = join(ROOT, 'public', 'search-index.json');

const SCHOLAR_NAMES = {
  'ibn-baz':      'Shaykh Ibn Bāz',
  'ibn-uthaymin': 'Shaykh Ibn ʿUthaymīn',
  'al-albani':    'Shaykh al-Albānī',
  'muqbil':       'Shaykh Muqbil al-Wādiʿī',
  'yahya':        'Shaykh Yaḥyā al-Ḥajūrī',
};

async function buildIndex() {
  let files;
  try {
    files = await readdir(CONTENT);
  } catch {
    console.warn('[search-index] No content directory found at', CONTENT, '— writing empty index.');
    await writeFile(OUTPUT, '[]', 'utf8');
    return;
  }

  const yamlFiles = files.filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
  console.log(`[search-index] Found ${yamlFiles.length} fatwa file(s).`);

  const index = [];

  for (const file of yamlFiles) {
    const raw = await readFile(join(CONTENT, file), 'utf8');
    const data = yaml.load(raw);

    const questionText = String(data.question || '').trim();
    const answerText = String(data.answer || '').trim();
    const body = [questionText, answerText].filter(Boolean).join(' ');

    index.push({
      id:          data.id,
      scholar:     data.scholar,
      scholarName: SCHOLAR_NAMES[data.scholar] ?? data.scholar,
      categories:  data.categories ?? [],
      translator:  data.translator ?? '',
      reviewer:    data.reviewer   ?? '',
      date_added:  data.date_added ?? '',
      body,
    });
  }

  await writeFile(OUTPUT, JSON.stringify(index, null, 2), 'utf8');
  console.log(`[search-index] Wrote ${index.length} entries to ${OUTPUT}`);
}

buildIndex().catch((err) => {
  console.error('[search-index] Failed:', err);
  process.exit(1);
});