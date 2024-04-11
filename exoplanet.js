'use strict'

/* API KEY eDcGmc68SHznNH1e1w9QDxnEbcnu3x2JOJnINsa2*/

const baseURL = 'https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?';
const table = 'cumulative';
const whereClause = "koi_disposition like 'CANDIDATE' and koi_period>300 and koi_prad<2";
const orderBy = 'koi_period';
const format = 'ascii';
const queryURL = `${baseURL}table=${table}&where=${encodeURIComponent(whereClause)}&order=${orderBy}&format=${format}`;

console.log(queryURL);

