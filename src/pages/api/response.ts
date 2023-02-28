// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Airtable from 'airtable'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  models: string[],
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  Airtable.configure({
    endpointUrl: 'https://api.airtable.com',
    apiKey: `${process.env.AIRTABLE_KEY}`
  });

  var base = Airtable.base(`${process.env.DATABASE_ID}`);

  return new Promise((resolve, reject) => {
    base('99 Data').select({
      view: 'Pricing Model'
    }).firstPage(function (err, records) {
      if (err) {
        res.status(401).send(err);
        reject(err);
      }
      if (records) {
        const retreivedRecords = records.map(function (record) {
          return ('Model: ' + record.get('Model'));
        });
        res.status(200).json({ models: retreivedRecords });
        resolve({ models: retreivedRecords });
        res.end();
      }
    });
  })
}