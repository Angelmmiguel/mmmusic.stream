#!/usr/bin/env node

// Libs
const chalk = require('chalk');
const fs = require('fs');
const ora = require('ora');
const inquirer = require('inquirer');
const getVideoInfo = require('./utils/getVideoInfo');

// Data
const channels = require('../channels.json').channels;
const API_TOKEN = process.env.API_TOKEN;

const genres = ['All'];
channels.forEach((channel) => {
  channel.genres.forEach((genre) => {
    if (genres.indexOf(genre) === -1) {
      genres.push(genre);
    }
  });
});

// Action
const videoId = process.argv.slice(2)[0];

if (videoId == null) {
  console.error(chalk.red.bold('The ID of the video is missing'));
  console.log(`${chalk.bold('Usage:')} yarn channels:add <videoId>`);
  process.exit(1);
} else if (API_TOKEN == null) {
  console.error(chalk.red.bold('The API_TOKEN env var is required'));
  process.exit(1);
} else if (channels.some((c) => c.videoId === videoId)) {
  console.error(`The video ${chalk.red.bold(videoId)} already exists`);
  process.exit();
}

const app = async () => {
  return new Promise(async (done, reject) => {
    // Spinner
    const spinner = ora(`Getting data from ${videoId}`).start();
    let video;

    try {
      video = await getVideoInfo(videoId, API_TOKEN);
      spinner.stop();
    } catch (err) {
      spinner.stop();
      reject(err);
    }

    if (video !== null && video.status.embeddable === true) {
      const { title, liveBroadcastContent } = video.snippet;

      console.log("You're going to add the following video:");
      console.log(`> Title: ${chalk.bold(title)}`);
      console.log(`> ID: ${chalk.bold(videoId)} [https://youtube.com/watch?v=${videoId}]`);
      console.log(`> Broadcast: ${chalk.bold(liveBroadcastContent)}`);

      // Get tags
      console.log('');
      const questions = [
        {
          type: 'checkbox',
          name: 'tags',
          message: 'Select the tags to save:',
          choices: (video.snippet.tags || []).map((t) => ({
            name: t.toLowerCase(),
            value: t.toLowerCase(),
            checked: genres.indexOf(t) > -1
          }))
        },
        {
          type: 'checkbox',
          name: 'newTags',
          message: 'Do you want to add an existing tag?',
          choices: genres.map((genre) => ({
            name: genre,
            value: genre
          }))
        },
      ];

      const answers = await inquirer.prompt(questions);

      done({
        title, videoId,
        broadcast: liveBroadcastContent === 'live',
        genres: answers.tags.concat(answers.newTags),
      });
    } else {
      reject(`[https://youtube.com/watch?v=${videoId}] ${chalk.red.bold('The video is not valid')}`);
    }
  });
};

app()
  .then((result) => {
    // Display a summary
    const spinner = ora(`Updating channels.json`).start();
    // Push the result!
    channels.push(result);
    fs.writeFileSync('./channels.json',
      JSON.stringify({
        channels
      }, null, 2)
    );
    spinner.succeed(`The ${chalk.bold(videoId)} video has been added`);
  }).catch((err) => {
    console.error(err.toString());
    process.exit(1);
  });


