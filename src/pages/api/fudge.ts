// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import axios from 'axios';
import internal from 'stream';
import { RouteStyleSheet } from 'next/dist/client/route-loader';
import { ReadVResult } from 'fs';
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

  interface Videogame {
    id: number;
    name: string;
    slug: string;
  }

  interface team {
    acronym: string;
    id: number;
    image_url: string;
    location: string;
    modified_at: string;
    name: string;
    slug: string;
  }

  interface Winner {
    id: number;
    type: string;
  }

  interface Games {
    // ?
    begin_at: string;
    complete: boolean;
    detailed_stats: boolean;
    end_at: string;
    finished: boolean;
    forfeit: boolean;
    id: number;
    length: number;
    math_id: number;
    position: number;
    status: string;
    video_url: null;
    winner: Winner;
    winner_type: string;
  }

  interface Eng {
    embed_url: string | null;
    raw_url: string | null;
  }

  interface Off {
    embed_url: string | null;
    raw_url: string | null;
  }

  interface Russ {
    embed_url: string | null;
    raw_url: string | null;
  }

  interface languages {
    english: Eng;
    official: Off;
    russian: Russ;
  }

  interface Opponents {
    opponent: team;
    type: string;
  }

  interface Stream_List {
    embed_url: string;
    language: string;
    main: boolean;
    official: boolean;
    raw_url: string;
  }

  interface Leagues {
    id: number;
    image_url: string;
    modified_at: string;
    name: string;
    slug: string;
    url: string | null;
  }

  interface Result {
    score: number;
    team_id: number;
  }

  interface series {
    begin_at: string;
    description: string | null;
    end_at: string | null;
    full_name: string;
    id: number;
    league_id: number;
    modified_At: string;
    name: string | null;
    season: string;
    slug: string;
    tier: string;
    winner_id: number | null;
    winner_type: null;
    year: number;
  }

  interface Tournament {
    begin_at: string;
    end_at: string;
    id: number;
    league_id: number;
    live_supported: boolean;
    modified_at: string;
    name: string;
    prizepool: number | null;
    serie_id: number;
    slug: string;
    winner_id: number;
    winner_type: string;
  }

  interface Live {
    opens_at: string | null;
    supported: false;
    url: string | null;
  }

  interface LCKData {
    detailed_stats: boolean;
    name: string;
    videogame: Videogame;
    videogame_version: string | null;
    winner: team;
    forfeit: boolean;
    games: Games[];
    game_advantage: null;
    streams: languages;
    scheduled_at: string;
    opponents: Opponents[];
    modified_at: string;
    draw: boolean;
    streams_list: Stream_List[];
    status: string;
    slug: string;
    live_embed_url: string;
    league: Leagues;
    results: Result[];
    serie: series;
    tournament: Tournament;
    serie_id: number;
    tournament_id: number;
    league_id: number;
    id: number;
    match_type: string;
    number_of_games: number;
    rescheduled: boolean;
    official_stream_url: string;
    live: Live;
    ends_at: string;
    original_scheduled_at: string;
    winner_id: number;
    begin_at: string;
  }

  //

  const lcsData = lckResponse.data;
  // LCKData[] lcsData = lckResponse.data;
  // lcsData[]

  // const one = bigBoi.one

  const a = [1, 2, 3, 4, 5];
  a.map((v) => 2 * v);
  // [2, 4, 6, 8, 10]

  const filteredLckData = lcsData.map(
    ({
      detailed_stats,
      name,
      videogame,
      videogame_version,
      winner,
      forfeit,
      games,
      game_advantage,
      streams,
      scheduled_at,
      opponents,
      modified_at,
      draw,
      streams_list,
      status,
      slug,
      live_embed_url,
      league,
      results,
      serie,
      tournament,
      serie_id,
      tournament_id,
      league_id,
      id,
      match_type,
      number_of_games,
      rescheduled,
      official_stream_url,
      live,
      ends_at,
      original_scheduled_at,
      winner_id,
      begin_at,
    }) => ({
      detailed_stats,
      name,
      videogame,
      videogame_version,
      winner,
      forfeit,
      games,
      game_advantage,
      streams,
      scheduled_at,
      opponents,
      modified_at,
      draw,
      streams_list,
      status,
      slug,
      live_embed_url,
      league,
      results,
      serie,
      tournament,
      serie_id,
      tournament_id,
      league_id,
      id,
      match_type,
      number_of_games,
      rescheduled,
      official_stream_url,
      live,
      ends_at,
      original_scheduled_at,
      winner_id,
      begin_at,
    }),
  );

  const resultObject = { filteredLckData };
  /// store in databse...
  response.status(200).json(resultObject);
};
