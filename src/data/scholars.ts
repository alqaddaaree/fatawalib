export type ScholarId = 'ibn-baz' | 'ibn-uthaymin' | 'al-albani' | 'muqbil' | 'yahya';

export interface ScholarInfo {
  id:        ScholarId;
  name:      string;
  arabicName: string;
  lifespan:  string;
  bio:       string;
}

export const scholars: Record<ScholarId, ScholarInfo> = {
  'ibn-baz': {
    id:         'ibn-baz',
    name:       'Shaykh Ibn Bāz',
    arabicName: 'ابن باز',
    lifespan:   '1910–1999',
    bio: 'ʿAbd al-ʿAzīz ibn ʿAbdullāh ibn Bāz was the Grand Mufti of Saudi Arabia from 1993 until his death in 1999. He was one of the most prominent Islamic scholars of the 20th century.',
  },
  'ibn-uthaymin': {
    id:         'ibn-uthaymin',
    name:       'Shaykh Ibn ʿUthaymīn',
    arabicName: 'ابن عثيمين',
    lifespan:   '1925–2001',
    bio: 'Muḥammad ibn Ṣāliḥ al-ʿUthaymīn was a prominent Saudi Islamic scholar known for his extensive writings and recordings on Islamic jurisprudence and ʿaqīdah.',
  },
  'al-albani': {
    id:         'al-albani',
    name:       'Shaykh al-Albānī',
    arabicName: 'الألباني',
    lifespan:   '1914–1999',
    bio: 'Muḥammad Nāṣir al-Dīn al-Albānī was an Albanian-born Islamic scholar, specialising in hadith sciences. He was considered one of the foremost hadith scholars of the 20th century.',
  },
  'muqbil': {
    id:         'muqbil',
    name:       'Shaykh Muqbil al-Wādiʿī',
    arabicName: 'مقبل الوادعي',
    lifespan:   '1933–2001',
    bio: 'Muqbil ibn Hādī al-Wādiʿī was a Yemeni Islamic scholar who founded the Dār al-Ḥadīth institute in Dammāj, Yemen, and was well known for his knowledge of hadith.',
  },
  'yahya': {
    id:         'yahya',
    name:       'Shaykh Yaḥyā al-Ḥajūrī',
    arabicName: 'يحيى الحجوري',
    lifespan:   'b. 1960',
    bio: 'Yaḥyā ibn ʿAlī al-Ḥajūrī is a Yemeni Islamic scholar and student of Shaykh Muqbil al-Wādiʿī, whom he succeeded at Dār al-Ḥadīth in Dammāj.',
  },
};

export function getScholar(id: ScholarId): ScholarInfo {
  return scholars[id];
}
