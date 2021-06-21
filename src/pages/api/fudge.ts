// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import axios from 'axios';
import { PandaToken } from '../../../.env';

export default async (
  request: NextApiRequest,
  response: NextApiResponse<any>,
) => {
  const requestData = request.query;

  const leagueNames = [`LPL`, `LCS`, `LEC`, `LCK`] as const;

  type League = typeof leagueNames[number];
  const leagueIds = {
    LPL: 0,
    LCS: 0,
    LEC: 0,
    LCK: 4553,
  } as const;

  const getLeagueData = (league: League) =>
    axios.get<LCKData[]>(
      `https://api.pandascore.co/leagues/${leagueIds[league]}/matches/past?token=${PandaToken}`,
    );

  const lckResponse = await getLeagueData(`LCK`);
  interface LCKData {
    name: string;
    detailed_stats: boolean;
    official_stream_url: string;
    ///
  }

  const lcsData = lckResponse.data;
  // LCKData[] lcsData = lckResponse.data;
  // lcsData[]

  // const one = bigBoi.one

  const a = [1, 2, 3, 4, 5];
  a.map((v) => 2 * v);
  // [2, 4, 6, 8, 10]
  const filteredLckData = lcsData.map(({ name, detailed_stats }) => ({
    name,
    detailed_stats,
  }));

  const resultObject = { filteredLckData };
  response.status(200).json(resultObject);
};
