import React from 'react';
import Presentable from '../Presentable';

import porygon from '../images/porygon.png';

import './Bots.scss';

export default function Bots() {
  return (
    <div className="Bots">
      <div className="Bots__title">
        Discord Bots
      </div>

      <Presentable title="Porygon" image={porygon} color="spraypaint">
        Porygon is a general purpose Discord bot with a long history. It was originally a fork of <a href="https://gawesomebot.com/">AwesomeBot</a>, before I completely rewrote it in Ruby in 2017. It includes features such as quotes, announcements, moderation, user profiles, message stat tracking, and a simple chatbot.
      </Presentable>
      <Presentable title="Whismur" image={porygon} color="sweetness">
        Whismur is a small-scale Hunger Games bot inspired by the popular <a href="https://brantsteele.net/hungergames/disclaimer.php">Hunger Games simulator</a>, and fulfilling the same purpose in bot form. Unlike the simulator, participants are not limited to 24 and could in theory go much higher.
      </Presentable>
      <Presentable title="Porygon2" image={porygon} color="sexercise">
        Porygon2 is an incomplete rewrite of Porygon, adding advanced moderation features, polls, reminders, and smarter versions of many commands. It also features a completely rewritten core codebase that makes developing new features fast and natural.
      </Presentable>
    </div>
  );
}
