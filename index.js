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

const TOKEN = 'MTM4NTc2MDcxMDQ0MDY1MjkxMw.GU8QN9.QGLTHABj0G5F5lkGBhcTYjOQDXNMcCuyD-4sUg';
const VOICE_CHANNEL_ID = '1148955669278507038';
const STREAM_URL = 'https://www.youtube.com/watch?v=2Gub8-cSH9c';

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
