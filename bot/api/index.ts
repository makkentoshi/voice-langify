import { bot } from "../src/bot";
import { webhookCallback } from "grammy";

export const config = {
  runtime: "nodejs", // важно, тк используется MongoDB
};

export default webhookCallback(bot, "http");