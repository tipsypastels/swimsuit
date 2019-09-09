import React, { useReducer, useState } from 'react';

import Section from './Section';
import Project from './Project';
import PhotoModal from './PhotoModal';

import pc3Img from './images/pc3.png';
import pc3Img2 from './images/pc3_2.png';
import pc3Img3 from './images/pc3_3.png';

import fghImg from './images/fgh.png';
import fghImg2 from './images/fgh_2.png';
import fghImg3 from './images/fgh_3.png';

import './App.scss';
import './fa/css/all.min.scss';
import Header from './Header';

const STARTING_YEAR = 2019;
const CURRENT_YEAR = new Date().getFullYear();

const SKILLS = {
  'High Experience': [
    'HTML', 'CSS / Sass', 'Less', 
    'Ruby', 'Ruby on Rails', 'Stimulus',
    'JavaScript', 'jQuery', 'ES6 / ES2015',
    'PHP', 'Wordpress',
    'React', 'Express', 'REST',
    'Discordrb', 'Discord.js',
  ],

  'Moderate Experience': [
    'TypeScript', 'Koa', 'Ember', 'WebSockets',
  ],

  'Learning': [
    'C', 'Python', 'Angular',
  ],
};

type State = {
  photoIndex: number;
  photoList: string[];
}

type Action =
  | { type: 'next' }
  | { type: 'prev' }
  | { type: 'open', photos: string[] }
  | { type: 'close' }

function reducer(state: State, action: Action) {
  switch(action.type) {
    case 'next': return {
      ...state,
      photoIndex: (state.photoIndex + 1) % state.photoList.length,
    }
    case 'prev': return {
      ...state,
      photoIndex: (state.photoIndex - 1 + state.photoList.length) % state.photoList.length,
    }
    case 'open': return {
      photoIndex: 0,
      photoList: action.photos,
    }
    case 'close': return {
      photoIndex: null,
      photoList: null,
    }
    default: return state;
  }
}

export type PhotoState  = State;
export type PhotoAction = Action;

export default function App() {
  const [search, setSearch] = useState<string>('');

  const [photoState, photoDispatch] = useReducer(reducer, {
    photoIndex: null, photoList: null,
  });

  const relevantSkills = (function() {
    const results = {};

    Object.keys(SKILLS).forEach(group => {
      results[group] = SKILLS[group]
        .filter(item => item.toLowerCase().includes(search.toLowerCase()));
    });

    return results;
  })();

  return (
    <div className="App">
      <PhotoModal
        photoState={photoState}
        photoDispatch={photoDispatch}
      />

      <div className="Page">
        <Header />
        
        <Section title="About" color="sweetness">
          <p>
            <strong>Hi, I'm Dakota!</strong> I'm a 20 year old gal from Vancouver, Canada. I make websites and Discord bots :) if you're looking for a freelancer to help out with a project, drop me a message!
          </p>

          <p>
            My favourite programming language is <strong>Ruby</strong>, though <strong>TypeScript</strong> has jumped up to a close second in the months I've been using it. My favourite framework is a close tie between <strong>Ruby on Rails</strong> and <strong>React</strong>. And yeah I know how apples and oranges that comparison is.
          </p>

          <p>
            <strong>I'm currently available for freelance programming work!</strong> Check out the sections below for examples of what I can do, and feel free to contact me on either <a href="https://twitter.com/tipsypastels">Twitter</a> or Discord (<em>dakota#0001</em>) if you'd like to talk about a project.
          </p>
        </Section>

        <Section title="Web Development" color="sexercise">
          <Project 
            title="PokéCommunity" 
            site="https://pokecommunity.com"
            techs={['php', 'html', 'scss', 'javascript']}
          >
            PokéCommunity is a popular unofficial forum for fans of the Pokémon franchise. It uses a heavily modified version of the PHP-based <a href="https://www.vbulletin.com/">vBulletin</a> forum software, although a rewritten version using React and <a href="https://koajs.com/">Koa.js</a> is currently being developed (see the section below). My role on the site is the leader of a volunteer team of developers, working to add new features and modernize the look and feel of the site.
          </Project>

          <Project 
            title="PokéCommunity3" 
            github="https://github.com/thepokecommunity/pokecommunity-react"
            techs={['react', 'typescript', 'javascript', 'koajs', 'scss']}
            photos={{
              list: [pc3Img, pc3Img2, pc3Img3],
              dispatch: photoDispatch,
            }}
          >
            PokéCommunity3 is a rewritten version of PokéCommunity using a modern React codebase. For the server it uses an external API powered by Koa.js, and both ends of the app are also written in Typescript. The project is currently in development and has not yet been released.
          </Project>

          <Project
            title="Safari Zine"
            github="https://github.com/tipsypastels/safari-zine-theme"
            techs={['wordpress', 'php', 'html', 'scss', 'javascript']}
          >
            Safari Zine is a Wordpress theme I created for a Pokémon fan magazine. Though the magazine no longer exists, you check out the code below. The theme also makes use of Wordpress's plugin API to create several custom features, such as new articles automatically being posted to the site's forums, and a customizable "<a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9dex">Pokedex</a>" featuring fanart, stats, and battling tips about various Pokémon.
          </Project>

          <Project
            title="Fangame Hacktory"
            github="https://github.com/tipsypastels/fgh4"
            techs={['rails', 'javascript', 'jquery', 'stimulusjs', 'scss']}
            photos={{
              list: [fghImg, fghImg2, fghImg3],
              dispatch: photoDispatch,
            }}
          >
            Fangame Hacktory is a small site for the creators of fan-made games and <a href="https://en.wikipedia.org/wiki/ROM_hacking">ROM Hacks</a> to post content. It uses mostly vanilla Rails architecture, with no front-end framework, though it still manages plenty of client-side functionality through the lightweight use of <a href="https://stimulusjs.org/">Stimulus.js</a>.
          </Project>

          <Project
            title="ML"
            github="https://github.com/tipsypastels/ml"
            techs={['rails', 'react', 'websockets', 'javascript', 'scss']}
          >
            ML is a mostly experimental forum software written in Ruby on Rails, and using React for certain particularly interactive pages. It supports classical forum features like threading, user-created groups, and advanced permissions control, but also uses websockets to create an experience reminiscent of a chatroom - messages appear in real time and users are notified of who's typing. The project is incomplete and currently on the back burner.
          </Project>

          <Project
            title="Swimsuit"
            github="https://github.com/tipsypastels/swimsuit"
            techs={['react', 'typescript', 'scss']}
          >
            My website! You are here. I'm not really sure why I named it that.
          </Project>
        </Section>

        <Section title="Discord Bots" color="spraypaint">
          <Project 
            title="Porygon"
            techs={['javascript', 'discordjs']}
          >
            Porygon is a powerful general-purpose Discord bot. It was originally conceived as a fork of <a href="https://gawesomebot.com/">AwesomeBot</a>, a popular open source bot. Later, I rewrote it from scratch. It features quote saving, user-created profiles, moderation and admin tools, custom permission groups, points for messages, and many everyday useful commands.
          </Project>

          <Project
            title="Whismur"
            github="https://github.com/tipsypastels/whismur"
            techs={['ruby', 'discordrb']}
          >
            Whismur is a bot inspired by the popular online <a href="https://brantsteele.net/hungergames/disclaimer.php">Hunger Games simulator</a>, in which you enter the names of 24 people or characters and get a simulated description of how a Hunger Game including them could play out. The bot works similarly, though there is no limit on the number of players.
          </Project>

          <Project
            title="Porygon2"
            github="https://github.com/tipsypastels/porygon2"
            techs={['ruby', 'discordrb']}
          >
            Porygon2 is a WIP rewrite of Porygon, now using Ruby and Discordrb. It significantly cleans up the code using a rewritten command system, and replaces manual SQL queries with a custom ORM that ressembles a very lightweight version of Rails' ActiveRecord. It also adds in many new commands, along with powerful command parser that supports default parameters, unix-style flags, and strong typing.
          </Project>
        </Section>

        <Section title="Other Projects" color="swimsuit">
          <Project
            title="Pokémon Gnosis"
            github="https://github.com/tipsypastels/pokegnosis"
            techs={['c', 'c++', 'ruby', 'make']}
          >
            Pokémon Gnosis is a ROM Hack of the game <a href="https://bulbapedia.bulbagarden.net/wiki/Pok%C3%A9mon_Emerald_Version">Pokémon Emerald</a> by Game Freak & Nintendo. The game uses the engine and mechanics of Emerald while creating an entirely new story set in a new world. It is currently in early development, and is mostly an excuse for me to practice with C.
          </Project>

          <Project
            title="Dragonsbreath"
            github="https://github.com/tipsypastels/dragonsbreath"
            techs={['typescript', 'javascript', 'jest']}
          >
            Dragonsbreath is a small complementary project to Pokémon Gnosis - an intuitive scripting language for creating events, cutscenes, and other story elements during the game, which is then compiled into the game's much less intuitive native scripting language. See the README on GitHub for an example.
          </Project>
        </Section>

        <Section title="Skills" color="sympathy">
          <div className="skills">
            <input 
              className="skills__search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="type to filter skills"
            />

            <div className="skills__lists">
              {Object.keys(relevantSkills).map(group => (
                <ul key={group}>
                  <li><strong>{group}</strong></li>
                  {relevantSkills[group].map(item => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </Section>
      </div>

      <div className="Footer">
        {CURRENT_YEAR === STARTING_YEAR
          ? (
            <>&copy; {STARTING_YEAR}</>
          ) : (
            <>&copy; {STARTING_YEAR}—{CURRENT_YEAR}</>
          ) 
        } Dakota Sankey
      </div>
    </div>
  );
}