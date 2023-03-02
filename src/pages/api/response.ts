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

  const { model, condition }  = req.query;

  var base = Airtable.base(`${process.env.DATABASE_ID}`);

  return new Promise((resolve, reject) => {
    base('Pricing Model').select({
      view: 'Pricing Model'
    }).firstPage(function (err, records) {
      if (err) {
        res.send(err);
        console.log(err)
        reject(err);
      }
      if (records) {
        const retreivedRecords = [] as any[];

        records.forEach((record) => {
            if (!condition) {
              if ((record.fields.Model as String).includes(model as string)) {
                retreivedRecords.push(record.get('Model'));
              }
            }
        });

        // if user has selected a model and selected a condition, fetch the price
        records.forEach((record) => {
          if (condition) {
            if ((record.fields.Model as String).includes(model as string)) {
              if (condition === 'A') {
                retreivedRecords.push(record.fields['Buy Cash']);
              }
              if (condition === 'B') {
                retreivedRecords.push((record.fields['Buy Cash'] as number * 0.8));
              }
              if (condition === 'C') {
                retreivedRecords.push((record.fields['Buy Cash'] as number * 0.6));
              }
            }
          }
        });

        if (!retreivedRecords.length) {
          res.status(200).json({ models: ['Model Not Found']});
          resolve({ models: ['Model Not Found'] });
          res.end();
        }

        res.status(200).json({ models: retreivedRecords });
        resolve({ models: retreivedRecords });
        res.end();
      }
    });
  })
}