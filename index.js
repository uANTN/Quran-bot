const { Client, GatewayIntentBits } = require('discord.js');
const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  AudioPlayerStatus
} = require('@discordjs/voice');

const client = new Client({ intents: [
  GatewayIntentBits.Guilds,
  GatewayIntentBits.GuildVoiceStates
] });

const TOKEN = process.env.TOKEN;
const VOICE_CHANNEL_ID = process.env.CHANNEL_ID;
const STREAM_URL = process.env.STREAM_URL;

client.once('ready', () => {
  console.log(`✅ Logged in as ${client.user.tag}`);

  const channel = client.channels.cache.get(VOICE_CHANNEL_ID);
  if (!channel || channel.type !== 2) return console.error('❌ قناة صوتية غير صحيحة');

  const connection = joinVoiceChannel({
    channelId: channel.id,
    guildId: channel.guild.id,
    adapterCreator: channel.guild.voiceAdapterCreator,
  });

  const player = createAudioPlayer();
  const resource = createAudioResource(STREAM_URL);

  player.play(resource);
  connection.subscribe(player);

  player.on(AudioPlayerStatus.Idle, () => {
    player.play(createAudioResource(STREAM_URL));
  });
});

client.login(TOKEN);
