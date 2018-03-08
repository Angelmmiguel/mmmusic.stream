#!/usr/bin/env node

// Libs
const async = require('async');
const chalk = require('chalk');
const fs = require('fs');
const ora = require('ora');
const getVideoInfo = require('./utils/getVideoInfo');

// Data
const channels = require('../channels.json').channels;
const YOUTUBE_API_TOKEN = process.env.YOUTUBE_API_TOKEN;

if (YOUTUBE_API_TOKEN == null) {
  console.error(chalk.bold('The YOUTUBE_API_TOKEN env var is required'));
  process.exit();
}

// Action
const clean = process.argv.slice(2)[0] === 'clean';

const app = () => {
  // Channels
  const result = {
    success: [],
    failed: []
  }

  // Spinner
  const spinner = ora(`Checking channels`).start();

  return new Promise((done, reject) => {
    async.eachOfLimit(channels, 2, async (channel) => {
      spinner.text = `Checking [${channel.videoId}] ${channel.title} (${channel.videoId})`;
      const video = await getVideoInfo(channel.videoId, YOUTUBE_API_TOKEN);

      // Check the embeddable status
      let status = video != null && video.status.embeddable == true;

      // Check for broadcast
      if (channel.broadcast === true && video != null && video.snippet.liveBroadcastContent !== 'live') {
        status = false;
      }

      if (status) {
        result.success.push(channel);
      } else {
        result.failed.push(channel);
      }
    }, (err) => {
      spinner.stop();

      if (err) {
        reject(err);
      }
      done(result);
    });
  });
};

app()
  .then((result) => {
    // Display a summary
    console.log(chalk.cyan('-------------------'));
    console.log(chalk.cyan('Result'));
    console.log(chalk.cyan('-------------------'));
    console.log(`\n${chalk.green.bold(result.success.length)} videos are fine`);
    console.log(`${chalk.red.bold(result.failed.length)} videos are missing\n`);

    if (clean) {
      fs.writeFileSync('./channels.json',
        JSON.stringify({
          channels: result.success
        }, null, 2)
      );
      console.log(`Updated the ${chalk.magenta.bold('channels.json')} file\n`);
    } else if(result.failed.length > 0) {
      console.log(chalk.red.bold("Failed channels:"));
      result.failed.forEach((channel) => console.log(`> [https://youtube.com/watch?v=${channel.videoId}] ${channel.title}`))
      console.log('');
    }

    process.exit(result.failed.length > 0);
  }).catch((err) => {
    console.error(err.toString());
    process.exit(1);
  });


