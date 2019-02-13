const path = require('path');
const async = require('async');
const express = require('express');
const os = require('os');
const bodyParser = require('body-parser');
const config = require('./config.js');
var sleep = require('system-sleep');


const app = express();

app.use(express.static('dist'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// function sleep(ms) {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }

async function getUserInfo(id) {
  return {id};
}

async function performIO() {
  console.log('get request received');
  console.log('performing I/O');
  await sleep(3000);
  console.log('finished I/O');
}

async function customHistoricalQuery(columns, customSql, date) {
  let columnList = columns.split(',');
  let columnCondition = '';
  columnList.forEach((column) => {
    const cleanColumn = column.replace(/\s/g, '');
    columnCondition = columnCondition + ' ' + 'AND ' + cleanColumn + ' IS NOT null';
  });
  const query = `
                  SELECT  EXTRACT(YEAR FROM updated_at AT TIME ZONE "UTC") AS year,
                          EXTRACT(MONTH FROM updated_at AT TIME ZONE "UTC") AS month,
                          EXTRACT(DAY FROM updated_at AT TIME ZONE "UTC") AS day,
                          COUNT(DISTINCT(user_id)) AS count
                  FROM
                    (
                      SELECT * FROM
                      (
                        SELECT
                        EXTRACT(YEAR FROM updated_at AT TIME ZONE "UTC") AS year,
                        EXTRACT(MONTH FROM updated_at AT TIME ZONE "UTC") AS month,
                        EXTRACT(DAY FROM updated_at AT TIME ZONE "UTC") AS day,
                        *
                        FROM \`smooz-c7d83.user.${tablename}\`
                      )
                      ${customSql}${columnCondition}
                      AND updated_at
                      between TIMESTAMP('${date.startYear}-${date.startMonth}-${date.startDay} 00:00:00')
                      and TIMESTAMP('${date.endYear}-${date.endMonth}-${date.endDay} 23:59:59')
                    )
                  GROUP BY  year,
                            month,
                            day
                  ORDER BY  year,
                            month,
                            day
                  `;
  const options = {
    query,
    destinationTable: tablename
  };
  console.log(query);
  const [job] = await bigquery.createQueryJob(options);
  const [rows] = await job.getQueryResults();
  return rows;
}


//////////////////////////// API's

app.get('/demo/api/users/:id', async (req, res) => {

  if (!req.params.hasOwnProperty('id')) {
    return res.status(400)
      .send({
        success: 'false',
        message: 'missing parameter :id'
      });
  }
  userId = req.params.id;

  const getUserInfoResults = getUserInfo(userId);
  const queryResults = await getUserInfoResults;

  return res.status(200)
    .send({
      results: queryResults,
    });
});

app.get('/demo/api/asyncdemo', async (req, res) => {


  const IOResults = performIO();
  const queryResults = await IOResults;
  const result = { message: 'done' };

  return res.status(200)
    .send({
      result
    });
});

app.get('/demo/api/health_check', async (req, res) => {
  console.log('health_check');
  return res.status(200)
    .send({
      message: 'ok'
    });
});


app.listen(8080, () => console.log('Listening on port 8080!'));
